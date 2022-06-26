import React, { useState } from 'react';
import { FaList } from 'react-icons/fa';
import { ADD_PROJECT } from '../mutations/projectMutations';
import { useMutation , useQuery } from '@apollo/client';
import { GET_PROJECTS } from '../queries/projectQueries';
import { GET_CLIENTS } from '../queries/clientQueries';

const AddProjectModal = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('new');
    const [clientId, setClientId] = useState('');

    //get clients for select
    const { loading , error , data } = useQuery(GET_CLIENTS);

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, clientId, status },
        update(cache, { data: { addProject } }) {
          const { projects } = cache.readQuery({ query: GET_PROJECTS });
          cache.writeQuery({
            query: GET_PROJECTS,
            data: { projects: [...projects, addProject] },
          });
        },
      });
    const onSubmit =(e)=>{
        e.preventDefault();
        console.log(status);
        if(name===''||description===''||status==='')
        {
            return alert('please fill in all fields');
        }
        addProject(name,description,clientId,status);
        setName('');
        setDescription('');
        setStatus('new');
        setClientId('');
    }
    if(loading) return null;
    if(error) return <p>Something went wrong</p>
    return (
        <>
        {!loading && !error &&(
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#AddProjectModal">
            <div className="d-flex align-items-center">
                <FaList />
                <div className='ms-1'>New Project</div>
            </div>
            </button>

            <div className="modal fade" id="AddProjectModal" aria-labelledby="AddProjectModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="AddProjectModalLabel">New Project</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className='mb-3' onSubmit={onSubmit}>
                        <label className='form-label'>Name</label>
                        <input type="text" className="form-control" id='name' value={name} onChange={(e)=>setName(e.target.value)} />

                        <label className='form-label'>Description</label>
                        <textarea className="form-control" id='description' value={description} onChange={(e)=>setDescription(e.target.value)} > </textarea>

                        <label className='form-label'>Status</label>
                        <select id="status" className='form-select' value={status} onChange={(e)=>setStatus(e.target.value)}>
                            <option value='new'>Not Started</option>
                            <option value='progress'>In Progress</option>
                            <option value='completed'>Completed</option>
                        </select>

                        <label className="form-label mt-2">Client</label>
                        <select id="clientId" className='form-select' value={clientId} onChange={(e)=>setClientId(e.target.value)} >
                            <option value="">Select Client</option>
                            {
                                data.clients.map((client)=>
                                    <option value={client.id} key={client.id}>{client.name}</option>
                                )
                            }
                        </select>

                        <button type='submit' data-bs-dismiss='modal' className="btn btn-primary mt-3 mx-3">Submit</button>
                    </form>
                </div>
                </div>
            </div>
            </div>  
            </>
        )} 
        </>
    );
}

export default AddProjectModal;

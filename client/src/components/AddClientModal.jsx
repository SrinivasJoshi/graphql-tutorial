import React, { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { ADD_CLIENT } from '../mutations/clientMutations';
import { GET_CLIENTS } from '../queries/clientQueries';
import { useMutation } from '@apollo/client';

const AddClientModal = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const[ addClient ] = useMutation(ADD_CLIENT,{
        variables:{name,email,phone},
        update(cache,{data : addClient})
        {
            const { clients } = cache.readQuery({
                query:GET_CLIENTS
            });
            cache.writeQuery({
                query:GET_CLIENTS,
                data:{ clients : [...clients,addClient]},
            })
        }
    })
    const onSubmit =(e)=>{
        e.preventDefault();
        if(name===''||email===''||phone==='')
        {
            return alert('please fill in all fields');
        }
        addClient(name,email,phone);
        setName('');
        setEmail('');
        setPhone('');
    }
    return (
        <>
            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#AddClientModal">
            <div className="d-flex align-items-center">
                <FaUser />
                <div className='ms-1'>Add Client</div>
            </div>
            </button>

            <div className="modal fade" id="AddClientModal" aria-labelledby="AddClientModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="AddClientModalLabel">Add Client</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <form className='mb-3' onSubmit={onSubmit}>
                        <label className='form-label'>Name</label>
                        <input type="text" className="form-control" id='name' value={name} onChange={(e)=>setName(e.target.value)} />

                        <label className='form-label'>Email</label>
                        <input type="text" className="form-control" id='email' value={email} onChange={(e)=>setEmail(e.target.value)} />

                        <label className='form-label'>Phone</label>
                        <input type="text" className="form-control" id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} />

                        <button type='submit' data-bs-dismiss='modal' className="btn btn-secondary mt-3">Submit</button>
                    </form>
                </div>
                </div>
            </div>
            </div>   
        </>
    );
}

export default AddClientModal;

const express = require('express');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const port = process.env.PORT || 5000;

const app = express();
connectDB();
app.use(cors());
app.use('/graphql',graphqlHTTP({
    schema : schema,
    graphiql: process.env.NODE_ENV === 'development'
}))
app.listen(port,console.log(`server running on port : ${port}`));

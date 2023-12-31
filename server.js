const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middlewares/errorHandler');
const connectDb = require('./config/dbConnection');

connectDb();
const app = express();

const port = process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use('/api/contacts',require('./routes/contactRoute'));
app.use('/api/users',require('./routes/userRoutes'));
app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Server running on port ${port}`);
});
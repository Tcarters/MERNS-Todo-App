//import express from 'express';
const express = require ('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
//import dotenv from 'dotenv'
//import mongoose from 'mongoose';
//import cors from 'cors'
const todosRoutes =  require('./routes/todos-route.js');

const app = express();
//dotenv.config();
app.use(express.json({extended: true}))
app.use(express.urlencoded({ extended: true}))
app.use(cors());
app.use('/todos', todosRoutes);

const mongodb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.syn6a.mongodb.net/${process.env.DB_name}?retryWrites=true&w=majority`;
app.get('/', (req, res) => {
    res.send('Welcome to sever')
})

const PORT = process.env.PORT || 5000;  // `${process.env.port}`; //
app.listen(PORT, () => { 
    console.log(`Server is running on port ${PORT}`)
})

mongoose.connect(mongodb, { useNewUrlParser: true })
    .then( () => console.log(`We\'re connected to DB`))
    .catch( err => console.log('Error DB Connection:', err ))


// module.exports = app;


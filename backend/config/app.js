const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const movie = require('../routes/movieRouter.js');

dotenv.config()
const app = express()
app.use(cors({
    origin:process.env.FE_URL,
    credentials:true,
}))

app.use(express.json()); 

// ROUTING
app.use('/api/v1/movie',movie)

module.exports = app;
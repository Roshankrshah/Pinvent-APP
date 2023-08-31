require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.get('/',(req,res)=>{
    res.send('Personal inventory starting');
});

const PORT = process.env.PORT || 3202;

const start = ()=>{
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`Server listening at http://localhost:${PORT}`);
        })
    })
    .catch(err=>{
        console.log(err);
    })
};

start();

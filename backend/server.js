require('dotenv').config();
require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.send('Personal inventory starting');
});

app.use('/api/users',userRoute);

app.use(errorHandlerMiddleware);

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

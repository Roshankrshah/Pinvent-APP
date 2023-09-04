require('dotenv').config();
require('express-async-errors');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoutes');
const contactRoute = require('./routes/contactRoute');
const productRoute = require('./routes/productRoute');
const errorHandlerMiddleware = require('./middleware/error-handler');
const cookieParser = require('cookie-parser');
const path = require('path');

const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET','POST','PATCH','DELETE']
  }));


app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.static('./public'));
app.use(express.json());

app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Personal inventory starting');
});

app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/contactus', contactRoute);

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3202;

const start = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            app.listen(PORT, () => {
                console.log(`Server listening at http://localhost:${PORT}`);
            })
        })
        .catch(err => {
            console.log(err);
        })
};

start();

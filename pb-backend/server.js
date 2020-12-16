const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');


const app = express();

// create application/json parser
let jsonParser = bodyParser.json()
// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(jsonParser);
app.use(urlencodedParser);

//middleware
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3001',
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE'],
    credentials: true
}));

app.use(authRoutes);

//database connection

mongoose.connect('mongodb://localhost/pbdb')
    .then((result) = app.listen(process.env.port || 3000));


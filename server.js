const express = require('express');
const path = require('path');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const nocache = require('nocache');
const { urlencoded } = require('body-parser');
const UserRoutes = require('./routes/user');
const AdminRoutes = require('./routes/admin')
require('./Database/DB')

const app = express();

app.use(session({
    secret: 'myKey',
    resave: false,
    saveUninitialized: false,
}));
app.use(nocache());
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use(express.static("views"));
app.use(express.static('public'))

app.set('view engine' , 'hbs')

app.use('/', UserRoutes)
app.use('/admin', AdminRoutes)

app.listen(1000,() => {
    console.log("Server running on port 1000...");
});
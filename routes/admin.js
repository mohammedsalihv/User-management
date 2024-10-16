const express = require('express');
const Controller = require('../controller/AdminController');
const { get } = require('mongoose');
const { Admin } = require('mongodb');

const Admin_route = express.Router();


Admin_route.get('/', Controller.AdminLogin)
Admin_route.post('/AdminHome',Controller.AdminHome)
Admin_route.get('/NewUser', Controller.NewUser)
Admin_route.get('/Adminlogout' , Controller.AdminLogout)
Admin_route.get('/gethome' ,Controller.gethome)
Admin_route.post('/Addinguser', Controller.Addinguser)
Admin_route.get('/Dlt' ,Controller.Deletedocuments)
Admin_route.get('/dlt/:id' , Controller.deleteUser)
Admin_route.get('/Updateload/:id',Controller.Updateload)
Admin_route.post('/Updateuser/:id', Controller.Updateuser);
Admin_route.get('/search', Controller.search)
Admin_route.get('/trail' , Controller.trail)






module.exports = Admin_route;
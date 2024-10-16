const express = require('express')
const Controller = require('../controller/UserController')

const User_route =  express.Router()

User_route.get('/', Controller.login);
User_route.get('/home' , Controller.Notuser)
User_route.post('/UserValidation' , Controller.Userhome)
User_route.post('/register', Controller.register)
User_route.get('/signup',Controller.NewUser)
User_route.get('/Userlogout' , Controller.Userlogout)
User_route.get('/Renderhome' , Controller.RenderHome)
User_route.get('/Exist',Controller.Exist)




 module.exports = User_route;
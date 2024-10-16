
const bcrypt = require('bcrypt')
const { User } = require('../models/UserModel')


//login page

const login = (req, res) => {
  try {
      if (!req.session.user) {
        res.render("login");
      } else {
        res.redirect("/home");
      }
  } catch (error) {
      res.render("home");
    }
}

// Signup page 

      const  register =  async (req, res) => {
      const { username , email , password } = req.body;
      const hashedpassword = await bcrypt.hash(password , 10)
      const newuser = new User({
      username,
      email,
      password : hashedpassword
     })

     
     //Checking user already existed or not 

     const existingUser =  await User.findOne({email , password})

     if(existingUser){
          return res.render('signup' , {
          existingmsg: 'User already exists'
        }) 
    }else{
         await newuser.save()
         res.render('signup');
     }   
};

// Redirect to login page if already having the account

const  Exist = (req,res)=>{

     if(!req.session.user){
      try {
        res.render('login')
      } catch (error) {
         console.log(error);
      }
   }else{
    res.render('Userhome')
   }
     }

// User home view and validation 

const Userhome = async (req, res) => {
  const { email, password } = req.body || {};
  try {
    const validate = await User.findOne({ email });
    if (!validate || !(await bcrypt.compare(password, validate.password))) {
      return res.render('login', {
        validatemsg: 'Invalid user'
      });
    } else {
      req.session.user = validate.username; 
      res.cookie('sessionID', req.sessionID, { httpOnly: true });
      res.render('Userhome');
    }
  } catch (error) {
    console.log(error);
  }
};

//Rendering signup page without account

const NewUser = (req,res)=>{
    res.render('signup')
}

//Session handling without pressing logout

const Notuser = (req,res)=>{
    try {
      if(req.session.user){
        res.redirect('/Renderhome')
      }else{
        res.redirect('/')
      }
    } catch (error) {
      console.log(error);
    }
}

//Logout

const Userlogout = (req,res)=>{
  try {
    req.session.destroy((err)=>{
       res.render('login')
    })
  } catch (error) {
     console.log(error);
  }
}

//Session handling without pressing logout

const RenderHome = (req,res)=>{
    if(req.session.user){
      res.render('Userhome')
    }else{
       res.redirect('/')
    }
}

module.exports = {
   login , 
   Userhome, 
   NewUser, 
   Exist, 
   register, 
   Notuser,
   Userlogout,
   RenderHome };
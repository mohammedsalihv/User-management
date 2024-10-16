const { User } = require('../models/UserModel')
const bcrypt = require('bcrypt')


//Admin Login and session handling 

const AdminLogin = async (req,res)=>{
    if(req.session.admin){
        res.redirect('/admin/gethome')
    }else{

        users = await User.find({})
        res.render('AdminLogin' , {users})
    }
}

//Admin Home page  with validation
const AdminHome = (req,res)=>{
    const credential = {
        email : 'admin@123.com',
        password: '000'
    }
    try {
        if(req.body.email === credential.email && req.body.password === credential.password){
             req.session.admin = credential.email
             res.cookie('sessionID' , req.sessionID , {httpOnly : true})
             res.redirect('/admin/gethome')
        }else{
            res.render('AdminLogin', {
                Incorrectmsg : 'Incorrect email or password'
                
            })
        }    
    } catch (error) { 
        console.log(error);    
    }
}


// Admin Home page rendering

const gethome = async (req, res) => {
    try {
        if (!req.session.admin) {
            res.redirect('/admin');
        }else {
                users = await User.find({});
                res.render('AdminHome', { users});
            }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


//New user adding window

const NewUser = (req,res)=>{
    try {
        res.render('NewUser')
    } catch (error) {
       console.log(error);
    } 
}

// Admin can add new user

const Addinguser = async (req,res)=>{
    const {username , email , password } = req.body || {}
    const hashedpassword = await bcrypt.hash(password , 10)
    const adminadding = new User({
        username,
        email,
        password : hashedpassword
    })
     const UserExist = await User.findOne({email})
    try {
        if(UserExist){  
               res.render('NewUser',{
                Exstmsg : 'User already existed'
            })       
        }else{
             await adminadding.save();
            const users = await User.find({})
            if(users){
                res.redirect('/admin/gethome')
            }else{
                console.log('Error while adding new user by admin');
            }    
        }
    } catch (error) {  
        console.log(error.message);
    }
}

 // Admin logout 

const AdminLogout = (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin')
        }
    })
}


// // Listing the users 

// const Readdocuments =  async (req,res)=>{
//     try {
//     const users = await User.find({})       
//     if(users.length > 0){
//          res.render('AdminHome',{users})
//      }else{
//            res.render('AdminHome' , {
//             Errormsg : 'No users found'
//          })
//      }
//     } catch (error) {
//       res.status(500).send('Failed Fetching the data')
//     }
// }

// Users details deleting

const deleteUser = async  (req,res)=>{
  try {
     await User.deleteOne({_id: req.params.id})
     res.redirect('/admin/gethome')
  } catch (error) {
    console.log(error);
  }
}

// updating form
const Updateform = (req,res)=>{
    try {
        res.render('Update')
    } catch (error) {
        console.log(error);
    }
}

//Updating page laoding...

const Updateload =  async (req,res)=>{
    try {
        const userdtls = await User.findById({_id:req.params.id})
        if(userdtls){
            res.render('Update' , {users : userdtls})
        }else{
            res.send('not')
        }
    } catch (error) {
        console.log(error);
    }   
}     

// Update user details

const Updateuser = async (req, res) => {

    if(req.session.admin){
        try {
            const data = req.body;
                await  User.updateOne({_id:req.params.id}, {
               $set: {
                  username: data.UpdateUsername,
                  email:data.UpdateEmail
               }
           });
               res.redirect('/admin/gethome');
   
       } catch (error) {
           console.error(error);
           res.status(500).send('Internal Server Error');
       }
    }else{
        res.redirect('/admin/gethome')
    }
  
};

// Deleteing all  documents

const Deletedocuments = async (req,res)=>{

    const Delete = await User.deleteMany({})
    if(Delete){
        res.render('AdminHome' , {
            Deletemsg : 'Deleted'
        })
    }else{
        res.render('AdminHome',{
            Notdlt: 'Delete not compltd'
        })
    }
}

 // User details searching

const search = async (req, res) => {
    try {
        let search = '';
        if(req.query.search){
            search = req.query.search;
        }
        const users = await User.find({ 
            $or: [
                { username: { $regex: new RegExp(search, 'i') } },
                { email: { $regex: new RegExp(search, 'i') } }
            ]
        });
        const NotFound = users.length === 0 ? 'User not found' : '';
        res.render('AdminHome', { users, NotFound });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
};


const trail = async (req,res)=>{
    
                users = await User.find({});
                res.render('trails', { users})

}

module.exports = {
        AdminHome,
        AdminLogin,
        NewUser,
        AdminLogout,
        //Readdocuments , 
        Addinguser , 
        Deletedocuments , 
        gethome , 
        deleteUser ,
        Updateform , 
        Updateload , 
        Updateuser ,
        search,
        trail
     }
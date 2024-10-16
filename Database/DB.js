const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WebApp')
  .then(()=>{
    
    console.log("DB connection successful..");
  })
  .catch((err)=>{
    console.log("Error is : " , err);
  })

  
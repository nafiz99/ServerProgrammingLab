const User= require('../models/userModels.models');
const bcrypt=require('bcryptjs');
const alert=require("alert")
const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

const getLoginPage=(req,res)=>{
    res.sendFile("login.html",{root:'./views/pages/examples'})
};



const getRegisterPage=(req,res)=> {
    res.sendFile('register.html', {root:'./views/pages/examples'})
}

const postRegisterPage=async(req,res)=>{
    const name= req.body.name;
    const email= req.body.email;
    const password=req.body.password;
    const retype=req.body.retype;

    try {
       const user=await User.findOne({email});

       if(user){
           alert("There is already an account with this email.");
           res.redirect("/login");
       }
       else if(password.length<6){
           alert("Password must be atleast 6 characters");
           res.redirect('/register');
       }
       else if(password!==retype){
           alert("Password doesn't match");
           res.redirect('/register');
       }
       else if(!name || !email){
           alert("Please fill out all the details");
           res.redirect('/register');
       }
       else{
           const salt= await bcrypt.genSaltSync(10);
            passwordHash= await bcrypt.hash(password,salt);
           const createUser= new User({
               name: name,
               email: email,
               passwordHash: passwordHash,
           });
           
            await createUser.save();
            res.redirect("/login");
           

       }
        
    } catch (error) {
        console.error(error);
        alert("Something went wrong. Please try again");
        res.redirect("/register");

    }
    
}

const postLoginPage = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const passMatch = await bcrypt.compare(password, existingUser.passwordHash);
      if (passMatch) {
        localStorage.setItem("name", existingUser.name);
        // res.cookie("fullname", existingUser.name);
  
        res.redirect("/dashboard");
      } else {
        alert("Wrong Password");
        res.redirect("/login");
      }
    } else {
      alert("You are not registered\nPlease create an account");
      res.redirect("/register");
    }
  }

  const getDashboardPage=(req, res)=>{
      res.sendFile("index.html", { root: "./views" })
  }

module.exports= {getLoginPage, getRegisterPage, postRegisterPage, postLoginPage, getDashboardPage};
//done
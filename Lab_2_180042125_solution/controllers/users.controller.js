const User= require('../models/user.models');
const bcrypt= require('bcryptjs')
const passport= require('passport')

const getLogin = (req,res) => {
    res.render("users/login.ejs",{error: req.flash("error")});
};

const postLogin = (req,res,next) => {
    passport.authenticate('local',{
        successRedirect: "/dashboard",
        failureRedirect: "/users/login",
        failureFlash: true,
 })(req,res,next);
};

const getRegister = (req, res) => {
  res.render("users/register.ejs", {errors: req.flash('errors')});
};

const postRegister = (req,res) => {
    const {name,email,password,retype}=req.body;
    console.log(name);
    console.log(email);
    console.log(password);
    console.log(retype);

    const errors=[];
    if(!name || !email || !password || !retype){
        errors.push("Enter value in all the fields");   
    }
    if(password.length<6){
        errors.push("Password must be atleast of 6 characters");
    }
    if(password!==retype){
        errors.push("Passwords doesn't match");
    }
    if(errors.length>0){
        req.flash("errors", errors);
        res.redirect("/users/register"); 
    } 
    else{
       // console.log("Request reached");
        User.findOne({email}).then((user)=>{
            if(user){
                //console.log("User found");
                errors.push("User already exists with this email");
                req.flash("errors", errors);
                res.redirect("/users/register"); 
            }else{
                //console.log("gen salt");
                bcrypt.genSalt(10,(err,salt)=>{
                if(err){
                    //console.log(err);
                    errors.push(err);
                    req.flash("errors", errors);
                    res.redirect("/users/register"); 
                }else{
                    //console.log("Hash pass");
                    bcrypt.hash(password,salt, (err,hash)=>{
                        if(err){
                            //console.log(err);
                            errors.push(err);
                            req.flash("errors", errors);
                            res.redirect("/users/register");
                        }else{

                            const createUser= new User({
                                name: name,
                                email: email,
                                password: hash,
                            })
                            createUser.save().
                            then(()=>{
                                res.redirect("/users/login");
                            }).catch((error)=>{
                                console.log(error);
                                errors.push("Saving user to database failed.");
                            req.flash("errors", errors);
                            res.redirect("/users/register");
                            })
                        }
                    })

                }
            
              });
            }
            
     })
    } 

};

module.exports = { getLogin, postLogin, getRegister, postRegister };


const getLogin = (req,res) => {
    res.render("users/login.ejs");
};

const postLogin = (req,res) => {
    const {email,password}=req.body;
    console.log(email);
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
        res.redirect("/users/register");
    } 

};

module.exports = { getLogin, postLogin, getRegister, postRegister };

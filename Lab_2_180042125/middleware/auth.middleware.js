const LocalStorage=require("node-localstorage").LocalStorage;
const localStorage= new LocalStorage("./scratch");
const alert= require("alert");

const isLoggedIn=(req,res,next)=> {
    const userName=localStorage.getItem("name");

    if(userName){

        alert(`Username: ${userName}`);
        next();
    }
    else{
        alert('Not signed in');
        res.redirect("/login");
    }
}

module.exports= isLoggedIn;
//done

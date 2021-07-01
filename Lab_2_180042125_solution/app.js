const express= require("express");
const app= express();
const session= require('express-session');
const flash= require('connect-flash');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(session({
    secret:'secret',
    resave: true,
    saveUninitialized: true,
}))
app.use(flash());

const indexRoutes= require("./routes/index.routes");
const userRoutes= require("./routes/user.routes");

app.use(express.urlencoded({extended:false}));

app.use(indexRoutes);
app.use('/users', userRoutes);
module.exports= app;
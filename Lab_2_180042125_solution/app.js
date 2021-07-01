const express= require("express");
const app= express();

app.use(express.static("public"));
app.set("view engine", "ejs");

const indexRoutes= require("./routes/index.routes");
app.use(indexRoutes);
module.exports= app;
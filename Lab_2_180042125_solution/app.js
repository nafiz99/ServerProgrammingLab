const express= require("express");
const app= express();

app.use(express.static("public"));

const indexRoutes= require("./routes/index.routes");

module.exports= app;
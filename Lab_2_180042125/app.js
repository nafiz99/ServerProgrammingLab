const express= require('express');

const cors=require('cors');
const app=express();
const userRoute=require('./routes/userRoutes.routes')

app.use(cors());
app.use(userRoute);

app.get("/", (req, res) => {
    res.sendFile("index3.html", { root: "./views" });
  })


module.exports= app;
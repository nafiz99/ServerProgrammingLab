const express= require('express');
const bodyParser= require('body-parser');

const cors=require('cors');
const app=express();
const userRoute=require('./routes/userRoutes.routes')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(userRoute);

app.get("/", (req, res) => {
    res.sendFile("index3.html", { root: "./views" });
  })


module.exports= app;
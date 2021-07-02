const express= require('express');
const bodyParser= require('body-parser');


const app=express();
const userRoute=require('./routes/userRoutes.routes')


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(userRoute);

app.get("/", (req, res) => {
    res.sendFile("home.html", { root: "./views" });
  })
  app.use((req, res) => {
    res.sendFile('404.html', { root: './views/pages/examples' });
  });

module.exports= app;
//done
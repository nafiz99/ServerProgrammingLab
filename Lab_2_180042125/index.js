require(`dotenv`).config();
const app=require(`./app`);
const mongoose= require('mongoose');

mongoose.connect(process.env.MONGOURL,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  
}).then(()=>{
    console.log('Database connected'
    )}).catch((err)=>{
        if(err){
            console.log('Unable to connect to database')
        }
    })
const PORT= process.env.PORT;

app.listen(PORT, ()=> console.log(`Server has started on port ${PORT}`));
//done
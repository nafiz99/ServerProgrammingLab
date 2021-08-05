const MathOlympiad=require("../models/MathOlympiad.models");

const getMO= (req,res)=>{
    res.render('math-olympiad/register.ejs', {error: req.flash("error")});

};

const postMO=(req,res)=>{
    const {name,category, contact, email, institution, tshirt}= req.body;
    console.log(name);
    console.log(contact);
    console.log(email);
    console.log(institution);
    console.log(category);
    console.log(tshirt);
    let regfee=0;
    if(catefory="School"){
        regfee=250;
    } else if(category="College"){
        regfee=400;

    } else {
        regfee=500;
    }
    const total= regfee;
    const paid=0;
    const selected= false;

    let error=""

    MathOlympiad.findOne({name:name, contact:contact}).then((participant)=>{
        if(participant){
            error="Participant with this name and contact number already exists"
            console.log(error);
            res.redirect("register")
        } else{
            const participant= new MathOlympiad({
                name,
                category,
                contact,
                email,
                institution,
                paid,
                total,
                selected,
                tshirt
            });
            participant.save().then(()=>{
                error= "Participant has been added successfully"
                console.log(error);
                req.flash("error", error)
                res.redirect("register")
            })
            .catch(()=>{
                error="An unexpected error occured while registering participant"
            })
        }
    })
    
    res.render("math-olympiad/register.ejs")
    
};

const getMOList=(req,res)=>{
    res.render('math-olympiad/list.ejs');
};

const deleteMO= (req,res)=>{
    const id= req.params.id;
    console.log(id);
    res.render('math-olympiad/list.ejs')
};

module.exports={getMO,postMO,getMOList,deleteMO}
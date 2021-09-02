const MathOlympiad=require("../models/MathOlympiad.models");
const sendMails = require('../config/mailer');
var crypto = require('crypto');

const getMO= (req,res)=>{
    res.render('math-olympiad/register.ejs', {error: req.flash("error")});

};

const postMO = (req, res) => {
    const { name, category, contact, email, institution, tshirt } = req.body;
    console.log(institution);
    let registrationFee = 0;
    if (category == "School") {
      registrationFee = 250;
    } else if (category == "College") {
      registrationFee = 400;
    } else {
      registrationFee = 500;
    }
    const total = registrationFee;
    const paid = 0;
    const selected = false;
    let error = "";
    var verificationCode = crypto.randomBytes(20).toString('hex');
  
    MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
      if (participant) {
        error = "Participant with same name and contact exists";
  
        req.flash("error", error);
        res.redirect("/MathOlympiad/register");
      } else {
        const participant = new MathOlympiad({
          name,
          category,
          contact,
          email,
          institution,
          paid,
          total,
          selected,
          tshirt,
          verificationCode,
        });
        participant
          .save()
          .then(() => {
            error = "Participant has been registered successfully!!";
            const mailOptions = {
              from: 'teamupp89@gmail.com',
              to: email,
              subject: 'Registration on ICT Fest 2021',
              text:
                'You have registered successfully for Programming contest. Keep this code safe: ' +
                verificationCode,
            };
  
            sendMails(mailOptions);
            req.flash("error", error);
            
            res.redirect("/MathOlympiad/register");
          })
          .catch((err) => {
            console.log(err);
            error = "Unexpected error";
            req.flash("error", error);
            res.redirect("/MathOlympiad/register");
          });
      }
    });
  };
const getMOList = (req, res) => {
    let all_participant = [];
    let error = "";
    MathOlympiad.find()
      .then((data) => {
        all_participant = data;
        res.render("math-olympiad/list.ejs", {
          error: req.flash("error"),
          participants: all_participant,
        });
      })
      .catch(() => {
        error = "Failed to fetch participants";
        res.render("math-olympiad/list.ejs", {
          error: req.flash("error", error),
          participants: all_participant,
        });
      });
  };

const deleteMO= (req,res)=>{
    const id = req.params.id;
    console.log("id ", id);
  
    let error = "";
    MathOlympiad.deleteOne({ _id: req.params.id })
      .then(() => {
        error = "";
        req.flash("error", error);
        res.redirect("/MathOlympiad/list");
      })
      .catch(() => {
        error = "Failed to delete data!";
        req.flash("error", error);
        res.redirect("/MathOlympiad/list");
      });
};


const paymentDoneMO = (req, res) => {
    const id = req.params.id;
  
    MathOlympiad.findOne({ _id: id })
      .then((participant) => {
        participant.paid = participant.total;
        participant
          .save()
          .then(() => {
            let error = "Payment completed succesfully";
            req.flash("error", error);
            res.redirect("/MathOlympiad/list");
          })
          .catch(() => {
            let error = "Data could not be updated";
            req.flash("error", error);
            res.redirect("/MathOlympiad/list");
          });
      })
      .catch(() => {
        let error = "Data could not be updated";
        req.flash("error", error);
        res.redirect("/MathOlympiad/list");
      });
  };
module.exports={getMO,postMO,getMOList,deleteMO,paymentDoneMO}
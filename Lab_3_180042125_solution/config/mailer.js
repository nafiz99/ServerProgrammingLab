const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'teamupp89@gmail.com',
    pass: 'g0198tid', // naturally, replace both with your real credentials or an application-specific password
  },
});

const sendMails = (mailOptions) => {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};

module.exports = sendMails;
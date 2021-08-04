var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const bcrypt = require("bcryptjs");
const User = require("../models/user.models");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Match User
      User.findOne({ email: email })
        .then((User) => {
          if (!User) {
            return done(null, false, {
              message: "This email is not registered!",
            });
          } else {
            //Match Password
            bcrypt.compare(password, User.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, User);
              } else {
                return done(null, false, { message: "Password Incorrect!" });
              }
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );
  passport.serializeUser((User, done) => {
    done(null, User.id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, User) => {
      done(err, User);
    });
  });
};
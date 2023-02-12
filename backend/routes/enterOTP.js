const OTP = require("../models/otpModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (req, res) => {
  const email = req.body.email;
  const otp = req.body.otp;
  const date = req.body.date;
  console.log(email, otp, date);

  User.findOne({ email: email }, (err, user) => {
    if (err) {
      res.status(500).send("Error: " + err);
    }
    if (!user) {
      res.status(404).send("User not found");
    } else {
      console.log(user);
      bcrypt.hash(otp, saltRounds).then((hash) => {
        console.log("Hash ", hash);
        const newOTP = new OTP({ email: email, otp: hash, createdAt: date });
        const status = newOTP.save();
        if (status) {
          console.log("Added: ", newOTP);
          res.status(200).send("Added: " + newOTP);
        } else {
          res.status(500).send("Error: " + newOTP);
        }
      });
    }
  });
};

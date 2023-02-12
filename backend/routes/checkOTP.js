const OTP = require("../models/otpModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (req, res) => {
  const otp = req.body.otp;
  const username = req.body.username;
  const password = req.body.password;
  const date = req.body.date;

  console.log(otp, username, password, date);

  OTP.findOne({ email: username }, (err, user) => {
    if (err) {
      res.status(500).send("Error: " + err);
    }
    if (!user) {
      res.status(404).send("User not found");
    } else {
      console.log("Found user: ", user);
      bcrypt.compare(otp, user.otp, (err, result) => {
        if (err) {
          res.status(500).send("Error: " + err);
        }
        if (!result) {
          res.status(404).send("Invalid OTP");
        } else {
          console.log("Valid OTP");
          bcrypt.hash(password, saltRounds).then((hash) => {
            console.log("Hash ", hash);
            User.updateOne(
              { email: username },
              { $set: { password: hash } },
              (err, result) => {
                if (err) {
                  res.status(500).send("Error: " + err);
                }
                if (!result) {
                  res.status(404).send("Password not updated: " + err);
                } else {
                  res.status(200).send("Password updated");
                  OTP.deleteOne({ email: username }, (err, result) => {
                    if (err) {
                      res.status(500).send("Error: " + err);
                    }
                    if (!result) {
                      res.status(404).send("OTP not deleted: " + err);
                    } else {
                      console.log("OTP deleted");
                    }
                  });
                }
              }
            );
          });
        }
      });
    }
  });

  /* User.findOne({ email: email }, (err, user) => {
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
  }); */
};

const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  console.log("Checking here",email, password)

  User.findOne({ email: email }, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) throw err;
        if (!result) {
          return res.status(404).json({ message: "Invalid credentials" });
        } else {
          return res.status(200).json(user);
        }
      });
    }
  });
};

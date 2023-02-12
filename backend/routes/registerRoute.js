const User = require("../models/userModel");
const bcrypt = require("bcrypt")
const saltRounds = 10


module.exports = (req, res) => {
  const name = req.body.name;
  const email = req.body.username;
  const password = req.body.password;
  console.log(name, email, password);
  bcrypt
  .hash(password, saltRounds)
  .then(hash => {
    console.log('Hash ', hash)
    const newUser = new User({ name, email, password: hash });
    const status = newUser.save();
    if (status) {
      console.log("Added: ", newUser);
      res.status(200).send("Added: " + newUser);
    } else {
      res.status(500).send("Error: " + newUser);
    }
  })
};

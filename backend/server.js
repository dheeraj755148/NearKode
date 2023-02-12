const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./routes");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(router);

//Connection of mongodb atlas

mongoose.connect(process.env.MONGO_DB_URL);

//Listen test

app.listen(5000, function () {
  console.log("Server running on 5000");
});

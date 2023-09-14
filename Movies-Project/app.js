require("dotenv").config();

const express = require("express");


const mongoose = require("mongoose");

const moviesRouter = require("./routes/movies")

const PORT = process.env.PORT || 3001;

const app = express();

const logRequests = require("./logRequests");

const { body, validationResult } = require("express-validator");

app.use(express.urlencoded({ extended:  true}));
app.use(express.json());

app.use(logRequests);

mongoose.connect(process.env.CONNECTION_STRING,{})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((e) => {
    console.error("Error connecting to MongoDB:", e);
  });

app.use('/movies' , moviesRouter);

app.listen(PORT ,() => {
    console.log(`the server is up and running on port ${PORT}`);
});

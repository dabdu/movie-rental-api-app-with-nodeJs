const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://Ibrahim:12345@cluster0.l1z2d.mongodb.net/vidly?retryWrites=true&w=majority"
    )
    .then(() => winston.info(`Connected to DB...`));
  //   .catch(err => console.error('Could not connect to MongoDB...'));
};

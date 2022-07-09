const mongoose = require("mongoose");
const winston = require("winston");
module.exports = function () {
  mongoose
    .connect(
      "mongodb+srv://dabdu:dabdu@cluster0.6qvvk.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => winston.info(`Connected to DB...`));
  //   .catch(err => console.error('Could not connect to MongoDB...'));
};

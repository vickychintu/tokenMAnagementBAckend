const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");
const connectDB = async () => {
  while (true) {
    try {
      await mongoose.connect(db);
      console.log("...MongoDB connected");
      return;
    } catch (e) {
      console(`error in connection ${e.message}`);
      //exit process with failure
      process.exit(1);
    }
  }
};
module.exports = connectDB;

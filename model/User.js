const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  date: {
    type: Number,
    required: true,
  },
  hour: {
    type: Number,
    required: true,
  },
  mins: {
    type: Number,
    required: true,
  },
  Factory: {
    type: String,
    required: true,
  },
  Machine: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);

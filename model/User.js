const { hash } = require("bcryptjs");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  name: {
    type: Number,
    required: String,
  },
  emailId: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  userId: {
    type: hash,
    required: true,
  },
  dob: {
    type: Date,
    required: false,
  },
  trainsAt: {
    type: hash,
    required: false,
  },
  TokenBal: {
    type: Number,
    required: true,
  },
  Password: {
    type: hash,
    required: true,
  },
  walletId: {
    type: hash,
    required: true,
  },
});

module.exports = mongoose.model("user", UserSchema);

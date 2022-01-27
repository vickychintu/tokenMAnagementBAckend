const { hash } = require("bcryptjs");
const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  GymId: {
    type: hash,
    required: String,
  },
  LocationId: {
    type: hash,
    required: true,
  },
  MachineId: {
    type: hash,
    required: true,
  },
  FranchiseName: {
    type: String,
    required: true,
  },
  PhoneNo: {
    type: number,
    required: true,
  },
  ManagerId: {
    type: Number,
    required: true,
  },
  OwnerId: {
    type: hash,
    required: true,
  },
});

module.exports = mongoose.model("transactions", UserSchema);

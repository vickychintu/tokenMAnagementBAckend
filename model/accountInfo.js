const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  walletId: {
    type: String,
    required: true,
    unique: true,
  },
  bal: {
    type: Number,
    required: true,
  },
  lastTransactionTime: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: false,
  },
  organizationId: {
    type: String,
    required: true,
  },
  status: {
    default: false,
    type: Boolean,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("UserAccounts", UserSchema);

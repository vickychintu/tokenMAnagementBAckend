const { hash } = require("bcryptjs");
const mongoose = require("mongoose");
const currency = require("./Currency");
const UserSchema = new mongoose.Schema({
  organizationId: {
    type: String,
    required: String,
    unique: true,
  },
  organizationName: {
    type: String,
    required: true,
  },
  authId: {
    type: String,
    required: true,
  },
  currencyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "currencies",
  },
  ledgerId: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("organizations", UserSchema);

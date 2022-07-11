const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  transactionId: {
    type: Number,
    required: String,
  },
  associatedAmt: {
    type: String,
    required: true,
  },
  totalCount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("currency", UserSchema);

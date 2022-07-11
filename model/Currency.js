const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  currencyName: {
    type: String,
    required: true,
    unique: true,
  },
  tokenCount: {
    type: Number,
    required: true,
  },
  organizationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "organizations",
  },
});
module.exports = mongoose.model("currencies", UserSchema);

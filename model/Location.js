const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
  cordinates: {
    type: GeolocationCoordinates,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  postalcode: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("owner", UserSchema);

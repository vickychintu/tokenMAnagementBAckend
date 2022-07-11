const { hash } = require("bcryptjs");
const mongoose = require("mongoose");
const myDB = mongoose.connection.useDb("organizations");
const UserSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
  },
  initiatorId: {
    type: String,
  },
  acknowledgerId: {
    type: String,
  },
  creationTime: {
    type: Number,
    required: true,
  },
  associatedAmount: Number,
  attempts: [
    {
      type: {
        type: String,
      },
      timerLog: {
        type: Number,
      },
      transactionId: {
        type: String,
      },
      status: {
        type: Boolean,
      },
    },
  ],
});
const createOrders = (orderTableName) => {
  return myDB.model(`${orderTableName}_orders`, UserSchema);
};
module.exports = createOrders;

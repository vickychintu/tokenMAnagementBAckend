const mongoose = require("mongoose");
const myDB = mongoose.connection.useDb("organizations");
const UserSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  orderId: {
    type: String,
    required: true,
  },
  amt: {
    type: String,
    required: true,
  },
  stages: { initiated: Number, acknowledged: Number, completed: Number },
  Status: Boolean,
  debtorId: {
    type: String,
    required: true,
  },
  creditorId: {
    type: String,
    required: true,
  },
  remarks: {
    type: String,
  },
  currencyName: {
    type: String,
    required: true,
  },
});
const orgLedgerTable = (tableName) => {
  return myDB.model(`${tableName}_ledger`, UserSchema);
};
module.exports = orgLedgerTable;

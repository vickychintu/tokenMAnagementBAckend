const accountInfo = require("../../model/accountInfo");
const orgLedgerTable = require("../../model/LedgerId");
const organization = require("../../model/organization");

const generateTransaction = async (
  orderId,
  walletId,
  toWalletId,
  amt,
  organizationId,
  remarks
) => {
  const initiationTime = Date.now();
  const orgCurrency = await organization
    .findOne(
      { organizationId: organizationId },
      "-_id organizationId organizationName"
    )
    .populate({
      path: "currencyId",
      select: "-_id currencyName tokenCount",
    });
  if (!orgCurrency) {
    return false;
  }
  const ledger = await orgLedgerTable(`${organizationId}`).create({
    transactionId: transactionId(walletId, toWalletId),
    orderId: orderId,
    amt: amt,
    stages: { initiated: initiationTime },
    debtorId: walletId,
    creditorId: toWalletId,
    remarks: remarks || "nothing",
    currencyName: orgCurrency.currencyId.currencyName,
  });
  return ledger.transactionId;
};
const acknowledgeTransaction = async (transactionId, organizationId) => {
  console.log("transactionId", organizationId);
  const docs = await orgLedgerTable(`${organizationId}`).findOne(
    {
      transactionId: transactionId,
    },
    "-_id "
  );
  if (docs) {
    console.log(docs);
    const balance = await accountInfo.findOne({ walletId: docs.debtorId });

    if (balance.status && balance.bal >= docs.amt) {
      const credStatus = await accountInfo.findOne({
        walletId: docs.creditorId,
        organizationId: organizationId,
      });
      console.log(credStatus);
      if (credStatus?.status) {
        console.log("pass2");
        const ackTime = Date.now();
        const transaction = await orgLedgerTable(`${organizationId}`).updateOne(
          {
            transactionId: transactionId,
          },
          { $set: { "stages.acknowledged": ackTime } }
        );
        if (transaction) {
          await accountInfo.findOneAndUpdate(
            { walletId: docs.debtorId },
            { $inc: { bal: -docs.amt } }
          );
          await accountInfo.findOneAndUpdate(
            { walletId: docs.creditorId },
            { $inc: { bal: docs.amt } }
          );
          const completionTime = Date.now();
          await orgLedgerTable(`${organizationId}`).updateOne(
            {
              transactionId: transactionId,
            },
            { $set: { "stages.completed": completionTime } }
          );
          return {
            msg: "transaction successful",
            status: true,
          };
        } else {
          //could not complete transaction
          return {
            msg: "server error",
            status: false,
          };
        }
      } else {
        // wallet id does not belong to the organization
        return {
          msg: "wallet id not valid, must belong to the same organization",
          status: false,
        };
      }
    } else {
      //insufficient balance
      return {
        msg: "insufficient balance",
        status: false,
      };
    }
  } else {
    //could not find transaction
    return {
      msg: "transaction not found",
      status: false,
    };
  }
};
const transactionId = (walletId, toWalletId) => {
  const current = Date.now();
  const orderNumber = Math.floor(
    100000000 * (current / 100000000 - Math.floor(current / 100000000))
  );
  const fromUser = walletId.split("@", 1);
  const toUser = toWalletId.split("@", 1);
  const transactionId = `${fromUser}${orderNumber}${toUser}`;
  return transactionId;
};
module.exports = { generateTransaction, acknowledgeTransaction };

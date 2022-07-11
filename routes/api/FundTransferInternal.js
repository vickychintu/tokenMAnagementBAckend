const express = require("express");
const { verifyToken } = require("../../middleware/auth");
const { validateReq } = require("../commonFunctions/objectmatcher");
const {
  createOrder,
  updateOrder,
} = require("../transactionFunctions.js/orders");
const {
  generateTransaction,
  acknowledgeTransaction,
} = require("../transactionFunctions.js/transactions");
const router = express.Router();

router.post("/", verifyToken, async (req, res) => {
  try {
    console.log(req.body);
    const typeCheck = {
      walletId: "string",
      toWalletId: "string",
      organizationId: "string",
      amt: "number",
      remarks: "string",
    };
    const validatedReq = validateReq(typeCheck, req.body);
    if (validatedReq) {
      res.status(400).json({ msg: validatedReq, code: 402 });
      return;
    }
    const userName = req.user.id;
    const { walletId, toWalletId, organizationId, amt, remarks } = req.body;
    const orderId = await createOrder(
      walletId,
      toWalletId,
      organizationId,
      amt
    );
    if (!orderId) {
      res.status(400).json({ msg: "could not create order", code: 403 });
      return;
    }
    const transactionId = await generateTransaction(
      orderId,
      walletId,
      toWalletId,
      amt,
      organizationId
    );
    if (!transactionId) {
      res.status(400).json({ msg: "organization does not exist", code: 402 });
      return;
    }
    console.log("hi");
    const acknowledge = await acknowledgeTransaction(
      transactionId,
      organizationId
    );
    console.log("bye");
    console.log(acknowledge);
    if (acknowledge.status) {
      const alterOrder = await updateOrder(
        orderId,
        transactionId,
        "fundTransfer",
        true,
        organizationId
      );
      res.status(200).json({
        msg: "transaction successfully",
        code: 200,
        transactionId: transactionId,
        orderId: orderId,
      });
    } else if (!acknowledge.status) {
      console.log(acknowledge);
      const alterOrder = await updateOrder(
        orderId,
        transactionId,
        "fundTransfer",
        false,
        organizationId
      );
      res.status(400).json({
        msg: acknowledge.msg,
        transactionId: transactionId,
        code: 404,
      });
    } else res.status(400).json({ msg: "server error " });
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "server error", code: 401 });
  }
});

module.exports = router;

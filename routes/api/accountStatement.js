const express = require("express");
const { verifyToken } = require("../../middleware/auth");
const orgLedgerTable = require("../../model/LedgerId");
const router = express.Router();
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { organizationId, skip, limit } = req.query;

    orgLedgerTable(`${organizationId}`)
      .find({
        $or: [
          { debtorId: `${userId}@${organizationId}` },
          { creditorId: `${userId}@${organizationId}` },
        ],
      })
      .skip(0)
      .limit(10)
      .exec(function (err, docs) {
        if (err) {
          res.status(400).json({ msg: "system error", code: 401 });
        } else if (docs) {
          const finalTransaction = docs.map((element, index) => {
            let singleTransaction = {};
            if (element.debtorId == `${userId}@${organizationId}`) {
              singleTransaction["amt"] = -element.amt;
              singleTransaction["walletId"] = element.creditorId;
            } else {
              singleTransaction["walletId"] = element.debtorId;
              singleTransaction["amt"] = element.amt;
            }
            singleTransaction["transactionId"] = element.transactionId;
            singleTransaction["remarks"] = element.remarks;
            singleTransaction["time"] = element.stages.initiated;
            if (element.stages.completed) {
              singleTransaction["status"] = true;
            } else {
              singleTransaction["status"] = false;
            }
            return singleTransaction;
          });
          console.log(finalTransaction);
          res.status(200).json(finalTransaction);
        } else {
          res.status(400).json({ msg: "system error", code: 401 });
        }
      });
  } catch (e) {
    res.status(400).json({ msg: "system error", code: 401 });
  }
});
module.exports = router;

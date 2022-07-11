const express = require("express");
const { verifyToken } = require("../../middleware/auth");
const accountInfo = require("../../model/accountInfo");
const orgLedgerTable = require("../../model/LedgerId");
const organization = require("../../model/organization");
const router = express.Router();
router.put("/", verifyToken, async (req, res) => {
  const userName = req.user.id;
  const { organizationId, walletId } = req.body;
  organization
    .countDocuments({
      organizationId: organizationId,
      authId: userName,
    })
    .exec(async (err, count) => {
      if (err) {
        res.status(400).json({ msg: "error detected" });
      } else if (count == 1) {
        accountInfo
          .findOneAndUpdate(
            {
              walletId: walletId,
              organizationId: organizationId,
              status: false,
            },
            { status: true },
            { new: true }
          )
          .exec((err, docs) => {
            if (err) {
              res.status(400).json({ msg: "error detected" });
            } else if (docs?.status == true) {
              res.status(200).json({ msg: "account successfully activated" });
            } else {
              res.status(400).json({ msg: "no inactive account found" });
            }
          });
      }
    });
});
module.exports = router;

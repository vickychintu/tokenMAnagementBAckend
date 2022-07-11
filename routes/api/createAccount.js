const express = require("express");
const { verifyToken } = require("../../middleware/auth");
const accountInfo = require("../../model/accountInfo");
const organization = require("../../model/organization");
const User = require("../../model/User");
const router = express.Router();
router.post("/", verifyToken, (req, res) => {
  console.log(req.body);
  console.log(req.user);
  const userName = req.user.id;
  User.countDocuments(
    { userName: req.user.id, userType: "regular" },
    (err, count) => {
      if (err) {
        res.status(400).json({ msg: "database error" });
      } else if (count == 1) {
        organization.countDocuments(
          { organizationId: req.body.organizationId },
          (err, count) => {
            if (err) {
              res.status(400).json({ msg: "database error" });
            } else if (count == 1) {
              const walletId = createWalletId(
                userName,
                req.body.organizationId
              );
              accountInfo.create(
                {
                  walletId: walletId,
                  bal: 0,
                  lastTransactionTime: 0,
                  userId: userName,
                  organizationId: req.body.organizationId,
                  status: false,
                  type: "regular",
                },
                (err, docs) => {
                  if (err) {
                    console.log(err);
                    if (err.code == 11000) {
                      accountInfo.findOne(
                        { walletId: walletId },
                        { status: 1 },
                        (err, docs) => {
                          console.log(docs.status);
                          const accMsg = docs.status
                            ? { msd: "account already exists", code: 100 }
                            : { msd: "request already sent", code: 101 };
                          res.status(400).json(accMsg);
                        }
                      );
                    } else {
                      res
                        .status(400)
                        .json({ msg: "error logging to database" });
                    }
                  } else {
                    res
                      .status(200)
                      .json({ msg: "successful created an account" });
                  }
                }
              );
            } else {
              res
                .status(404)
                .json({ msg: "organization does not exist", code: 108 });
            }
          }
        );
      } else {
        res.status(404).json({ msg: "user does not exist" });
      }
    }
  );
});
const createWalletId = (userName, OrganizationId) => {
  return `${userName}@${OrganizationId}`;
};
module.exports = router;

const express = require("express");
const { verifyToken } = require("../../middleware/auth");
const accountInfo = require("../../model/accountInfo");
const organization = require("../../model/organization");
const router = express.Router();
router.get("/", verifyToken, async (req, res) => {
  const organizationId = req.query.organizationId;
  const userName = req.user.id;
  await organization
    .countDocuments({
      organizationId: organizationId,
      authId: userName,
    })
    .exec(async (err, count) => {
      console.log(count);
      if (err) {
        res.status(400).json({ msg: "database error" });
      } else if (count == 1) {
        await accountInfo
          .find({ organizationId: organizationId }, "-_id -__v")
          .exec((err, docs) => {
            console.log("harder", docs);
            if (err) {
              res.status(400).json({ msg: "database error" });
            } else {
              res.status(200).json(docs ? docs : { msg: "no data" });
            }
          });
      } else {
        res.status(400).json({ msg: "not organization admin" });
      }
    });
});
router.get("/user", verifyToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const userAccounts = await accountInfo
      .find({ userId: userId }, "-_id -__v")
    if (userAccounts) {
      res.status(200).json(userAccounts);
    } else {
      res.status(200).json({ msg: "no user found" });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({ msg: "database error" });
  }
});
module.exports = router;

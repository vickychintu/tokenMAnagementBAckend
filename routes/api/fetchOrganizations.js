const express = require("express");
const { verifyToken } = require("../../middleware/auth");
const accountInfo = require("../../model/accountInfo");
const Currency = require("../../model/Currency");
const organization = require("../../model/organization");
const User = require("../../model/User");
const router = express.Router();
router.get("/", verifyToken, async (req, res) => {
  const userName = req.user.id;
  const skip = parseInt(req.query.skip) || 0;
  await User.countDocuments({ userName: userName, type: "admin" }).exec(
    async (err, count) => {
      console.log("first execute");
      if (count == 1) {
        await organization
          .find({ userName: userName }, "-_id organizationId organizationName")
          .populate({
            path: "currencyId",
            select: "-_id currencyName tokenCount",
          })
          .exec(async (err, details) => {
            console.log("first");
            let exitValue = JSON.parse(JSON.stringify(details));
            for (const i in exitValue) {
              console.log("loops");
              const acctInfo = await accountInfo.aggregate([
                {
                  $match: { organizationId: details[i]?.organizationId },
                },
                {
                  $group: {
                    _id: "$status",
                    count: { $count: {} },
                  },
                },
              ]);
              exitValue[i].accountsInfo = acctInfo;
            }
            console.log(exitValue);
            if (err) {
              res.status(400).json("err", "Something went wrong!");
            } else {
              console.log(exitValue);
              res.status(200).json(exitValue);
            }
          });
      }
    }
  );
  organization.find({ authId: userName });
});
module.exports = router;

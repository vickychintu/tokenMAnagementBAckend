const express = require("express");
const md5 = require("md5");
const { generateToken, verifyToken } = require("../../middleware/auth");
const Currency = require("../../model/Currency");
const orgLedgerTable = require("../../model/LedgerId");
const organization = require("../../model/organization");
const router = express.Router();
const User = require("../../model/User");
//creating organization
router.post("/", verifyToken, async (req, res) => {
  const { currencyName, organizationName, organizationId, initialTokens } =
    req.body;
  try {
    const id = req.user.id;
    const result = User.find(
      { userName: id, type: "admin" },
      async (err, docs) => {
        if (err) {
          res.status(403).json({ err: "database error" });
        } else if (!docs) {
          res.status(401).json({ err: "user does not exist" });
        } else if (docs.length == 1) {
          try {
            let newOrganization = await new organization({
              organizationId,
              organizationName,
              authId: id,
              ledgerId: `${organizationId}@lazyLedger`,
            });
            let newCurrency = await new Currency({
              currencyName,
              tokenCount: initialTokens,
              organizationId: newOrganization._id,
            });
            newOrganization.currencyId = newCurrency._id;
            await newCurrency.save();
            await newOrganization.save();
            res.status(200).json({ msg: "organization created successfully" });
          } catch (e) {
            console.log(e);
            res.status(404).json({ msg: "err" });
          }
        }
      }
    );
  } catch (e) {
    res.status(501).json({ err: "server down" });
  }
});
module.exports = router;

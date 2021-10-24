const express = require("express");
const router = express.Router();

//@route /api/auth
//@desc test route
//@acess privte

router.get("/", (req, res) => {
  res.send("user route");
});

module.exports = router;

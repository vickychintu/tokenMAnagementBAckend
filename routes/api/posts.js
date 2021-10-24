const express = require("express");
const router = express.Router();

//@route /api/posts
//@desc test route
//@acess public

router.get("/", (req, res) => {
  res.send("user route");
});

module.exports = router;

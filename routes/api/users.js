const express = require("express");
const router = express.Router();
const UserSchema = require("../../model/User");
//@route /api/users post request
//@desc test route
//@acess public

router.post("/", async (req, res) => {
  try {
    var user = new UserSchema({
      year: 1997,
      month: 12,
      date: 13,
      hour: 18,
      mins: 40,
      Factory: "Banglore",
      Machine: "M1",
    });
    // await user.save();

    var from = new Date(2021, 6, 4);
    var to = new Date();

    // loop for every day
    for (var day = from; day <= to; day.setDate(day.getDate() + 1)) {
      for (var i = 1; i <= 24; i++) {
        await UserSchema.insertMany({
          year: day.getYear(),
          month: day.getMonth(),
          date: day.getDate(),
          hour: i,
          mins: Math.floor(16 + Math.random() * 40),
          Factory: "Banglore",
          Machine: "M1",
        });
      }
    }
    console.log(req.body);
    res.send("user route");
  } catch (err) {
    console.log | err.messsage;
    res.status(500).send("server error");
  }
  console.log(req.body);
  res.send("user route");
});
module.exports = router;

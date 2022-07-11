/*
    This is the file which is called during the login of all user.
    Each user will have own ENUM which will be passed to common "login" function 
    Created By: Subramanian K - 24/1/2022
*/
const express = require("express");
const md5 = require("md5");
const { generateToken, verifyToken } = require("../../middleware/auth");
const router = express.Router();
const User = require("../../model/User");
/*
This function used to authorize user on login
    1)Get user input 
    2)Decrypt the password
    3)Validate the user information with the database to check if user exists.
    4)And finally,generate JWT token for the session and send it to the frontend.
*/
router.post("/", (req, res) => {
  console.log(req.body);
  const { userName, password, userType } = req.body;
  const hashedPassword = password && md5(password);
  User.countDocuments(
    {
      userName: userName,
      password: hashedPassword,
      userType: userType,
    },
    (err, count) => {
      const jwt = generateToken(userName);
      if (count == 1) {
        console.log("in");
        res.status(200).json({ msg: "logged in successfully", token: jwt });
      } else {
        res
          .status(400)
          .json({ msg: "username and password does not match", code: 7 });
      }
    }
  );
});
router.post("/verify", verifyToken, (req, res) => {
  console.log(req.user.id, req.user.type);
  User.findOne(
    {
      userName: req.user.id,
      userType: req.body.userType,
    },
    "-_id -__v -password -userId ",
    (err, docs) => {
      console.log(err);
      if (err) {
        res.status(403).json({ err: "database error" });
      } else if (docs) {
        res
          .status(200)
          .json({ msg: "logged in successfully", userDetails: docs });
      } else {
        res.status(400).json({ msg: "user does not exist" });
      }
    }
  );
});

module.exports = router;

/*
    This is the file which is called during the login of all user.
    Each user will have own ENUM which will be passed to common "login" function 
    Created By: Subramanian K - 16/06/2022
*/
const express = require("express");
const { validateReq } = require("../commonFunctions/objectmatcher");
const router = express.Router();
const User = require("../../model/User");
const md5 = require("md5");

/*
This function used to authorize user on login
    1)Get the input for Organization creation {adminName ,adminEmail,OrganizationName,adminPassword,currencyName}
    2)if organization database exists save document to database else create document in mongo db. 
    4)And finally,generate JWT token for the session and return it.
*/
router.post("/", async (req, res) => {
  console.log("f");
  const bodyObject = req.body;
  const typeCheck = {
    name: "string",
    userName: "string",
    email: "email",
    password: "password",
  };
  const errorCode = validateReq(typeCheck, req.body);
  if (errorCode) {
    res.status(500).send({
      message: errorCode,
    });
    return;
  }
  try {
    let { name, userName, email, password, userType } = req.body;
    adminPassword = md5(password);
    const signup = await User.create({
      emailId: email,
      name: name,
      userId: generateUserId(userName),
      password: md5(password),
      userName: userName,
      userType: userType,
    });
    res.status(200).send(`Signup successful`);
    console.log(adminName);
  } catch (e) {
    const errorCode = e.code;
    const mailCheck = e.keyPattern?.emailId;
    const uNameCheck = e.keyPattern?.userName;
    switch (errorCode) {
      case 11000:
        if (mailCheck) {
          res.status(500).json({ msg: "mail already exists", code: 1 });
        }
        if (uNameCheck) {
          res.status(500).json({ msg: "userName already exists", code: 2 });
        }
        break;
      default:
        console.log("error");
        break;
    }
  }
});
const generateUserId = (uName) => {
  return uName + Date.now();
};
module.exports = router;

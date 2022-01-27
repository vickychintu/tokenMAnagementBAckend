/*
    This is the file which is called during the login of all user.
    Each user will have own ENUM which will be passed to common "login" function 
    Created By: Subramanian K - 24/1/2022
*/
const express = require("express");
const router = express.Router();

/*
This function used to authorize user on login
    1)Get user input 
    2)Decrypt the password
    3)Validate the user information with the database to check if user exists.
    4)And finally,generate JWT token for the session and send it to the frontend.
*/
router.get("/", (req, res) => {});

module.exports = router;

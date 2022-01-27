/*
    This is the file which is to fetch order history of a particular user from DB
    Created By: Subramanian K - 24/1/2022
*/

//Dependencies
const express = require("express");
const router = express.Router();

/*
This function is used to create an api for retreiving order history for a particular user within a given range
    1) get timerange from req
    2) retrieve the orderdetails for the given time range from the orders database
    3) filter the required order field's and return them
*/
router.get("/", (req, res) => {});

//Export the API route
module.exports = router;

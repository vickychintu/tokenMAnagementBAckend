/*
  This file is called when the order is processed
  It processes both app generated order and machine generated order 
  Created By: Subramanian K - 24/1/2022
*/

//Importing all the required dependences
const express = require("express");
const router = express.Router();
//
/*
  object to store order details such as 
    -userId
    -machineId
    -SKUId
    -price
    -quantity
    -timestamp
*/
const orderdetails;

//an encoding function that generates orderId with userId, machineId,timestamp
var generateOrderId=(orderdetails)=>{

  /*
   How?
   S1) Use one of the encoding Algorithims such as md5,sha-256,sha-1.
   s2) Using one of the Algorithims on the userId machineId,timestamp and generate a encoded string
   S3) Return the encoded string

   human readable + unique + sales should not be back calculatable 

   */
}
/*
  fetch wallet balance for userId and return balance 
  */
var fetchWalletBalance=(userId)=>{

  /*

  */
}

var orderEligibility=(fetchwalletBal,price)=>{
  /* 
     S1) check order eligibility if the available tokens are enough for processing order.
     S2) if not check free bucket is valid for the order using freeBucketValidator().
     S3) if user has required tokens return true else return false.
*/
}

/*check if free bucket is valid for this order*/
var freeBucketValidator=(price)=>{
  /*
    S1) check if free bucket amounts to required price
    S2) apply required coupons
    S3) return true if freebucket can be claimed else return false
  */
}

/*
  function used Generate an order by adding it to the orders database
  and update the status of the ortder as nessary
*/
var generateOrder=()=>{

}

/*This function changes the order status based on the order request */
var changeOrderStatus=(request)=>{
  /*
      S1)Based on request update order request
      S2)Update the orders database based on the status
  */
}

//Create an Post API to process order
router.post("/", async (req, res) => {
  
});

//Export the API route
module.exports = router;

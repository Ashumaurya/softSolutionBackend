var express = require("express");
var router = express.Router();
const {
  createTransaction,
  getTransactionsBydivisionID,
  getTransactionsByDivision,
  getTransactionsBydivisionIDExample,
} = require("../controllers/transaction");
var { check } = require("express-validator");
const Customer = require("../models/customer");
router.post(
  "/createtransaction",
  //   check("transactionType").custom((value) => {
  //     if (value != "Paid" || value != "Recieved") {
  //       return Promise.reject("TransactionType should be Paid or Recieved");
  //     }
  //   }),
  check("customer").custom((value) => {
    return Customer.findById(value).then((customer) => {
      if (!customer) {
        return Promise.reject("This CustomerId does not exists");
      }
    });
  }),

  createTransaction
);

router.param("DivisionId", getTransactionsBydivisionIDExample);
router.get(
  "/transactionbydivision/divisionID=:DivisionId",
  getTransactionsByDivision
);

module.exports = router;

// example

// {
//     "_id" : ObjectId("6100ffdab0f37a6024081e32"),
//     "transaction" : [],
//     "firstName" : "Ashish",
//     "lastName" : "Maurya",
//     "email" : "ashish.1999@gmail.com",
//     "phone" : 876127368323.0,
//     "address" : "Adresss",
//     "createdAt" : ISODate("2021-07-28T06:57:30.770Z"),
//     "updatedAt" : ISODate("2021-07-28T06:57:30.770Z"),
//     "__v" : 0
// }

// Division

// {
//     "_id" : ObjectId("61012ba11f347d64e4a9f283"),
//     "name" : "XYZ",
//     "createdAt" : ISODate("2021-07-28T10:04:17.239Z"),
//     "updatedAt" : ISODate("2021-07-28T10:04:17.239Z"),
//     "__v" : 0
// }

var express = require("express");
var router = express.Router();
var { createCustomer, getCustomer } = require("../controllers/customer");
var { check } = require("express-validator");
var Customer = require("../models/customer");
router.get("/getcustomer", getCustomer);
router.post(
  "/createcustomer",
  check("firstName")
    .isLength({ min: 2 })
    .withMessage("first Name must be atleast 2 char"),
  check("email").isEmail().withMessage("Please enter a valid email"),
  check("phone")
    .isInt()
    .isLength({ min: 10, max: 10 })
    .withMessage("Enter a valid Phone Number"),
  check("email").custom((value) => {
    return Customer.findOne({ email: value }).then((customer) => {
      if (customer) {
        return Promise.reject("E-mail already in use");
      }
    });
  }),
  createCustomer
);
router.get("");
module.exports = router;

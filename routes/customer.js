var express = require("express");
var router = express.Router();
var { createCustomer } = require("../controllers/customer");

router.get("/createcustomer", createCustomer);

module.exports = router;

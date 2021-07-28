var express = require("express");
var router = express.Router();
const { createTransaction } = require("../controllers/transaction");

router.post("/createtransaction", createTransaction);
module.exports = router;

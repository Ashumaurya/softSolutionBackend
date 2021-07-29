const Transaction = require("../models/transaction");
const { validationResult } = require("express-validator");
const Customer = require("../models/customer");
const createTransaction = (req, res) => {
  const errors = validationResult(req);
  const transaction = new Transaction(req.body);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  transaction.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    Customer.findById(data.customer)
      .then((customerData) => {
        customerData.transaction.push(data);
        console.log(customerData.transaction);
      })
      .catch((err) => console.log(err));
    res.json(data);
  });
  console.log(req.body);
};

module.exports = { createTransaction };

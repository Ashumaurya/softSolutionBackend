const Transaction = require("../models/transaction");
const { validationResult } = require("express-validator");
const Customer = require("../models/customer");
const createTransaction = (req, res) => {
  console.log(req.body);
  const errors = validationResult(req);
  const transaction = new Transaction(req.body);
  let transactionList = [];
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
        transactionList = customerData.transaction;
        console.log(transactionList);
        Customer.findByIdAndUpdate(
          data.customer,
          {
            $set: { transaction: transactionList },
          },
          { new: true },
          (err, model) => {
            if (err) {
              console.log(err);
            }
            console.log(model);
          }
        );
      })
      .catch((err) => console.log(err));

    res.json(data);
  });
  // console.log(req.body);
};

const getTransactionsBydivisionID = (req, res, next, id) => {
  Transaction.find({ division: id }).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        err: "No user Data find in Database",
      });
    }
    console.log(data);
    req.transactionByid = data;
    next();
  });
};
const getTransactionsByDivision = (req, res) => {
  return res.json(req.transactionByid);
};

module.exports = {
  createTransaction,
  getTransactionsBydivisionID,
  getTransactionsByDivision,
};

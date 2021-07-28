const Customer = require("../models/customer");
const { validationResult } = require("express-validator");

const createCustomer = (req, res) => {
  const customer = new Customer(req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: errors.array()[0].msg,
      param: errors.array()[0].param,
    });
  }
  customer.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: err,
      });
    }
    res.json(user);
  });
};

const getCustomer = (req, res) => {
  res.json({
    message: " this is a customer",
  });
};

module.exports = { createCustomer, getCustomer };

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
  Customer.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => res.send(err));
};

const getCustomerById = (req, res, next, id) => {
  Customer.findById(id).exec((err, data) => {
    if (err || !data) {
      return res.status(400).json({
        error: "No user found in DB",
      });
    }
    req.profile = user;
    next();
  });
};

module.exports = { createCustomer, getCustomer, getCustomerById };

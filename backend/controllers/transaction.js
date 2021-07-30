const Transaction = require("../models/transaction");
const { validationResult } = require("express-validator");
const Customer = require("../models/customer");
const Division = require("../models/division");
const async = require("async");
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
const getTransactionsBydivisionIDExample = (req, res, next, id) => {
  Transaction.find({ division: id }).exec(async (err, data) => {
    let resData;
    if (err || !data) {
      return res.status(400).json({
        err: "No user Data find in Database",
      });
    }
    async function fun() {
      return new Promise(async (resolve, reject) => {
        let newData = await Promise.all(
          data.map(async (transactionData) => {
            const object = {
              _id: transactionData._id,
              customer: "",
              ammount: transactionData.ammount,
              division: "",
              transactionType: transactionData.transactionType,
            };
            async function Divisionfun() {
              await Division.findById(transactionData.division).then((data) => {
                object.division = data.name;
              });
              await Customer.findById(transactionData.customer).then((data) => {
                object.customer = `${data.firstName} ${data.lastName}`;
              });
            }
            await Divisionfun();

            return object;
          })
        );
        if (newData.length > 0) {
          resolve(newData);
        } else {
          const err = "Data is empty";
          reject(err);
        }
      });
    }

    await fun()
      .then((value) => {
        resData = value;
      })
      .catch((err) => console.log(err));
    console.log(resData);
    // req.transactionByid = data;
    req.transactionByid = resData;
    next();
  });
};

const getTransactionsByDivision = (req, res) => {
  return res.json(req.transactionByid);
};

const getTransactionDetailByCustomerId = (req, res, next, id) => {
  Transaction.find({ customer: id }).exec(async (err, data) => {
    let resData;
    if (err || !data) {
      return res.status(400).json({
        err: "No user Data find in Database",
      });
    }
    async function fun() {
      return new Promise(async (resolve, reject) => {
        let newData = await Promise.all(
          data.map(async (transactionData) => {
            const object = {
              _id: transactionData._id,
              customer: "",
              ammount: transactionData.ammount,
              division: "",
              transactionType: transactionData.transactionType,
            };
            async function Divisionfun() {
              await Division.findById(transactionData.division).then((data) => {
                object.division = data.name;
              });
              await Customer.findById(transactionData.customer).then((data) => {
                object.customer = `${data.firstName} ${data.lastName}`;
              });
            }
            await Divisionfun();

            return object;
          })
        );
        if (newData.length > 0) {
          resolve(newData);
        } else {
          const err = "Data is empty";
          reject(err);
        }
      });
    }

    await fun()
      .then((value) => {
        resData = value;
      })
      .catch((err) => console.log(err));
    console.log(resData);
    // req.transactionByid = data;
    req.transactionByCustomerid = resData;
    next();
  });
};
const getTransactionByCustomer = (req, res) => {
  res.json(req.transactionByCustomerid);
};

module.exports = {
  createTransaction,
  getTransactionsBydivisionID,
  getTransactionsByDivision,
  getTransactionsBydivisionIDExample,
  getTransactionDetailByCustomerId,
  getTransactionByCustomer,
};

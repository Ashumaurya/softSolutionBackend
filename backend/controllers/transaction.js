const createTransaction = (req, res) => {
  res.send("transaction");
  console.log(req.body);
};

module.exports = { createTransaction };

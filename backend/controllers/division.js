const Division = require("../models/division");
const createDivision = (req, res) => {
  const division = new Division(req.body);
  division.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err,
      });
    }
    res.json(data);
  });
};

module.exports = { createDivision };

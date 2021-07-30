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
const getDivisions = (req, res) => {
  Division.find()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
};

module.exports = { createDivision, getDivisions };

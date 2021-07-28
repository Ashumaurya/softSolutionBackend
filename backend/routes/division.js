var express = require("express");
var router = express.Router();
var { createDivision } = require("../controllers/division");

router.post("/createdivision", createDivision);

module.exports = router;

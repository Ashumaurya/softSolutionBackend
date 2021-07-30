var express = require("express");
var router = express.Router();
var { createDivision, getDivisions } = require("../controllers/division");

router.post("/createdivision", createDivision);
router.get("/getdivisions", getDivisions);
module.exports = router;

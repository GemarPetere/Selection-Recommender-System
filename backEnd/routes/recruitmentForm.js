const express = require("express");
const router = express.Router();

const  { recruit }  = require("../controllers/recruitFarmer")

router.post("/recruitement", recruit)

module.exports = router;
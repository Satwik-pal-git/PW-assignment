const express = require('express');
const addDetails = require("../controller/getSS");

const router = express.Router();

router
    .route("/")
    .get(addDetails.getSS)


module.exports = router;
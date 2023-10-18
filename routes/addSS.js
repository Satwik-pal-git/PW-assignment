const express = require('express');
const addDetails = require("../controller/addDetails");

const router = express.Router();

router
    .route("/")
    .get(addDetails.getAdd)
    .post(addDetails.setAdd)


module.exports = router;
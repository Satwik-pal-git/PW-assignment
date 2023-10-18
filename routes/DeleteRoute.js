const express = require('express');
const deleteDetails = require("../controller/deleteDetail");

const router = express.Router();

router
    .route("/")
    .post(deleteDetails.setDelete)


module.exports = router;
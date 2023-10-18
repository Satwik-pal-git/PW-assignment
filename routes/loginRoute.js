const express = require('express');
const loginDetail = require("../controller/authController");
const router = express.Router();

router
    .route("/")
    .get(loginDetail.getLogin)
    .post(loginDetail.login)

router
    .route("/register")
    .get(loginDetail.getRegister)
    .post(loginDetail.signUp)


module.exports = router;
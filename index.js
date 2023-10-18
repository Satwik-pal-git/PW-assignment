const express = require("express")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");
const ejs = require("ejs");
var bodyParser = require('body-parser');
const getSSRoute = require("./routes/getSS");
const addSSRoute = require("./routes/addSS");
const getSSCombo = require("./routes/getSSCombo");
const getSSDept = require("./routes/getSSDept");
const getSSContract = require("./routes/SSContract");
const DeleteRoute = require("./routes/DeleteRoute");
const loginRoute = require("./routes/loginRoute");
dotenv.config({ path: ".env" });
const connectDB = require("./config/db");
connectDB();
const ensureAuth = require("./controller/authController");

const app = express();
// app.use(express.static(path.join(__dirname, "/public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");

app.use('/', loginRoute);
app.use("/add", addSSRoute);
app.use("/allSS", getSSRoute);
app.use("/delete", DeleteRoute);
app.use("/getSSCombine", getSSCombo);
app.use("/DeptSS", getSSDept);
app.use("/getSSContract", getSSContract);

app.get("/*", (req, res) => {
    res.status(404).json({
        status: '404 Not Found',
        message: `Can't find the ${req.originalUrl} on the server`
    })
});

app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on ${PORT}`));
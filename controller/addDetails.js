const Details = require("../models/details");

exports.getAdd = async (req, res) => {
    res.render("app");
}
exports.setAdd = async (req, res) => {
    var details = req.body;
    var newData = new Details(details);
    newData.save().then(item => {
        res.status(200).redirect("/add");
    }).catch(err => {
        res.status(400).json({
            status: "fail, Unavailable to save to database",
            message: err.message
        });
    })
}

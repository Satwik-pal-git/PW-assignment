const Details = require("../models/details");

exports.setDelete = async (req, res) => {
    const dataElement = await Details.find().sort({ "_id": -1 }).limit(1);
    console.log(dataElement);
    const Id = dataElement[0]._id;
    await Details.deleteOne({ _id: Id }).then(item => {
        console.log("deleted successfully");
        res.status(200).redirect("/add");
    }).catch(err => {
        res.status(400).send("Unavailable to Delete from the database");
    })
}

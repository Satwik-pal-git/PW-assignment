const Details = require("../models/details");

exports.getSS = async (req, res) => {
    try {
        const mn = await Details.aggregate([
            {
                $group: {
                    _id: null,
                    min_value: { $min: "$salary" }
                }
            }
        ]);
        const mx = await Details.aggregate([
            {
                $group: {
                    _id: null,
                    max_value: { $max: "$salary" }
                }
            }
        ]);
        // await mx.forEach(console.dir);
        const meanValue = await Details.aggregate([
            {
                $group: {
                    _id: null,
                    average: { $avg: "$salary" }
                }
            }
        ]);
        // await meanValue.forEach(console.dir);

        // console.log(mn, mx, meanValue);
        const SS = { "Min Value": `${mn[0].min_value}`, "Max Value": `${mx[0].max_value}`, "Mean Value": `${meanValue[0].average}` };
        // console.log(SS);
        res.status(200).send(SS);
    } catch (err) {
        res.status(400).json({
            status: "failed to fetch data from the database",
            message: err.message
        });
    }
};

exports.getSSDept = async (req, res) => {
    try {
        const mn = await Details.aggregate([
            {
                $group: {
                    _id: "$department",
                    min_value: { $min: "$salary" }
                }
            }
        ]);
        // await mn.forEach(console.dir);
        const mx = await Details.aggregate([
            {
                $group: {
                    _id: "$department",
                    max_value: { $max: "$salary" }
                }
            }
        ]);
        const meanValue = await Details.aggregate([
            {
                $group: {
                    _id: "$department",
                    average: { $avg: "$salary" }
                }
            }
        ]);
        const SSDept = { "Min Value": mn, "Max Value": mx, "Mean Value": meanValue };
        console.log(SSDept);
        res.status(200).send(SSDept);
    } catch (err) {
        res.status(400).json({
            status: "failed to fetch data from the database",
            message: err.message
        });
    }

};

exports.getSS_contract = async (req, res) => {
    try {
        const mn = await Details.aggregate([
            {
                $match: {
                    on_contract: true
                }
            },
            {
                $group: {
                    _id: "$department",
                    min_value: { $min: "$salary" }
                }
            }
        ]);
        const mx = await Details.aggregate([
            {
                $match: {
                    on_contract: true
                }
            },
            {
                $group: {
                    _id: "$department",
                    max_value: { $max: "$salary" }
                }
            }
        ]);
        const meanValue = await Details.aggregate([
            {
                $match: {
                    on_contract: true
                }
            },
            {
                $group: {
                    _id: "$department",
                    average: { $avg: "$salary" }
                }
            }
        ]);
        const SS_contract = { "Min Value": mn, "Max Value": mx, "Mean Value": meanValue };
        console.log(SS_contract);
        res.status(200).send(SS_contract);
    } catch (err) {
        res.status(400).json({
            status: "failed to fetch data from the database",
            message: err.message
        });
    }

};

exports.getSSCombo = async (req, res) => {
    try {
        const mn = await Details.aggregate([
            {
                $group: {
                    _id: { department: "$department", sub_department: "$sub_department" },
                    min_value: { $min: "$salary" }
                }
            }
        ]);
        const mx = await Details.aggregate([
            {
                $group: {
                    _id: { department: "$department", sub_department: "$sub_department" },
                    max_value: { $max: "$salary" }
                }
            }
        ]);
        const meanValue = await Details.aggregate([
            {
                $group: {
                    _id: { department: "$department", sub_department: "$sub_department" },
                    average: { $avg: "$salary" }
                }
            }
        ]);
        const SS_combo = { "Min Value": mn, "Max Value": mx, "Mean Value": meanValue };
        console.log(SS_combo);
        res.status(200).send(SS_combo);
    } catch (err) {
        res.status(400).json({
            status: "failed to fetch data from the database",
            message: err.message
        });
    }
};




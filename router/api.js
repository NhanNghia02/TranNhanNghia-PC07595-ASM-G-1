const Categories = require("../model/categories");

exports.list = async (req, res, next) => {
    try {
        const categories = await Categories.fetchAll();
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
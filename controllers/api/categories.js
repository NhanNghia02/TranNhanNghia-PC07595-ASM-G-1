const Category = require('../../model/category');

// Hiển thị
exports.listCategories = async (req, res, next) => {
    var categories = await Category.getAll();
    console.log(categories);

    res.status(200).json({
        data: categories
    })
};


// Thêm
exports.createCategories = async (req, res, next) => {

    let name = req.body.name;
    let image = req.file;
    let status = req.body.status;

    let category = {
        name: name,
        image: image.path,
        status: status,
    }

    let result = await Category.create(category);
    console.log(result);

    res.status(201).json({
        result: result,
        category: category
    })
};

// Sửa
exports.editCategories = async (req, res, next) => {

    let categories_id = req.params.categories_id;

    let result = await Category.getOne(categories_id);
    console.log(result);

    res.status(201).json({
        data: result,
    })
};

exports.updateCategories = async (req, res, next) => {
    let categories_id = req.params.categories_id;

    let name = req.body.name;
    let image = req.file
    let status = req.body.status;

    let category = {
        name: name,
        image: image.path,
        status: status,
    }
    let result = await Category.editCategories(category, categories_id);
    console.log(result);

    res.status(201).json({
        result: result,
        category: category
    })
};

// Xóa
exports.deleteCategories = async (req, res, next) => {
    let categories_id = req.params.categories_id;

    let result = await Category.deleteCategories(categories_id);
    console.log(result);

    res.status(201).json({
        result: result
    })
};
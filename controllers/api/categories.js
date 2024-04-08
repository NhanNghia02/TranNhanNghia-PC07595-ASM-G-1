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

    let cateName = req.body.cateName;
    let cateImage = req.body.cateImage;
    let cateStatus = req.body.cateStatus;

    let category = {
        cateName: cateName,
        cateImage: cateImage,
        cateStatus: cateStatus,
    }
    let result = await Category.addCategories(category);
    console.log(result);

    res.status(201).json({
        result: result,
        category: category
    })
};

// Lấy id sửa
exports.detailCategories = async (req, res, next) => {
    // const file = req.file

    let category_id = req.params.id;

    let result = await Category.getOne(category_id);
    console.log(result);
    res.status(201).json({
        data: result,
    })
};

// Sửa
exports.updateCategories = async (req, res, next) => {
    let cate_id = req.params.id;

    let cateName = req.body.cateName;
    let cateImage = req.body.cateImage
    let cateStatus = req.body.cateStatus;

    let category = {
        cateName: cateName,
        cateImage: cateImage,
        cateStatus: cateStatus,
    }

    let result = await Category.updateCategories(category, cate_id);
    console.log(result);
    console.log(category);
    
    res.status(201).json({
        result: result,
        category: category
    })
};

// Xóa
exports.deleteCategories = async (req, res, next) => {
    let id = req.params.id;
    
    let result = await Category.deleteCategories(id);
    console.log(result);

    res.status(201).json({
        result: result
    })
};
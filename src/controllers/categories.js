const Categories = require('../model/categories');

// Lấy tất cả danh mục
exports.listCategories = async function(req, res) {
    try {
        const categories = await Categories.find({});
        res.render('admin/catrgory/list', { categories: categories });
        res.send(categories);
    } catch (err) {
        console.error('Đã xảy ra lỗi khi tải danh mục sản phẩm:', err);
        res.status(500).send('Đã xảy ra lỗi khi tải danh mục sản phẩm.');
    }
};

// Xem chi tiết sản phẩm
exports.getCategoriesId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const categorieOne = await Categories.findByPk(id);
        if (!categorieOne) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(categorieOne);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Thêm danh mục mới
exports.postAddCategories = async (req, res, next) => {
    const { cateName, cateImage, cateStatus  } = req.body;
    try {
        const newCategory = await Categories.addCategories({ name: cateName, image: cateImage, status: cateStatus });
        console.log(newCategory);
        res.redirect('admin/category/create');
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).send('Error adding category');
    }
};

// Sửa danh mục sản phẩm
exports.updateCategories = async (req, res) => {
    const { id } = req.params;
    const { cateName, cateImage, cateStatus } = req.body;
    try {
        const categorieOne = await Categories.addCategories(id);
        if (!categorieOne) {
            return res.status(404).json({ message: 'Categories not found' });
        }
        await categorieOne.update({ cateName, cateImage, cateStatus });
        res.json(categorieOne);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Xóa danh mục sản phẩm
exports.deleteCategories = async (req, res) => {
    const { id } = req.params;
    try {
        const categorieOne = await Categories.findByPk(id);
        if (!categorieOne) {
            return res.status(404).json({ message: 'Categories not found' });
        }
        await categorieOne.destroy();
        res.json({ message: 'Categories deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
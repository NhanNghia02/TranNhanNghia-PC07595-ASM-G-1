const express = require('express');
const categoriesController = require('../controllers/admin/categories');
const homeControllers = require('../controllers/admin/home');
const router = express.Router();

// Hiển thị trang home của admin
router.get('/', homeControllers.homeAdmin);

// Hiển thị dữ liệu danh mục sản phẩm
router.get('/category/list', categoriesController.listCategorie);

// Hiển thị 1 danh mục sản phẩm
router.get('/category/list/:id', categoriesController.getCategoriesId);

// Hiển thị trang thêm sản phẩm
router.get('/category/create', categoriesController.createAdmin);

// Thêm dữ liệu
router.post('/category/create', categoriesController.postAdmin);

// // Sửa danh mục sản phẩm
// router.get('/category/detail/:id', categories.updateCategories);

// // Xóa danh mục sản phẩm
// router.get('/category/list/:id', categories.deleteCategories);

module.exports = router;
const express = require('express');
const categories = require('../src/controllers/categories');
const homeAd = require('../src/controllers/admin/home');
const listAd = require('../src/controllers/admin/list');
const addAd = require('../src/controllers/admin/create');
const router = express.Router();

// Hiển thị trang home của admin
router.get('/', homeAd.homeAdmin);

// Hiển thị trang layout danh mục sản phầm
router.get('/category/list', listAd.getListCategories);

// Hiển thị dữ liệu danh mục sản phẩm
router.get('/category/list', categories.listCategories);

// // Hiển thị 1 danh mục sản phẩm
// router.get('/category/list/:id', categories.getCategoriesId);

// Hiển thị trang thêm sản phẩm
router.get('/category/create', addAd.getAddCategories);

// // Thêm dữ liệu
// router.post('/category/create', categories.postAddCategories);

// // Sửa danh mục sản phẩm
// router.get('/category/detail/:id', categories.updateCategories);

// // Xóa danh mục sản phẩm
// router.get('/category/list/:id', categories.deleteCategories);

module.exports = router;
const express = require('express')

const cateAPIController = require('../controllers/api/categories');
const router = express.Router();

// Lấy danh mục sản phẩm
router.get('/categories/', cateAPIController.listCategories);

// Post dữ liệu danh mục
router.post('/categories/', cateAPIController.createCategories);

// Lấy id danh mục sản phẩm
router.get('/categories/:id', cateAPIController.detailCategories);

// Sửa dữ liệu danh mục
router.put('/categories/:id', cateAPIController.updateCategories);

// Xóa dữ liệu danh mục
router.delete('/categories/:id', cateAPIController.deleteCategories);

module.exports = router;
const express = require('express')

const cateAPIController = require('../controllers/api/categories');
const router = express.Router();

// Lấy danh mục sản phẩm
router.get('/categories/', cateAPIController.listCategories);


module.exports = router;
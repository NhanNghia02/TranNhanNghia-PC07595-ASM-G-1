const express = require('express');
const categoriesController = require('../controllers/admin/categories');
const homeControllers = require('../controllers/admin/home');
const router = express.Router();
const multer = require('multer')

// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({
    storage: storage
});
// Hiển thị trang home của admin
router.get('/', homeControllers.homeAdmin);

// Hiển thị dữ liệu danh mục sản phẩm
router.get('/category/list', categoriesController.listCategorie);

// // Hiển thị 1 danh mục sản phẩm
// router.get('/category/list/:id', categoriesController.getCategoriesId);

// Hiển thị trang thêm sản phẩm
router.get('/category/create', categoriesController.createAdmin);

// Thêm dữ liệu
router.post('/category/create', upload.single('cateImage'),categoriesController.postAdmin);

// Sửa danh mục sản phẩm
router.get('/category/detail/:id', categoriesController.editCategories);

// Update danh mục sản phẩm
router.post('/category/detail/:id', upload.single('cateImage'),categoriesController.updateCategories);

// Xóa danh mục sản phẩm
router.get('/category/delete/:id', categoriesController.deleteCategories);

module.exports = router;
const express = require('express');
const categoriesController = require('../controllers/admin/categories');
const homeClients = require('../controllers/client/home');
const newClients = require('../controllers/client/new');
const aboutClients = require('../controllers/client/about');
const contactClients = require('../controllers/client/contact');
const router = express.Router();

// Hiển thị dữ liệu trang home của client
router.get('/', homeClients.homeClient);

// Hiển thị dữ liệu trang tin tức
router.get('/category/new', newClients.NewClient);

// Hiển thị dữ liệu trang giới thiệu
router.get('/category/about', aboutClients.AboutClient);

// Hiển thị dữ liệu trang liên hệ
router.get('/category/contact', contactClients.ContactClient);

// Hiển thị danh mục trang shop
router.get('/category/list', categoriesController.listCategorieClient);

module.exports = router;
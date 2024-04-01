const express = require('express');
const homeClients = require('../controllers/client/home');
const listClients = require('../controllers/client/shop');
const newClients = require('../controllers/client/new');
const aboutClients = require('../controllers/client/about');
const contactClients = require('../controllers/client/contact');
const router = express.Router();

// Hiển thị dữ liệu trang home của client
router.get('/', homeClients.homeClient);

// Hiển thị dữ liệu trang shop
router.get('/category/list', listClients.ListClient);

// Hiển thị dữ liệu trang tin tức
router.get('/category/new', newClients.NewClient);

// Hiển thị dữ liệu trang giới thiệu
router.get('/category/about', aboutClients.AboutClient);

// Hiển thị dữ liệu trang liên hệ
router.get('/category/contact', contactClients.ContactClient);

module.exports = router;
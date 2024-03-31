const express = require('express');
var app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', "./src/views");
app.use(express.static('assets'));


// ********* Xữ lý router Admin *********
// Trang chủ
const adminRouters = require('./router/admin');
app.use('/admin', adminRouters);

// Trang danh mục sản phẩm
const shopAdRoutes =  require('./router/admin');
app.use('/category/list', shopAdRoutes);

// Trang thêm dữ liệu sản phẩm
const addRoutes = require('./router/admin');
app.use('/category/create', addRoutes);

// Thêm dữ liệu sản phẩm
const newAddRouters = require('./router/admin');
app.use('/category/create', newAddRouters);




// ********* Xữ lý router Client ********
// Trang chủ
const clientRoutes = require('./router/clients');
app.use('/client', clientRoutes);

// Trang cửa hàng
const shopRoutes = require('./router/clients');
app.use('/client/list', shopRoutes);

// Trang tin tức
const newRoutes = require('./router/clients');
app.use('/client/new', newRoutes);

// Trang giới thiệu
const aboutRoutes = require('./router/clients');
app.use('/client/about', aboutRoutes);

// Trang liên hệ
const contactRoutes = require('./router/clients');
app.use('/client/contact', contactRoutes);

app.listen(port, () => {
    console.log(`Ứng dụng đang chạy với: ${port}`);
});


// // ***** Thứ tự đặt API
// // get list
// // get create
// // post create
// // get edit
// // post edit
// // get delete
// // get detail

// Cài đặt thư mục lưu hình ảnh và đổi tên hình ảnh
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads')
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname)
//     }
// });
// const uploadMiddleware = multer({ storage: storage }).single('cateImage');
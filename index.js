const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer')

const app = express()
const port = 3000

app.set('view engine', 'ejs');

// Chỉ định thư mục gốc 
app.use(express.static('assets'))
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Kết nối database 
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mysql',
    database: 'node'
});

// Cài đặt thư mục lưu hình ảnh và đổi tên hình ảnh
// const upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const uploadMiddleware = multer({ storage: storage }).single('cateImage');



// ***** Thứ tự đặt API
// get list
// get create
// post create
// get edit
// post edit
// get delete
// get detail

// **** Client ****
// Tự động chuyển sang client 
app.get('/', (req, res) => {
    res.redirect('client');
})

// Hiển thị giao diện trang chủ của client 
app.get('/client', (req, res) => {
    res.render('client/index');
})

// Hiển thị danh sách loại sản phẩm của client
app.get('/client/category/list', (req, res) => {

    // Giả sử categories là dữ liệu đươcj lấy ra từ cơ sở dữ liệu 
    var categories = [{
        id: 1,
        name: 'Category 1',
        status: 1
    },
    {
        id: 2,
        name: 'Category 2',
        status: 1
    },
    {
        id: 3,
        name: 'Category 3',
        status: 1
    }
    ]
    // Hiển thị kèm theo dữ liệu ra giao diện 
    res.render('client/category/list', {
        data: categories
    })
})

// Hiển thị tin tức
app.get('/client/category/new', (req, res) => {
    res.render('client/category/new')
})

// Hiển thị giới thiệu
app.get('/client/category/about', (req, res) => {
    res.render('client/category/about')
})

// Hiển thị liên hệ
app.get('/client/category/contact', (req, res) => {
    res.render('client/category/contact')
})



// **** Admin ****
// Hiển thị giao diện trang chủ của admin 
app.get('/admin', (req, res) => {
    res.render('admin/index');
})

// Hiển thị danh sách loại sản phẩm của admin
app.get('/admin/category/list', (req, res) => {
    // Truy vấn SQL để lấy danh sách loại sản phẩm từ cơ sở dữ liệu
    connection.query('SELECT * FROM categories', (error, results, fields) => {
        if (error) {
            console.log("Lỗi khi truy vấn dữ liệu từ cơ sở dữ liệu:", error);
            res.status(500).send("Đã xảy ra lỗi khi lấy dữ liệu từ cơ sở dữ liệu");
            return;
        }
        res.render('admin/category/list', {
            categories: results
        });
    });
});

// Hiển thị form thêm
app.get('/admin/category/create', (req, res) => {
    res.render('admin/category/create');
})

// Thêm dữ liệu vào form
app.post('/admin/category/create', uploadMiddleware, (req, res) => {

    // Lấy dữ liệu từ form
    const cateName = req.body.cateName;
    const cateStatus = req.body.cateStatus;
    const cateImage = req.file.filename;

    // Thực hiện câu truy vấn INSERT để thêm dữ liệu vào cơ sở dữ liệu
    const sql = "INSERT INTO categories (cateName, cateStatus, cateImage) VALUES (?, ?, ?)";
    connection.query(sql, [cateName, cateStatus, cateImage], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            // Xử lý lỗi nếu có
            res.status(500).send('Internal Server Error');
            res.send(err);
            return;
        }
        console.log('Inserted a new category with id ' + result.insertId);
        // Chuyển hướng người dùng sau khi thêm dữ liệu thành công
        res.redirect('/admin/category/list');
    });
});

// Hiển thị form và sửa dữ liệu
app.get('/admin/category/detail/:id', (req, res) => {
    const categoryId = req.params.id;
    const sql = "SELECT * FROM categories WHERE id = ?";
    connection.query(sql, [categoryId], (err, result) => {
        if (err) {
            console.error('Error retrieving data: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (result.length === 0) {
            // Không tìm thấy mục có ID tương ứng trong cơ sở dữ liệu
            res.status(404).send('Category not found');
            return;
        }
        // Hiển thị form chỉnh sửa với thông tin của mục cần chỉnh sửa
        res.render('admin/category/detail', { category: result[0] });
    });
});

// Xữ lý và gửi dữ liệu
app.post('/admin/category/detail/:id', (req, res) => {
    const categoryId = req.params.id;
    const { cateName, cateStatus, cateImage } = req.body;

    // Thực hiện câu truy vấn UPDATE để cập nhật thông tin của mục trong cơ sở dữ liệu
    const sql = "UPDATE categories SET cateName = ?, cateStatus = ? WHERE id = ?";
    connection.query(sql, [cateName, cateStatus, cateImage, categoryId], (err, result) => {
        if (err) {
            console.error('Error updating data: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Updated category with id ' + categoryId);
        // Chuyển hướng người dùng sau khi cập nhật dữ liệu thành công
        res.redirect('/admin/category/list');
    });
});

// Hiển thị dữ liệu theo id
app.get('/admin/category/:id', (req, res) => {
    let id = req.params.id;

    // Giả sử đây là dữ liệu sau khi select theo id 
    let category = {
        id: id,
        name: 'Category 1',
        status: 1
    };

    res.render('admin/category/detail', {
        data: category
    });
})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
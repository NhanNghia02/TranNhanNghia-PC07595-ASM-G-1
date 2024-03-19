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

const upload = multer({
    storage: storage
})



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
    res.render('admin/category/list', {
        data: categories
    })
})

// Hiển thị form thêm
app.get('/admin/category/create', (req, res) => {
    res.render('admin/category/create');
})

// Thêm dữ liệu vào form
app.post('/admin/category/create', (req, res) => {
    // Lấy dữ liệu từ form
    const cateName = req.body.cateName;
    const status = req.body.status;

    // Thực hiện câu truy vấn INSERT để thêm dữ liệu vào cơ sở dữ liệu
    const sql = "INSERT INTO categories (name, status) VALUES (?, ?)";
    connection.query(sql, [cateName, status], (err, result) => {
        if (err) {
            console.error('Error inserting data: ' + err.stack);
            // Xử lý lỗi nếu có
            res.status(500).send('Internal Server Error');
            return;
        }
        console.log('Inserted a new category with id ' + result.insertId);
        // Chuyển hướng người dùng sau khi thêm dữ liệu thành công
        res.redirect('/admin/category/create');
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
// connection.end();
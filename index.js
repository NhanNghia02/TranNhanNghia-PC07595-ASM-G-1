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
    database: 'nodejs'
});


// Cài đặt thư mục lưu hình ảnh và đổi tên hình ảnh
// Const upload = multer({ dest: 'uploads/' })
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

app.get('/client/category/about', (req, res) => {
    res.render('client/category/about')
})

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
    res.render('admin/category/list', {
        data: categories
    })

})

// Hiển thị form thêm
app.get('/admin/category/create', (req, res) => {
    res.render('admin/category/create');
})


// ******* Để API hiển thị chi tiết này ở cuối mỗi API của chức năng đó, nếu không biết thì cứ copy theo thứ tự file này 
// Hiển thị chi tiết loại sản phẩm, :id là BIẾN => dùng req.params.id để gọi, pleaseeeeeee
// Ví dụ khi truy cập: http://localhost:4000/admin/category/1 thì nó sẽ gọi đến api này nha trờiiii
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





// chạy server, đoạn này để cuối file, ko đem lên trên giùmmmmm
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// connection.end();
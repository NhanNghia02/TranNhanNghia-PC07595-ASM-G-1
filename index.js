const express = require('express')
const bodyParser = require('body-parser')
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

const app = express();
const port = 3000;
app.set('view engine', 'ejs');

// Chỉ định thư mục gốc
app.set('views', "./views");
app.use(express.static('assets'));
app.use(express.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

// Index.js 
const clientRoutes = require('./router/clients');
app.use('/client',clientRoutes);

const adminRoutes = require('./router/admin');
app.use('/admin', adminRoutes);

const apiRoutes = require('./router/api');
app.use('/api', apiRoutes);

app.post('/upload', upload.single('file'), (req, res) => {
    res.send('Tệp tin đã được tải lên thành công !');
});


app.listen(port, () => {
    console.log(`Ứng dụng đang chạy với: ${port}`);
});


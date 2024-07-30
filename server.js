const express = require('express')
const bodyParser = require('body-parser')

const app = express();
exports.app = app
const port = 3000;
app.set('view engine', 'ejs');

// Chỉ định thư mục gốc
app.set('views', "./views");
app.use(express.static('assets'));
app.use(express.static('uploads'));
app.use(express.json());
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


app.listen(port, () => {
    console.log(`Ứng dụng đang chạy với: http://localhost:${port}/client`);
});

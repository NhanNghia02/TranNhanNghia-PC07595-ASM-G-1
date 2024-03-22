var db = require('./database');
var products = [];
module.exports = class Product {
    constructor() {}
    static saveProduct() {
        //Thêm sản phẩm
    }
    // static fetchAll() {
    //     //Trả về tất cả sản phẩm
    // }
    static async fetchAll() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM products';
            db.query(sql, function (err, data) {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
}
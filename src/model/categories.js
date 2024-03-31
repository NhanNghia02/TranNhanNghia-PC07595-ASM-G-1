const db = require('./database');

module.exports = class Categories {
    constructor() { }

    // Trả về tất cả sản phẩm
    static async fetchAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories', function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve( {data} );
                }
            });
        });
    }

    // Thêm một sản phẩm
    static addCategories(categories) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO categories SET name = ?, image = ?, status = ?', categories, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
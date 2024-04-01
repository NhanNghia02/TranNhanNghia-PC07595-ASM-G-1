const db = require('./database');

module.exports = class Category {
    constructor() { }

    // Trả về tất cả danh mục sản phẩm
    static async getAll() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM categories', function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve( data );
                }
            });
        });
    }

    // Lấy id danh mục sản phẩm
    static async getOne(categories_id) {
        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM categories WHERE categories_id=${ categories_id }`;
            db.query(sql, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Thêm danh mục một sản phẩm
    static addCategories(categories) {
        return new Promise((resolve, reject) => {
            db.query('INSERT INTO categories SET ?', categories, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Sửa danh mục sản phẩm
    static async editCategories(categories, categories_id) {
        return new Promise((resolve, reject) => {
            db.query('UPDATE categories SET ? WHERE category_id=?', [categories, categories_id], function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }

    // Xoá danh mục sản phẩm
    static async deleteCategories(categories_id) {
        return new Promise((resolve, reject) => {
            let sql = `DELETE FROM categories WHERE category_id= ${categories_id}`;
            db.query(sql, function (err, data) {
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}
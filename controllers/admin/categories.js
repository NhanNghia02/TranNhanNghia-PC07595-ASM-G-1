const Category = require("../../model/category");

// Lấy tất cả danh mục
exports.listCategorie = async function (req, res) {
    fetch('http:/localhost:3000/api/categories/')
        .then(response => response.json())
        .then(data => {
            // res.send(data);
            res.render('admin/category/list', {
                categories: data.data
            })
        })
        .catch(error => console.log('Error: ', error));
};

// Lấy tất cả danh mục
exports.listCategorieClient = async function (req, res) {
    fetch('http:/localhost:3000/api/categories/')
        .then(response => response.json())
        .then(data => {
            // res.send(data);
            res.render('client/category/list', {
                categories: data.data
            })
        })
        .catch(error => console.log('Error: ', error));
};

// Xem chi tiết sản phẩm
exports.editCategories = (req, res, next) => {
    // gọi api 
    let category_id = req.params.id;
    fetch(`http://localhost:3000/api/categories/${category_id}`)
        .then(response => response.json())
        .then(data => {
            // res.send(data)
            // hiển thị ra giao diện
            res.render('admin/category/detail', {
                category: data.data[0]
            })
        })
        .catch(error => console.error('Error:', error));

};

// Thêm danh mục mới
// Hiển thị
exports.createAdmin = (req, res, next) => {
    res.render('admin/category/create');
};

// Thêm dữ liệu 
exports.postAdmin = async (req, res, next) => {
    // Gọi api 
    let cateName = req.body.cateName;
    let cateImage = req.file;
    let cateStatus = req.body.cateStatus;
    console.log(req.file);

    let category = {
        cateName: cateName,
        cateImage: cateImage.filename,
        cateStatus: cateStatus,
    };
    console.log(category)

    // Tiếp tục gửi yêu cầu POST với dữ liệu hình ảnh đã xử lý
    fetch('http://localhost:3000/api/categories/', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(category),
    })
        .then(response => response.json())
        .then(data => {
            if (data.result.affectedRows) {
                res.redirect('/admin/category/list')
            } else {
                res.send('Lỗi không thể thêm')
            }
        })
        .catch(error => console.error('Error:', error));
};

// Sửa danh mục sản phẩm
// Hiển thị form sửa
exports.editAdmin = (req, res, next) => {
    // Gọi api 
    let cate_id = req.params.id;
    fetch(`http://localhost:3000/api/categories/${cate_id}`)
        .then(response => response.json())
        .then(data => {
            res.send(data)
            // hiển thị ra giao diện
            res.render('/admin/category/detail', {
                category: data.data[0]
            })
        })
        .catch(error => console.error('Error:', error));
};

// Sửa dữ liệu
exports.updateCategories = async (req, res, next) => {
    // Gọi api 
    let cate_id = req.params.id;

    let cateName = req.body.cateName;
    let cateImage = req.file;
    let cateStatus = req.body.cateStatus;

    let category = {
        cateName: cateName,
        cateImage: cateImage.filename,
        cateStatus: cateStatus,
    }

    fetch(`http://localhost:3000/api/categories/${cate_id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(category),
    })
        .then(response => response.json())
        .then(data => {
            // res.send(data)
            if (data.result.affectedRows) {
                res.redirect('/admin/category/list')
            } else {
                res.send()
            }
        })
        .catch(error => console.error('Error:', error));
};

// Xóa danh mục sản phẩm
exports.deleteCategories = (req, res, next) => {
    // Gọi api 
    let cate_id = req.params.id;
    fetch(`http://localhost:3000/api/categories/${cate_id}`, {
        method: "DELETE",
    })
        .then(response => response.json())
        .then(data => {
            if (data.result.affectedRows) {
                res.redirect('/admin/category/list')
            } else {
                res.send('Lỗi không thể xoá')
            }
        })
        .catch(error => console.error('Error:', error));
};
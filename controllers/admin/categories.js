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

// Xem chi tiết sản phẩm
exports.getCategoriesId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const categorieOne = await Categories.findByPk(id);
        if (!categorieOne) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.json(categorieOne);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Thêm danh mục mới
// Hiển thị
exports.createAdmin = (req, res, next) => {
    res.render('admin/category/create');
};

// Thêm dữ liệu 
const fs = require('fs');

exports.postAdmin = async (req, res, next) => {
    // Gọi api 
    let cateName = req.body.cateName;
    let cateStatus = req.body.cateStatus;

    if (!req.file) {
        return res.status(400).send('Không có hình ảnh được tải lên');
    }

    fs.readFile(req.file.path, (err, data) => {
        if (err) {
            console.error('Lỗi khi đọc tệp hình ảnh:', err);
            return res.status(500).send('Lỗi khi đọc tệp hình ảnh');
        }

        let category = {
            cateName: cateName,
            cateImage: data,
            cateStatus: cateStatus,
        };

        // Tiếp tục gửi yêu cầu POST với dữ liệu hình ảnh đã xử lý
        fetch('http:/localhost:3000/api/categories/', {
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
                    res.redirect('admin/category/create')
                } else {
                    res.send('Lỗi không thể thêm')
                }
            })
            .catch(error => console.error('Error:', error));
    });
};

// Sửa danh mục sản phẩm
exports.updateCategories = async (req, res) => {
    const { id } = req.params;
    const { cateName, cateImage, cateStatus } = req.body;
    try {
        const categorieOne = await Categories.addCategories(id);
        if (!categorieOne) {
            return res.status(404).json({ message: 'Categories not found' });
        }
        await categorieOne.update({ cateName, cateImage, cateStatus });
        res.json(categorieOne);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// Xóa danh mục sản phẩm
exports.deleteCategories = async (req, res) => {
    const { id } = req.params;
    try {
        const categorieOne = await Categories.findByPk(id);
        if (!categorieOne) {
            return res.status(404).json({ message: 'Categories not found' });
        }
        await categorieOne.destroy();
        res.json({ message: 'Categories deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
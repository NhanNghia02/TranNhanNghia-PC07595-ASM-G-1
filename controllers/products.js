const Product = require('../model/product');
// const products = [];

exports.getAddProduct = (req, res, next) => {
    res.render('/product/create', {
        //pageTitle: 'Add Product',
        //path: '/admin/add-product',
        //activeAddProduct: true
    });
};

exports.getProducts = async (req, res, netx) => {
    var products = await Product.fetchAll();
    console.log(products);
    res.send(products);
    //res.render('shop', {
    // ...      
    // })
}


'use-strict';

const model = require('../Models/product'),
    response = require('../Helpers/response'),
    { getCategoryById } = require('../Models/category'),
    { pagination } = require('../Models/page');

exports.getProducts = (req, res) => {
    const page = pagination(req);
    model.getProducts(req, page).then((result) => {
        response.success(res, result);
    }).catch(err => {
        response.error(res, err);
    });
}

exports.getProductById = (req, res) => {
    model.getProductById(req).then(result => {
        if (result.length == 0) response.error(res, "Product id not found");
        else response.success(res, result);
    }).catch(err => {
        response.error(res, err);
    });
}

exports.newProduct = (req, res) => {
    if(req.body.prod_name == null || req.body.prod_name == "") return response.error(res, "Product name can't be empty");
    if(req.body.prod_desc == null || req.body.prod_desc == "") return response.error(res, "Product description can't be empty");
    if(req.body.prod_image == null || req.body.prod_image == "") return response.error(res, "Product image can't be empty");
    if(req.body.category_id == null || req.body.category_id == "") req.body.category_id = 1;
    if(req.body.price == null || req.body.price == "") return response.error(res, "Price can't be empty");
    if(req.body.quantity == null || req.body.quantity == "") return response.error(res, "Quantity can't be empty");

    getCategoryById(req).then(result => {
        if (result.length != 0) {
            if (req.body.quantity >= 0) {
                if (req.body.price >= 0) {
                    model.newProduct(req).then(result => {
                        response.success(res, "Product added sucessfully");
                    }).catch(err => {
                        response.error(res, err);
                    });
                } else {
                    response.error(res, 'Price cannot be below 0');
                }
            } else {
                response.error(res, 'Quantity cannot be below 0');
            }
        } else {
            response.error(res, 'Category Id Not Found');
        }
    });
}

exports.updateProduct = (req, res) => {
    if(req.body.prod_name == null || req.body.prod_name == "") return response.error(res, "Product name can't be empty");
    if(req.body.prod_desc == null || req.body.prod_desc == "") return response.error(res, "Product description can't be empty");
    if(req.body.prod_image == null || req.body.prod_image == "") return response.error(res, "Product image can't be empty");
    if(req.body.category_id == null || req.body.category_id == "") req.body.category_id = 1;
    if(req.body.price == null || req.body.price == "") return response.error(res, "Price can't be empty");
    if(req.body.quantity == null || req.body.quantity == "") return response.error(res, "Quantity can't be empty");
    
    model.getProductById(req).then(result => {
        if (result.length != 0) {
            getCategoryById(req).then(result => {
                if (result.length != 0) {
                    if (req.body.quantity >= 0) {
                        if (req.body.price >= 0) {
                            model.updateProduct(req).then(result => {
                                response.success(res, "Product updated successfully");
                            }).catch(err => {
                                response.error(res, err);
                            });
                        } else {
                            response.error(res, 'Price cannot be below 0');
                        }
                    } else {
                        response.error(res, 'Quantity cannot be below 0');
                    }
                } else {
                    response.error(res, 'Category Id Not Found');
                }
            });
        } else {
            response.error(res, 'Product Id Not Found');
        }
    }).catch(err => {
        response.error(res, err);
    });
}

exports.deleteProduct = (req, res) => {
    model.getProductById(req).then(result => {
        if (result.length != 0) {
            model.deleteProduct(req).then(result => {
                response.success(res, "Product deleted successfully");
            }).catch(err => {
                response.error(res, err);
            });
        } else {
            response.error(res, 'Product Id Not Found');
        }
    });
}
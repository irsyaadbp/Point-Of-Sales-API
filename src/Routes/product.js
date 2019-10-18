'use-strict';

const express = require('express'),
    controller = require('../Controllers/product');

const Router = express.Router();

Router.get('/', controller.getProducts);
Router.get('/:prod_id', controller.getProductById);
Router.post('/', controller.newProduct);
Router.put('/:prod_id', controller.updateProduct)
Router.delete('/:prod_id', controller.deleteProduct);

module.exports = Router;
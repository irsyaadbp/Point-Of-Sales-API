'use-strict';

const express = require('express'),
    controller = require('../Controllers/category');

const Router = express.Router();

Router.get('/', controller.getCategories);
Router.get('/:category_id', controller.getCategoryById);
Router.post('/', controller.newCategory);
Router.put('/:category_id', controller.updateCategory);
Router.delete('/:category_id', controller.deleteCategory);

module.exports = Router;
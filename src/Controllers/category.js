'use-strict';

const model = require('../Models/category'),
    response = require('../Helpers/response'),
    { pagination } = require('../Models/page');

exports.getCategories = (req, res) => {
    const page = pagination(req);
    model.getCategories(req, page).then(result => {
        response.success(res, result);
    }).catch(err => {
        response.error(res, err);
    });
}

exports.getCategoryById = (req, res) => {
    model.getCategoryById(req).then(result => {
        if (result.length != 0) response.success(res, result);
        else response.error(res, "Category id not found");
    }).catch(err => {
        response.error(res, err)
    });
}

exports.newCategory = (req, res) => {
    if(req.body.category_name == null || req.body.category_name == "") return response.error(res, "category name can't be empty");

    model.newCategory(req).then(result =>{
        response.success(res, "Category added successfully");
    }).catch(err => {
        response.error(res, err);
    });
}

exports.updateCategory = (req, res) => {
    if(req.body.category_name == null || req.body.category_name == "") return response.error(res, "category name can't be empty");
    if(req.params.category_id == "1") return response.error(res, "I'm Sorry you cannot edit Uncategorized category");

    model.getCategoryById(req).then(data => {
        if(data.length != 0){
            model.updateCategory(req).then(result =>{
                response.success(res, "Category updated successfully");
            }).catch(err => {
                response.error(res, err);
            });
        }else{
            response.error(res, "Category id not found");
        }
    }).catch(err => {
        response.error(res, err);
    });
}

exports.deleteCategory = (req, res) => {
    if(req.params.category_id == "1") return response.error(res, "I'm Sorry you cannot deleted Uncategorized category");
    model.getCategoryById(req).then(data => {
        if(data.length != 0){
            model.deleteCategory(req).then(result => {
                response.success(res, "Category deleted successfully");
            }).catch(err => {
                response.error(res, err);
            });
        }else{
            response.error(res, "Category id not found");
        }
    }).catch(err => {
        response.error(res, err);
    });   
}
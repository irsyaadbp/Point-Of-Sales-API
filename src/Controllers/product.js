"use-strict";

const model = require("../Models/product"),
  response = require("../Helpers/response"),
  { getCategoryById } = require("../Models/category"),
  { pagination } = require("../Models/page");

exports.getProducts = (req, res) => {
  const page = pagination(req);
  model
    .getProducts(req, page)
    .then(result => {
      response.success(res, result);
    })
    .catch(err => {
      response.error(res, err);
    });
};

exports.getProductById = (req, res) => {
  model
    .getProductById(req)
    .then(result => {
      if (result.length == 0) response.error(res, "Product id not found");
      else response.success(res, result);
    })
    .catch(err => {
      response.error(res, err);
    });
};

exports.newProduct = (req, res) => {
  if (req.body.prod_name == null || req.body.prod_name == "")
    return response.error(res, "Product name can't be empty");
  if (req.body.prod_desc == null || req.body.prod_desc == "")
    return response.error(res, "Product description can't be empty");
  if (req.body.prod_image == null || req.body.prod_image == "")
    return response.error(res, "Product image can't be empty");
  if (req.body.category_id == null || req.body.category_id == "")
    req.body.category_id = 1;
  if (req.body.price == null || req.body.price == "")
    return response.error(res, "Price can't be empty");
  if (req.body.quantity == null || req.body.quantity == "")
    return response.error(res, "Quantity can't be empty");
  if (req.body.price <= 0)
    return response.error(res, "Price cannot be below 0");
  if (req.body.quantity <= 0)
    return response.error(res, "Quantity cannot be below 0");

  model
    .getProductByName(req)
    .then(resultName => {
      if (resultName.length != 0)
        return response.error(res, "Product already exists");
      getCategoryById(req)
        .then(resultCategory => {
          if (resultCategory.length == 0)
            return response.error(res, "Category Id Not Found");
          model
            .newProduct(req)
            .then(resultInsert => {
              model
                .getProductById(req, resultInsert.insertId)
                .then(result => response.success(res, result))
                .catch(err => response.error(res, err));
            })
            .catch(err => response.error(res, err));
        })
        .catch(err => response.error(res, err));
    })
    .catch(err => response.error(res, err));
};

exports.updateProduct = (req, res) => {
  if (req.body.prod_name == null || req.body.prod_name == "")
    return response.error(res, "Product name can't be empty");
  if (req.body.prod_desc == null || req.body.prod_desc == "")
    return response.error(res, "Product description can't be empty");
  if (req.body.prod_image == null || req.body.prod_image == "")
    return response.error(res, "Product image can't be empty");
  if (req.body.category_id == null || req.body.category_id == "")
    req.body.category_id = 1;
  if (req.body.price == null || req.body.price == "")
    return response.error(res, "Price can't be empty");
  if (req.body.quantity == null || req.body.quantity == "")
    return response.error(res, "Quantity can't be empty");
  if (req.body.price <= 0)
    return response.error(res, "Price cannot be below 0");
  if (req.body.quantity <= 0)
    return response.error(res, "Quantity cannot be below 0");

  model
    .getProductById(req)
    .then(resultId => {
      if (resultId.length === 0)
        return response.error(res, "Product not found");
      model
        .getProductByName(req)
        .then(resultName => {
          if (
            resultName.length !== 0 &&
            resultName[0].id !==  Number(req.params.prod_id)
          )
            return response.error(res, "Product name already exist");
          getCategoryById(req)
            .then(resultCategory => {
              if (resultCategory.length === 0)
                return response.error(res, "Category Id Not Found");
              model
                .updateProduct(req)
                .then(result => {
                  model
                    .getProductById(req)
                    .then(result => response.success(res, result))
                    .catch(err => response.error(res, err));
                })
                .catch(err => response.error(res, err));
            })
            .catch(err => response.error(res, err));
        })
        .catch(err => response.error(res, err));
    })
    .catch(err => response.error(res, err));
};

exports.deleteProduct = (req, res) => {
  model.getProductById(req).then(result => {
    if (result.length != 0) {
      model
        .deleteProduct(req)
        .then(result => {
          response.success(res, {message: "Product deleted successfully", id: req.params.prod_id});
        })
        .catch(err => {
          response.error(res, err);
        });
    } else {
      response.error(res, {message: "Product Id Not Found", id: req.params.prod_id});
    }
  });
};

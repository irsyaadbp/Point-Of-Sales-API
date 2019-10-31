"use-strict";

const conn = require("../Configs/conn");
const { getMaxPage } = require("./page");

const sortBy = (req, sql) => {
  const sortBy = req.query.sortby;
  const orderBy = req.query.orderby;

  if (sortBy == "name") {
    sql += `ORDER BY product.name `;
  } else if (sortBy == "category") {
    sql += `ORDER BY category.name `;
  } else if (sortBy == "updated") {
    sql += `ORDER BY product.updated_at `;
  } else {
    sql += `ORDER BY product.id `;
  }

  if (sortBy != null) {
    if (orderBy == "asc" || orderBy == null) {
      sql += "ASC";
    } else if ("desc") {
      sql += "DESC";
    }
  }

  return sql;
};

const searchProduct = (req, sql) => {
  const keyword = req.query.search;

  if (keyword != null) {
    sql += ` AND product.name LIKE ? `;
  }

  return {
    sql,
    keyword
  };
};

exports.getProducts = (req, page) => {
  let sql = `SELECT product.id, product.name as product_name, product.description, product.image,
            category.name as category, product.price, product.quantity, product.created_at, product.updated_at FROM tb_products as product, 
            tb_categories as category WHERE product.category = category.id `;

  const query = searchProduct(req, sql);
  sql = sortBy(req, query.sql);

  return new Promise((resolve, reject) => {
    getMaxPage(page, query.keyword, "tb_products")
      .then(maxPage => {
        const infoPage = {
          currentPage: page.page,
          totalAllProduct: maxPage.totalProduct,
          maxPage: maxPage.maxPage
        };

        conn.query(
          `${sql} LIMIT ? OFFSET ?`,
          query.keyword == null
            ? [page.limit, page.offset]
            : ["%" + query.keyword + "%", page.limit, page.offset],
          (err, data) => {
            if (!err)
              resolve({
                infoPage,
                data
              });
            else reject(err);
          }
        );
      })
      .catch(err => reject(err));
  });
};

exports.getProductById = (req, orderProdId) => {
  return new Promise((resolve, reject) => {
    const prodId = req.params.prod_id || orderProdId || req.body.prod_id;
    const sql = `SELECT product.id, product.name as product_name, product.description, product.image,
        category.name as category, product.price, product.quantity, product.created_at, product.updated_at FROM tb_products as product, 
        tb_categories as category WHERE product.category = category.id AND product.id IN (?)`;

    conn.query(sql, [prodId], (err, result) => {
      if (!err) resolve(result);
      else reject(err);
    });
  });
};

exports.getProductByName = req => {
  return new Promise((resolve, reject) => {
    const prodName = req.body.prod_name || req.params.prod_name;

    conn.query(
      `SELECT product.id, product.name as product_name, product.description, product.image,
        category.name as category, product.price, product.quantity, product.created_at, product.updated_at FROM tb_products as product, 
        tb_categories as category WHERE product.category = category.id AND product.name = ?`,
      [prodName],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

exports.getProductByCategoryId = req => {
    return new Promise((resolve, reject) => {
        conn.query(`SELECT product.id, product.name as product_name, product.description, product.image,
        category.name as category, product.price, product.quantity, product.created_at, product.updated_at FROM tb_products as product, 
        tb_categories as category WHERE product.category = category.id AND category.id = ?`), [req.body.category_id],
        (err, result) => {
            if(!err) resolve(result);
            else reject(err);
        }
    })
}

exports.newProduct = req => {
  const body = req.body;
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO tb_products SET name = ?, description = ?, image = ?, category = ?, price = ?, quantity = ?`,
      [
        body.prod_name,
        body.prod_desc,
        body.prod_image,
        body.category_id,
        body.price,
        body.quantity
      ],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

exports.updateProduct = req => {
  const body = req.body;
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE tb_products SET name = ?, description = ?, image = ?, category = ?, price = ?, quantity = ? WHERE id = ?`,
      [
        body.prod_name,
        body.prod_desc,
        body.prod_image,
        body.category_id,
        body.price,
        body.quantity,
        req.params.prod_id
      ],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

exports.deleteProduct = req => {
  return new Promise((resolve, reject) => {
    const prodId = req.params.prod_id;

    conn.query(
      `DELETE FROM tb_products WHERE id = ?`,
      [prodId],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

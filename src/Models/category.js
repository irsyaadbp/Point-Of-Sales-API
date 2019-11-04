"use-strict";

const conn = require("../Configs/conn");
const { getMaxPage } = require("./page");

exports.getCategories = (req, page) => {
  const sql = "SELECT * FROM tb_categories";
  return new Promise((resolve, reject) => {
    getMaxPage(page, null, "tb_categories")
      .then(maxPage => {
        const infoPage = {
          currentPage: page.page,
          totalAllCategories: maxPage.totalProduct,
          maxPage: maxPage.maxPage
        };

        conn.query(
          `${sql} LIMIT ? OFFSET ?`,
          [page.limit, page.offset],
          (err, data) => {
            if (!err) resolve({ infoPage, data });
            else reject(err);
          }
        );
      })
      .catch(err => {
        reject(err);
      });
  });
};

exports.getCategoryById = (req, id) => {
  return new Promise((resolve, reject) => {
    const categoryId = req.params.category_id || req.body.category_id || id;

    conn.query(
      "SELECT * FROM tb_categories WHERE id = ?",
      [categoryId],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

exports.getCategoryByName = req => {
  return new Promise((resolve, reject) => {
    const categoryName = req.body.category_name || req.params.category_name;

    conn.query(
      "SELECT * FROM tb_categories WHERE name = ?",
      [categoryName],
      (err, result) => {
          if(!err) resolve(result);
          else reject(err);
      }
    );
  });
};

exports.newCategory = req => {
  return new Promise((resolve, reject) => {
    conn.query(
      `INSERT INTO tb_categories SET name = ?`,
      [req.body.category_name],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

exports.updateCategory = req => {
  return new Promise((resolve, reject) => {
    conn.query(
      `UPDATE tb_categories SET name = ? WHERE id = ?`,
      [req.body.category_name, req.params.category_id],
      (err, result) => {
        if (!err) resolve(result);
        else reject(result);
      }
    );
  });
};

exports.updateUncategorized = categoryId => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE tb_products SET category = 1 WHERE category = ?`, [categoryId], (err, result) => {
            if(!err) resolve(result);
            else reject(result);
        })
    })
}

exports.deleteCategory = req => {
  return new Promise((resolve, reject) => {
    const categoryId = req.params.category_id;

    conn.query(
      `DELETE FROM tb_categories WHERE id = ?`,
      [categoryId],
      (err, result) => {
        if (!err) resolve(result);
        else reject(err);
      }
    );
  });
};

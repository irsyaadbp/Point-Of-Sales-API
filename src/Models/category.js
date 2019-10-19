'use-strict';

const conn = require('../Configs/conn');
const {getMaxPage} = require('./page');

exports.getCategories = (req, page) => {
    const sql = 'SELECT * FROM tb_categories';
    return new Promise((resolve, reject) => {
        getMaxPage(page, null, sql).then(maxPage => {
            const infoPage = {
                currentPage: page.page,
                totalProduct: maxPage.totalProduct,
                maxPage: maxPage.maxPage
            };

            conn.query(`${sql} LIMIT ? OFFSET ?`, [page.limit, page.offset], (err, result) => {
                if (!err) resolve( {infoPage, result});
                else reject(err);
            });
        }).catch(err => {
            reject(err);
        });
    });
}

exports.getCategoryById = req => {
    return new Promise((resolve, reject) => {
        const categoryId = req.params.category_id || req.body.category_id;

        conn.query('SELECT * FROM tb_categories WHERE id = ?', [categoryId], (err, result) => {
            if (!err) resolve(result);
            else reject(err);
        });
    });
}

exports.newCategory = req => {
    return new Promise((resolve, reject) => {
        conn.query(`INSERT INTO tb_categories SET name = ?`,
            [req.body.category_name],
            (err, result) => {
                if (!err) resolve(result);
                else reject(err);
            }
        );
    });
}

exports.updateCategory = req => {
    return new Promise((resolve, reject) => {
        conn.query(`UPDATE tb_categories SET name = ? WHERE id = ?`,
            [req.body.category_name, req.params.category_id],
            (err, result) => {
                if (!err) resolve(result);
                else reject(result);
            }
        );
    });
}

exports.deleteCategory = req => {
    return new Promise((resolve, reject) => {
        const categoryId = req.params.category_id;

        conn.query(`DELETE FROM tb_categories WHERE id = ?`, [categoryId], (err, result) => {
            if (!err) resolve(result);
            else reject(err);
        });
    });
}
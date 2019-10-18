'use-strict';

const conn = require('../Configs/conn');

exports.pagination = req => {
    const limit = Number(req.query.perpage) || 10;
    const page = Number(req.query.page) || 1;
    const offset = limit * (page - 1);

    return {
        limit,
        offset,
        page
    };
}

exports.getMaxPage = (page, keyword, sql) => {
    return new Promise((resolve, reject) => {
        conn.query(sql, ['%' + keyword + '%'], (err, result) => {
            if (!err) {
                const maxPage = Math.ceil(result.length / page.limit);

                if(maxPage >= page.page){
                    resolve({
                        totalProduct: result.length,
                        maxPage
                    });
                }else{
                    reject(`Im sorry only until page ${maxPage} :(`);
                }
            }
            else reject(err);
        });
    });
}
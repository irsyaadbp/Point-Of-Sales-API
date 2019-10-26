'use-strict';

const model = require('../Models/order'),
    response = require('../Helpers/response'),
    { pagination } = require('../Models/page'),
    { getProductById } = require('../Models/product');

exports.getOrders = (req, res) => {
    const page = pagination(req);
    model.getOrders(req, page).then(result => {
        response.success(res, result);
    }).catch(err => {
        response.error(res, err);
    });
}

exports.newOrder = (req, res) => {
    if (req.body.admin_id == null) return response.error(res, "Admin id can't be empty");
    if (req.body.total_price == null) return response.error(res, "Total price can't be empty");
    if (req.body.detail_order == null) return response.error(res, "Detail order can't be empty");
    if (!Array.isArray(req.body.detail_order)) return response.error(res, "Detail order must be array of object");

    const detailOrder = req.body.detail_order;
    const orderProdId = detailOrder.map(item => item.prod_id);

    getProductById(req, orderProdId).then(result => {
        if (result.length == orderProdId.length) {
            let statusQty = [];
            result.forEach((item, index) => {
                if (detailOrder[index].quantity < item.quantity) {
                    statusQty.push(true);
                } else {
                    statusQty.push(false);
                }
            });
            if (!statusQty.includes(false)) {
                model.newOrder(req, orderGenerator()).then(result => {
                    response.success(res, 'Order added successfully');
                }).catch(err => {
                    if (err.code == "ER_DUP_ENTRY") this.newOrder(req, res);
                    else response.error(res, err.code);
                });
            } else {
                response.error(res, "Quantity is not enough");
            }

        } else {
            response.error(res, "Product id not found")
        }
    }).catch(err => response.error(res, err));
}

exports.getDetailOrderById = (req, res) => {
    model.getOrderById(req).then(result => {
        if (result.length != 0) {
            model.getDetailOrderById(req.params.order_id).then(resultDetail => {
                const data = result.map(item => ({
                    admin_id: item.admin_id,
                    order_id: item.order_id,
                    detail_order: resultDetail,
                    total_price: item.total_price,
                    status: item.status,
                    cancel_reason: item.cancel_reason,
                    created_at: item.created_at,
                    update_at: item.update_at
                }));
            
                response.success(res, data);
            }).catch(err => {
                response.error(res, err);
            });
        } else {
            response.error(res, "Order Not Found");
        }
    }).catch(err => response.error(res, err));
}

exports.updateStatusOrder = (req, res) => {
    if (req.body.status == null) return response.error(res, "Status can't be empty");

    if (req.body.status == "cancel") {
        if (req.body.cancel_reason == null) {
            return response.error(res, "Cancel reason can't be empty")
        }
    }

    model.updateStatusOrder(req).then(result => {
        model.getDetailOrder(req.params.order_id).then(result => {
            const data = result.map(item => ({
                prod_id: item.prod_id,
                quantity: item.quantity
            }));

            model.updateQtyProduct(data, req.body.status).then(result => {
                response.success(res, `Order updated to '${req.body.status}'`);
            }).catch(err => {
                response.error(res, err);
            })
        }).catch(err => {
            response.error(res, err.sqlMessage);

        });
    }).catch(err => {

        response.error(res, err.sqlMessage);
    });
}

const orderGenerator = () => {
    return Math.floor(Math.random() * 990000) + 10000;
}
const express = require('express');
const OrdersRouter = express.Router();
const Orders = require('../models/Orders');

OrdersRouter.route('/add').post((req, res)=>{
    console.log('@orders route post peq.body', req.body);
    Orders.countDocuments().exec((err, count)=>{
        console.log('@orders count', count);
        if (err) {
            console.log('@orders err ', err);
            return;
        }
        const newOrders = new Orders({
            id: count + 1,
            orders: req.body.orders,
            totalPrice: req.body.totalPrice
        });
        console.log('@orders route post newOrders', newOrders);
        newOrders.save()
        .then(order => {res.json({
                success: true,
                order: order
            })
        })
        .catch(err => {res.json({
                success: false,
                err: err
            })
        })
    });
});

module.exports = OrdersRouter;

const express = require('express');
const ProductsRouter = express.Router(); 
const Products = require('../models/Products');

ProductsRouter.route('/').get((req, res)=>{
    Products.find((err, products)=>{
        if(err){
            console.log('err : ', err);
            return  res.json({
                        success: false,
                        error: err
                    });
        }
        res.json({
            success: true,
            products: products
        });
    })
});

ProductsRouter.route('/id/:id').get((req, res)=>{
    const id = req.params.id;
    console.log("id product: ", id);
    Products.findOne().where({'id' : id}).exec((err, product)=>{
        if(err){
            console.log('err : ', err);
            return  res.json({
                        success: false,
                        error: err
                    });
        }
        res.json({
            success: true,
            product: product
        });
    })
});

ProductsRouter.route('/categorieId/:id').get((req, res)=>{
    const categorieId = req.params.id;
    console.log("categorieId: ", categorieId);
    Products.find().where({'categorieId' : categorieId}).exec((err, product)=>{
        if(err){
            console.log('err : ', err);
            return  res.json({
                        success: false,
                        error: err
                    });
        }
        res.json({
            success: true,
            product: product
        });
    })
});

ProductsRouter.route('/newProduct').get((req, res)=>{
    Products.find().limit(3).sort({date:-1}).exec((err, products)=>{
        if(err){
            console.log('err : ', err);
            return  res.json({
                        success: false,
                        error: err
                    });
        }
        res.json({
            success: true,
            products: products
        });
    })
});

ProductsRouter.route('/add').post((req, res)=>{
    Products.countDocuments().exec((err, count) => {
        if (err) {
            res.send(err);
            return;
        }
        req.body.id += count;
        const newProduct = new Products(req.body); 
        newProduct.save()
        .then(product =>{ res.json({
                success: true,
                product: product
            })}
        )
        .catch(err => { res.json({
                success: false,
                error : err 
            })}
        )
    });
});

module.exports = ProductsRouter;
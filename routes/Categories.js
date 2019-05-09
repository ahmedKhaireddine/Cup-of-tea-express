const express = require('express');
const CategorieRouter = express.Router();
const Categories = require('../models/Categories');

CategorieRouter.route('/').get((req, res)=>{
    Categories.find((err, Categories)=>{
        if(err){
            console.log('err : ', err);
            return  res.json({
                        success: false,
                        error: err
                    });
        }
        res.json({
            success: true,
            Categories: Categories
        });
    })
});

CategorieRouter.route('/:id').get((req, res)=>{
    const id = req.params.id;
    console.log("id: ", id);
    Categories.findOne().where({'id' : id}).exec((err, Categorie)=>{
        if(err){
            console.log('err : ', err);
            return  res.json({
                        success: false,
                        error: err
                    });
        }
        res.json({
            success: true,
            Categorie: Categorie
        });
    })
});

CategorieRouter.route('/add').post((req, res)=>{
    console.log('body : ', req.body);
    Categories.countDocuments().exec((err, count) => {
        if (err) {
            res.send(err);
            return;
        }
        req.body.id += count;
        const newCategorie = new Categories(req.body); 
        newCategorie.save()
        .then(Categorie =>{ res.json({
                success: true,
                Categorie: Categorie
            })}
        )
        .catch(err => { res.json({
                success: false,
                error : err 
            })}
        )
    });
});

module.exports = CategorieRouter;
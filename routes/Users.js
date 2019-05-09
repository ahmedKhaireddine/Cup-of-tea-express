const express = require('express');
const UsersRouter = express.Router();
const Users = require('../models/Users');
const passport = require("passport");

UsersRouter.route('/signup').post((req, res) =>{
    console.log('@UsersRouter /signup req.body', req.body);

    const password = req.body.password;
    Users.countDocuments().exec((err, count)=>{
        Users.register(
            new Users({
                id: count + 1,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                phone: req.body.phone,
                username:req.body.email,
                email: req.body.email
            }),password)
            .then(user => {
                res.json({
                    success:true,
                    user: user,
                    message : "Enregistrement avec succé"
                });
            }).catch(err => {
                res.json({
                    success: false,
                    error : err,
                    message: "Enregistrement echouer resseyer"
                });
            });
    });    
});

UsersRouter.route('/login').post(
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
      })
);
UsersRouter.route("/logout").get((req, res) => {
    req.logout();
    res.redirect("/");
  });


module.exports = UsersRouter;
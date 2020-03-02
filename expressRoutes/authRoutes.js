var express = require('express');
var app = express();
var authRoutes = express.Router();
const bcrypt = require("bcrypt");
var User = require('../models/User');


authRoutes.route('/register').post(async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    if (user) return res.status(400).send("User already exists");
    else if (req.body.password != req.body.password2) return res.status(400).send("Passwords do not match");
    else
        user = new User({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        });
    const salt = await bcrypt.genSalt(14);
    user.password = await bcrypt.hash(user.password, salt);
    let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    user.token = token;
    user.save();
    res.send({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        token: token
    });
});

authRoutes.route('/login').post(async (req, res) => {
    let user = await User.findOne({
        email: req.body.email
    });
    if (!user) return res.status(400).send("User with specified email doesn't exist");
    else {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (result) {
                let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                user.token = token;
                user.save().then(user => {
                    return res.status(200).send(user.token);
                }).catch(err => {
                    return res.status(400).send("unable to update the database");
                });
            }
        });
    }
});

authRoutes.route('/user').get(function (req, res) {
    
    if(req.headers['token'] == undefined){
        res.json({"error": "No header present"});
        return;
    }
    User.findOne({ token: req.headers['token'] }, function (err, user) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(user);
        }
    });
});

module.exports = authRoutes;
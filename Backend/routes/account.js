const router = require('express').Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const config = require('../config');

router.post('/register', (req, res, next) => {
    let user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;

    User.findOne({ email: req.body.email }, (err, existingUser) => {
        if (existingUser) {
            res.json({
                success: false,
                message: 'Account with that email is already registered'
            });
        } else {
            user.save();

            var token = jwt.sign({
                user: user
            }, config.secret, {
                    expiresIn: '7d'
                });

            res.json({
                success: true,
                message: 'Successfully Registered',
                token: token,
                userdata: user
            });
        }
    });

});

router.post('/login', (req, res, next) => {

    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            return res.json({
                success: false,
                message: err
            });
        }

        if (!user) {
            res.json({
                success: false,
                message: 'Authentication Failed, user not found'
            });
        }

        else if (user) {
            var validPassword = user.comparePassword(req.body.password);
            if (!validPassword) {
                res.json({
                    success: false,
                    message: 'Authenticaton failed .Wrong password'
                });
            } else {

                var token = jwt.sign({
                    user: user
                }, config.secret, {
                        expiresIn: '7d'
                    });


                var userT = user;

                res.json({
                    success: true,
                    message: 'Successfully Logged In',
                    token: token,
                    userdata: userT
                });
            }
        }
    });

});


module.exports = router;
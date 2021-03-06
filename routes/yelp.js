var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/user.js');

router.get('/yelp', function(request, response) {
    var login = false;
    var email, name;
    if (request.session && request.session.email) {
        login = true;
        email = request.session.email;
        name = request.session.name;
    }

    User.findOne({email: email}).populate('sharedLists_own').populate('sharedLists_edit').exec(function(err, user) {
        if (err) {
            console.log(err);
        } else if(!user) {
            response.render('pages/yelp', {
                login: login,
                email: email,
                name: name
            });
            return;
        } else {
            response.render('pages/yelp', {
                login: login,
                email: email,
                name: name,
                user: user
            });
            return;
        }
    });
});

module.exports = router;

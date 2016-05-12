var express = require('express');
var router = express.Router();
var Rating = require('../models/rating');
var User = require('../models/user');

router.post('/', function(req, res, next) {

    //add new Rating
    new Rating({
        restaurantId: req.body.restaurantId,
        username: req.body.username,
        rating: req.body.rating,
        created_at: Date.now(),
        updated_at: Date.now()
    }).save( function(err) {
            if (err) {
                res.sendStatus(400);
                console.log(err);
            }
            else {
                res.sendStatus(200);
            }
        });

    //update the associated User
    User.findOneAndUpdate(
        {"username": "a"},
        {"lastName": "newlastname"}
    );
/*    User.findOneAndUpdate(
        {"username": req.body.username},
        {$push: {"ratings": {"restaurantId": req.body.restaurantId, 
                           "rating": req.body.rating}}}
    );*/
});

module.exports = router;

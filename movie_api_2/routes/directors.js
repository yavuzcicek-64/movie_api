var express = require('express');
var router = express.Router();

const DirectorModel = require('../models/Director');

/* Film yönetmeni ekleme */
router.post('/', function(req, res, next) {
    const director = new DirectorModel(req.body);
    const promise = director.save();
    promise.then((data)=> {
        res.json(data);
    }).catch((error)=> {
        res.json(error);
    })
});

/* Film yönetmenlerini listeleme */
router.get('/' , (req,res)=> {
    const promise = DirectorModel.find({});
    promise.then((data)=> {
        res.json(data);
    }).catch((error)=> {
        res.json(error);
    })
});


module.exports = router;

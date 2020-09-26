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
    const promise = DirectorModel.aggregate([
        {
            $lookup : {
                from : 'movies',
                localField : '_id',
                foreignField : 'director_id',
                as : 'movies'
            }
        },
        {
            $unwind : {
                path : '$movies',
                preserveNullAndEmptyArrays:  true
            }
        },
        {
            $group : {
                _id : {
                    _id :'$_id',
                    name :'$name',
                    surname: '$surname',
                    bio : '$bio',                   
                },
                movies : {
                    $push : '$movies'
                }
            }
        },
        {
            $project:  {
                _id : {
                    _id : '$_id._id',
                    name : '$_id.name',
                    surname : '$_id.surname',
                    bio : '$_id.bio',
                    movies : '$movies'
                }
            }
        }
    ]);
    promise.then((data)=> {
        res.json(data);
    }).catch((error)=> {
        res.json(error);
    })
});


module.exports = router;

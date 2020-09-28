const mongoose = require('mongoose');
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

/* id ye göre yönetmen listesi */
router.get('/:director_id' , (req,res)=> {
    const promise = DirectorModel.aggregate([
        {
            $match :  {
                '_id' :  mongoose.Types.ObjectId(req.params.director_id)
            } 
        },
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

/* yönetmen update */
router.put('/:director_id' , (req,res)=> {
    const promise = DirectorModel.findByIdAndUpdate(req.params.director_id , req.body, {new :true});

    promise.then((data)=> {
        res.json(data);
    }).catch((error)=> {
        res.json(error);
    })
});

/*YÖNETMEN DELETE İŞLEMLERİ */
router.delete('/:director_id', (req,res)=> {
    const promise = DirectorModel.findByIdAndDelete(req.params.director_id);
    promise.then((data)=> {
        res.json({status :1});
    }).catch((error)=> {
        res.json(error);
    })
});

module.exports = router;

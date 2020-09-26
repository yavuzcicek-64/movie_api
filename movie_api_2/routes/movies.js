var express = require('express');
const Movie = require('../models/Movie');
var router = express.Router();

const MovieModel = require('../models/Movie');

/* Film Kaydetme */
router.post('/', function(req, res, next) {
    const movie = new MovieModel(req.body);
    const promise = movie.save();
    promise.then((movie) => {
        res.json(movie);
    }).catch((error)=> {
        res.json(error);
    });
});

/* Film listeleme */
router.get('/', function(req, res, next) {
    const promise = Movie.find({});
    promise.then((movie)=> {
        res.json(movie);
    }).catch((error)=> {
        res.json(error);
    });
});

module.exports = router;

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

/* id ye göre film listeleme */
router.get('/:movie_id' , (req,res)=> {
    const promise = MovieModel.findById(req.params.movie_id);

    promise.then((movie_id)=> {
        res.json(movie_id);
    }).catch((error)=>{
        res.json(error);
    });
});

/* Film güncelleme */
router.put('/:movie_id' , (req,res)=> {
    const promise  = Movie.findByIdAndUpdate(req.params.movie_id , req.body , {new :true});
    promise.then((data)=> {
        res.json(data);
    }).catch((error)=> {
        res.json(error);
    })
});

/* Film Silme */
router.delete('/:movie_id', (req,res)=> {
    const promise = Movie.findByIdAndDelete(req.params.movie_id);
    promise.then((data)=> {
        res.json({status : 1});
    }).catch((error)=> {    
        res.json(error);
    })
});

module.exports = router;

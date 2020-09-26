const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://yavuzcicek:yvzcck1994.@demo-movie-api.bnlgu.mongodb.net/movie_api?retryWrites=true&w=majority', {useUnifiedTopology: true , useNewUrlParser: true})
    mongoose.connection.on('open' , () => {
        console.log('MongoDB : Connected'); 
    });
    mongoose.connection.on('error' , (err) => {
        console.log('MongoDB : Error' , err);
    });
    mongoose.Promise = global.Promise;
};
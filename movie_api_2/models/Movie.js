const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id : Schema.Types.ObjectId,
    
    title : {
        type: String,
        required : true
    },
    category : {
        type : String,
        required : true

    },
    country : {
        type : String,
        required : true

    },
    year : {
        type :Number,
        required : true

    },
    imdb_score : {
        type : Number,
        required : true
        
    }
});


module.exports = mongoose.model('movie' , MovieSchema);
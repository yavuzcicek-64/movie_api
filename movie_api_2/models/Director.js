const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
    director_id : Schema.Types.ObjectId,
    name : {
        type: String,
        required : true
    },
    surname : {
        type : String,
        required : true

    },
    bio : {
        type : String,
        required : true

    },
    createdAt : {
        type : Date,
        default : Date.now
    }
    
    
});


module.exports = mongoose.model('director' , DirectorSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UsersSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        
         
       
    }
});

module.exports = mongoose.model('user' , UsersSchema);
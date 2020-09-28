var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const UsersModel = require('../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', (req, res, next) =>{
    const {username , password} = req.body;

    
      bcrypt.hash(password, 10).then((hash)=>{
        if(req.body.password.length <= 15 && req.body.password.length >= 5)
        {
          const user = new UsersModel({username,password:hash});
          const promise = user.save();
      
          promise.then((data)=> {
           res.json(data);
          }).catch((error)=> {
            res.json(error);
          });
        }else {
          res.send('Şifre 5 karakrerden küçük ve 15 karakterden büyük olamaz!');
        }       
        
      });
});

module.exports = router;

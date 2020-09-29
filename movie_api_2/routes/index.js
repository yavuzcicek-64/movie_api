var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
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

router.post('/authenticate' ,(req,res)=> {
    const { username , password} = req.body;
    UsersModel.findOne({username} , (err,user)=>{
      if(err)
        res.json(err);
      if(!user){
        res.json({status : false , message: 'Authenticate is failed, user not found!'});
      }
      else
      {
        bcrypt.compare(password , user.password).then((result)=>{
          if(!result){
            res.json({status : false , message: 'Authenticate is failed, password is wrong!'});
          }else{
            const payload = {
              username
            };
            const token = jwt.sign(payload , req.app.get('api_secret_key') , {expiresIn : 720});
            res.json({status : true , token});
          }
        });
      }
    });

});

module.exports = router;

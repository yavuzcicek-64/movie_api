var express = require('express');
var router = express.Router();

const UsersModel = require('../models/Users');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.post('/register', (req, res, next) =>{
    const {username , password} = req.body;

    const user = new UsersModel({
      username,
      password
    });

    const promise = user.save();

    promise.then((data)=> {
      res.json(data);
    }).catch((error)=> {
      res.json(error)
    })
});

module.exports = router;

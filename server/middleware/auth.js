const {Todo,User} = require('../models')
const jwt = require('jsonwebtoken');

function authentication(req,res,next){
  const access_token = req.headers.access_token;
  if(!access_token){
    next({name:"TOKEN_NOT_FOUND"})
  } else {
    let decode;
    try {
      decode = jwt.verify(access_token, 'amiruljbr');
    } catch(err) {
      next({name:"INVALID_TOKEN"});
    }

    req.userData = decode;
    if(!req.userData.id){
      next({name:"INVALID_TOKEN"});
    }
    User.findByPk(req.userData.id)
      .then(data => {
        if(data){
          next();
        } else {
          next({name:"USER_NOT_FOUND"});
        }
      })
      .catch(err => {
        next({name:"INVALID_TOKEN"});
      })
  }
}


function authorization(req,res,next){
  const id = req.params.id;
  Todo.findByPk(id)
  .then(data=>{
    if(!data){
      next({name:"TODO_NOT_FOUND"})
    } else if(data.UserId !== req.userData.id){
      next({name:'NOT_AUTHORIZED'})
    } else {
      next();
    }
  })
  .catch(err =>{
    res.status(500).json(err)
  })
}

module.exports = {authentication, authorization}
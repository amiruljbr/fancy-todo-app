const {Todo,User} = require('../models')
const jwt = require('jsonwebtoken');

function authentication(req,res,next){
  const access_token = req.headers.access_token;
  if(!access_token){
    res.status(404).json({message: 'Token not found'})
  }
  else {
    const decode = jwt.verify(access_token, 'amiruljbr');
    req.userData = decode;
    User.findByPk(req.userData.id)
      .then(data => {
        if(data){
          next()
        } else {
          res.status(404).json({message: 'Invalid user'})
        }
      })
      .catch(err => {
        res.status(401).json({message: err.message})
      })
  }
}


function authorization(req,res,next){
  const id = req.params.id;
  Todo.findByPk(id)
  .then(data=>{
    if(!data){
      res.status(404).json({message:'Todo not Found'})
    } else if(data.UserId !== req.userData.id){
      res.status(403).json({message:`You're not authorized to do this`});
    } else {
      next();
    }
  })
  .catch(err =>{
    res.status(500).json(err)
  })
}

module.exports = {authentication, authorization}
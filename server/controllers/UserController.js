const {User} = require('../models');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class UserController {
  static getAllUser(req,res, next){
    User.findAll()
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static added(req,res,next){
    let newUser = {
      username:req.body.username,
      password:req.body.password,
      email:req.body.email,
    }

    User.create(newUser)
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static loginPost(req,res,next){
    let dataUser = {
      username:req.body.username,
      password:req.body.password
    }
    
    User.findOne({where: {username:dataUser.username}})
    .then(data =>{
      if(!data) {
        next({name:"USER_NOT_FOUND"})
      } else{
        if(bcrypt.compareSync(req.body.password, data.password)){
          let token = jwt.sign({id:data.id,username:data.username}, 'amiruljbr');
          res.status(200).json({id:data.id,username:data.username,token:token})
        }else{
          next({name:"USER_NOT_FOUND", message:"invalid username / password"})
        }
      }
    })
    .catch(err =>{
      next(err)
    })

  }
}

module.exports = UserController;
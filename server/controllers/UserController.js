const {User} = require('../models');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

class UserController {
  static getAllUser(req,res){
    User.findAll()
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static added(req,res){
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

  static loginPost(req,res){
    let dataUser = {
      username:req.body.username,
      password:req.body.password
    }
    
    User.findOne({where: {username:dataUser.username}})
    .then(data =>{
      if(!data) {
        res.status(409).json({message:"Username Not Found"})
      }
      else{
        if(bcrypt.compareSync(req.body.password, data.password)){
          let token = jwt.sign({id:data.id,username:data.username}, 'amiruljbr');
          res.status(200).json({id:data.id,username:data.username,token:token})
        }else{
          res.status(403).json({message:"Username/Id not valid"})
        }
      }
    })
    .catch(err =>{
      res.status(500).json(err)
    })

  }
}

module.exports = UserController;
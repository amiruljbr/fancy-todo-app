const {User} = require('../models');
const bcrypt = require('bcrypt');
const { Op } = require("sequelize");
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
  // static getAllUser(req,res, next){
  //   User.findAll()
  //   .then(data=>{
  //     res.status(200).json(data)
  //   })
  //   .catch(err=>{
  //     res.status(500).json(err)
  //   })
  // }

  static added(req,res,next){
    let newUser = {
      username:req.body.username,
      password:req.body.password,
      email:req.body.email,
      urlImage:req.body.urlImage
    }

    User.create(newUser)
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      next(err)
    })
  }

  static loginPost(req,res,next){
    let dataUser = {
      username:req.body.username,
      password:req.body.password
    }
    
    User.findOne({where:{[Op.or]: [{username:dataUser.username}, {email:dataUser.username}]} } )
    .then(data =>{
      if(!data) {
        next({name:"USER_NOT_FOUND"})
      } else{
        if(bcrypt.compareSync(req.body.password, data.password)){
          let token = jwt.sign({id:data.id,username:data.username}, process.env.SECRET);
          res.status(200).json({urlImage: data.urlImage,id:data.id,username:data.username,token:token})
        } else{
          next({name:"USER_NOT_FOUND", message:"invalid email / password"})
        }
      }
    })
    .catch(err =>{
      next(err)
    })
  }

  static googleUser(req, res, next) {
    const token = req.body.id_token;
    let recent_email = null

    client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID
    })
    .then(ticket => {
      const payload = ticket.getPayload();
      recent_email = payload.email;
      return User.findOne({
      where: { email: recent_email }
      })
    })
    .then( isUser => {
      if (isUser) {
        const access_token = jwt.sign( {id: isUser.id, email: isUser.email}, process.env.SECRET)
        return res.status(200).json({
        urlImage: isUser.urlImage,
        email: isUser.email,
        access_token 
      })
      } else { 
        return User.create({
          username: 'User' + Math.floor(Math.random()*1000000).toString(),
          email: recent_email,
          password: 'randomPassword',
          urlImage: ''
        })
      }
    })
    .then(newUser =>{
        const access_token = jwt.sign( {id: newUser.id, email: newUser.email}, process.env.SECRET)
        res.status(200).json({
            urlImage: newUser.urlImage,
            email: newUser.email,
            access_token
        })
    })
    .catch(err => {
        next(err)
    })        
  }
}

module.exports = UserController;
const {Todo} = require('../models');

class TodoController {
  static getAllTodo(req,res,next){
    console.log(req.query);
    Todo.findAll({
      where:{
        UserId:req.userData.id
      },
      order: [
        ['due_date']
      ]
    })
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err);
    })
  }

  static added(req,res,next){
    let newTodo = {
      title:req.body.title,
      description:req.body.description,
      due_date:new Date (req.body.due_date),
      UserId:req.userData.id
    }

    Todo.create(newTodo)
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      next(err);
    })
  }

  static delete(req,res,next){
    Todo.destroy({where:{
      id:req.params.id
    }})
    .then(data=>{
      res.status(200).json({message:`Todo with id:${req.params.id} has been deleted`})
    })
    .catch(err=>{
      next(err)
    })
  }

  static edit(req,res,next){
    console.log(req.query);
    Todo.findOne({
      where:{
        UserId:req.userData.id,
        id:req.params.id
      }
    })
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      next(err);
    })
  }

  static editPost(req,res,next){
    let dataTodo = {
      id:req.params.id,
      title:req.body.title,
      description:req.body.description,
      due_date: new Date (req.body.due_date),
      UserId:req.userData.id
    }

    Todo.update({
      title:dataTodo.title,
      description:dataTodo.description,
      due_date:dataTodo.due_date
    }, {
      where: {
        id: dataTodo.id
      }
    })
    .then(data=>{
      res.status(200).json({message:`Todo with id:${dataTodo.id} has been updated`})
    })
    .catch(err=>{
      next(err);
    })
  }
}

module.exports = TodoController;
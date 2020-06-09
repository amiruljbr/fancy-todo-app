const {Todo} = require('../models');

class TodoController {
  static getAllTodo(req,res,next){
    Todo.findAll()
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
      due_date:req.body.due_date,
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

  static editPost(req,res,next){
    let dataTodo = {
      id:req.params.id,
      title:req.body.title,
      description:req.body.description,
      due_date:req.body.due_date,
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
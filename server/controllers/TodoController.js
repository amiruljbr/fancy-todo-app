const {Todo} = require('../models');

class TodoController {
  static getAllTodo(req,res){
    Todo.findAll()
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static added(req,res){
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
      res.status(500).json(err)
    })
  }

  static delete(req,res){
    Todo.destroy({where:{
      id:req.params.id
    }})
    .then(data=>{
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }

  static editPost(req,res){
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
      res.status(200).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
}

module.exports = TodoController;
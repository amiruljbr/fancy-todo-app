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
    }

    Todo.create(newTodo)
    .then(data=>{
      res.status(201).json(data)
    })
    .catch(err=>{
      res.status(500).json(err)
    })
  }
}

module.exports = TodoController;
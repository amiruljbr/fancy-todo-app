'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  
  class Todo extends Model {

  }

  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {sequelize});

  Todo.associate = function(models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
  };

  Todo.addHook('beforeValidate', (todo, options) => {
    todo.status = 'uncompleted'
  });

  return Todo;
};
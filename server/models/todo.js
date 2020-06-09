'use strict';
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;
  
  class Todo extends Model {

  }

  Todo.init({
    title: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'please fill the title'
        }
      }
    },
    description: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'please fill the description'
        }
      }
    },
    status: DataTypes.STRING,
    due_date: {
      type:DataTypes.DATE,
      validate: {
        notEmpty:{
          msg: 'please fill the due_date'
        }
      }
    },
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
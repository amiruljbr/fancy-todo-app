'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {

  }

  User.init({
    username: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'please fill the username'
        }
      }
    },
    password: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'please fill the password'
        }
      }
    },
    email: {
      type:DataTypes.STRING,
      validate: {
        notEmpty:{
          msg: 'please fill the description'
        },
        isEmail:true
      }
    },
    urlImage: DataTypes.STRING
  }, {sequelize});

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Todo);
  };

  User.beforeCreate((instance,option) =>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
    if (instance.urlImage == ''){
      instance.urlImage='https://i.stack.imgur.com/l60Hf.png';
    }
  })

  return User;
};
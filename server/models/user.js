'use strict';
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  const Sequelize = sequelize.Sequelize;
  const Model = Sequelize.Model;

  class User extends Model {

  }

  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notNull: false
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notNull: false
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notNull: false
      }
    }
  }, {sequelize});

  User.associate = function(models) {
    // associations can be defined here
  };

  User.beforeCreate((instance,option) =>{
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(instance.password, salt)
    instance.password = hash
  })

  return User;
};
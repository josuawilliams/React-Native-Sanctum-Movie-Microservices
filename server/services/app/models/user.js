'use strict';
const {
  Model
} = require('sequelize');

const {hashPass} = require("../helper/HashPassword")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: {
     type : DataTypes.STRING,
     allowNull : false,
     unique: {
      msg : "Email Has Been Added Use Other Email"
     },
     validate :{
       notNull : {
         msg : "Email Is Required"
       },
       notEmpty : {
         msg : "Email Is Required"
       },
       isEmail : {
         msg : "Invalid Email"
       }
     }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "Password Is Required"
        },
        notEmpty :{
          msg : "Password Is Required"
        },
        len : {
          args : 5,
          msg : "Min 5 characters required"
        },
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPass(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
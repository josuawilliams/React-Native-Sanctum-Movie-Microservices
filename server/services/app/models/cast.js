'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cast extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Movie, {
        foreignKey: "MovieId",
      });
    }
  }
  Cast.init({
    MovieId: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Name is required'
        },
        notEmpty: {
          msg: 'Name cannot be empty'
        }
      }
    },
    profilePict: {
      type: DataTypes.STRING,
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Name is required'
          },
          notEmpty: {
            msg: 'Name cannot be empty'
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Cast',
  });
  return Cast;
};
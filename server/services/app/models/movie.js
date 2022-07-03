'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Cast, {
        foreignKey: "MovieId"
      })
      this.belongsTo(models.Genre, {
        foreignKey: "GenreId"
      })
    }
  }
  Movie.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title is required"
        },
        notEmpty: {
          msg: "Title is required"
        }
      }
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Slug is required"
        },
        notEmpty: {
          msg: "Slug is required"
        }
      }
    },
    synopsis: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Synopsis is required"
        },
        notEmpty: {
          msg: "Synopsis is required"
        }
      }
    },
    trailerURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "trailerURL is required"
        },
        notEmpty: {
          msg: "trailerURL is required"
        },
        isUrl: {
          msg: "Invalid URL"
        }
      }
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "imgURL is required"
        },
        notEmpty: {
          msg: "imgURL is required"
        },
        isUrl: {
          msg: "Invalid URL"
        }
      }
    },
    rating: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "rating is required"
        },
        notEmpty: {
          msg: "rating is required"
        },
        max: {
          args: 10,
          msg: "Allow Value 1-10"
        },
        min: {
          args: 1,
          msg: "Allow Value 1-10"
        }
      }
    },
    GenreId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER,
    UserMongoId: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        let slug = user.slug.split(/[ \!@#$%^&*?()]+/).join(" ").split(" ")
        if (slug[slug.length - 1] === "") {
          slug.pop()
        }
        user.slug = slug.join("-")
        let URL = "https://www.youtube.com/embed/" + user.trailerURL.split("=")[1]
        user.trailerURL = URL
      },
      beforeUpdate: (user, options) => {
        let slug = user.slug.split(/[ \!@#$%^&*?()]+/).join(" ").split(" ")
        if (slug[slug.length - 1] === "") {
          slug.pop()
        }
        user.slug = slug.join("-")
        let URL = "https://www.youtube.com/embed/" + user.trailerURL.split("=")[1]
        user.trailerURL = URL
      }
    },
    sequelize,
    modelName: 'Movie',
  });
  return Movie;
};
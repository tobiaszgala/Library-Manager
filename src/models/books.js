'use strict';
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('Books', {
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title field is required"
        }
      }
    },
    author: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Author field is required"
        }
      }
    },
    genre: DataTypes.STRING,
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'Year must be integer'
        }
      }
    }
  }, {});
  Books.associate = function(models) {
    // associations can be defined here
  };
  return Books;
};
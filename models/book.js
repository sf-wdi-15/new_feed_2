"use strict";

module.exports = function(sequelize, DataTypes) {
  var Book = sequelize.define("Book", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    synopsis: DataTypes.TEXT,
    library_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Book;
};

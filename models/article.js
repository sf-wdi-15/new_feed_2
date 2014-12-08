"use strict";

module.exports = function(sequelize, DataTypes) {
  var article = sequelize.define("article", {
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    content: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return article;
};

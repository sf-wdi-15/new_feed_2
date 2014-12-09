"use strict";

module.exports = function(sequelize, DataTypes) {
  var Library = sequelize.define("Library", {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Library;
};

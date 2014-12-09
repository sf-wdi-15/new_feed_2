"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Articles", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      title: {
        type: DataTypes.STRING
      },
      author: {
        type: DataTypes.STRING
      },
      summary: {
        type: DataTypes.TEXT
      },
      img_url: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Articles").done(done);
  }
};
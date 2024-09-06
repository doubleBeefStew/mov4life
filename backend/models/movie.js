'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      // Many-to-Many relationship through MovieGenre
      Movie.belongsToMany(models.Genre, {
        through: models.MovieGenre,
        foreignKey: 'movieId',
        as: 'genres'
      });
    }
  }

  Movie.init({
    title: DataTypes.STRING,
    year: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    cover: DataTypes.STRING,
    video: DataTypes.STRING,
    active: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Movie',
  });

  return Movie;
};

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovieGenre extends Model {
    static associate(models) {
      // Associations for MovieGenre
      MovieGenre.belongsTo(models.Movie, {
        foreignKey: 'movieId',
        onDelete: 'CASCADE',
        as: 'movie'
      });

      MovieGenre.belongsTo(models.Genre, {
        foreignKey: 'genreId',
        onDelete: 'CASCADE',
        as: 'genre'
      });
    }
  }

  MovieGenre.init({
    movieId: DataTypes.INTEGER,
    genreId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MovieGenre',
  });

  return MovieGenre;
};

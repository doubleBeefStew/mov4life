'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Genre extends Model {
    static associate(models) {
      // Many-to-Many relationship through MovieGenre
      Genre.belongsToMany(models.Movie, {
        through: models.MovieGenre,
        foreignKey: 'genreId',
        as: 'movies'
      });
    }
  }

  Genre.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Genre',
  });

  return Genre;
};

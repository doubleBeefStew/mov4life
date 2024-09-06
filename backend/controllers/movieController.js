const { db, sequelize } = require("../models");
const fs = require("fs-extra");
const path = require("path");
const Movies = db.Movie;
const MovieGenre = db.MovieGenre;

const { uploadFiles } = require('../services/uploadServices');

module.exports = {
  all: async (req, res) => {
    try {
      const movies = await Movies.findAll();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "ok",
        data: {
          movies,
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "internal server error",
        data: null,
        error: "Internal Server Error",
      });
    }
  },

  find: async (req, res) => {
    try {
      const { id } = req.params;
      const movie = await Movies.findOne({
        where: { id: id },
      });

      if (!movie) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "movie not found",
          data: null,
          error: "Movie Not Found",
        });
      }

      return res.status(200).json({
        status: 200,
        success: true,
        message: "ok",
        data: {
          movie: movie,
        },
        error: null,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "internal server error",
        data: null,
        error: "Internal Server Error",
      });
    }
  },

  update: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { id } = req.params;
      const { title, year, description, genreIds } = req.body;

      // Handle cover and video files
      let coverUrl = null;
      let videoUrl = null;

      // Upload cover if exists
      if (req.files.cover) {
        const coverUploadResult = await cloudinary.uploader.upload(req.files.cover.path, {
          resource_type: 'image',
        });
        coverUrl = coverUploadResult.secure_url;
      }

    // Upload video if exists
    if (req.files.video) {
      const videoUploadResult = await cloudinary.uploader.upload(req.files.video.path, {
        resource_type: 'video',
      });
      videoUrl = videoUploadResult.secure_url;
    }

      // Find the movie by ID
      const movie = await Movies.findByPk(id, { transaction });

      if (!movie) {
        await transaction.rollback();
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Movie not found",
          data: null,
          error: "Not Found",
        });
      }

      // If there are new URLs, delete the old ones from Cloudinary
      if (movie.cover) {
        await cloudinary.uploader.destroy(movie.cover.public_id, { resource_type: 'image' });
      }
      if (movie.video) {
        await cloudinary.uploader.destroy(movie.video.public_id, { resource_type: 'video' });
      }

      await movie.update(
        { title, year, description, cover, video },
        { transaction }
      );

      const genreIdsArray = Array.isArray(genreIds) ? genreIds : [];
      const validGenreIds = genreIdsArray
        .map((id) => parseInt(id, 10))
        .filter((id) => !isNaN(id));

      if (validGenreIds.length > 0) {
        await movie.setGenres(validGenreIds, { transaction });
      }

      await transaction.commit();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Movie updated successfully",
        data: { movie },
        error: null,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error updating movie:", error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        data: null,
        error: error.message || "Internal Server Error",
      });
    }
  },

  create: async (req, res) => {
    const transaction = await sequelize.transaction();

    try {
      const { title, year, description, genreIds } = req.body;
      
      const active = 1;

      const { coverUrl, videoUrl } = await uploadFiles(req.files);

      const movie = await Movies.create(
        { title, year, description, cover: coverUrl, video: videoUrl, active },
        { transaction }
      );

      const genreIdsArray = Array.isArray(genreIds) ? genreIds : [];
      const validGenreIds = genreIdsArray.map(id => parseInt(id, 10)).filter(id => !isNaN(id));

      if (validGenreIds.length > 0) {
        await movie.setGenres(validGenreIds, { transaction });
      }

      await transaction.commit();
      return res.status(201).json({
        status: 201,
        success: true,
        message: "New movie created",
        data: { movie },
        error: null,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating movie:", error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        data: null,
        error: error.message || "Internal Server Error",
      });
    }
  },

  destroy : async (req, res) => {
    const { id } = req.params;
  
    const transaction = await sequelize.transaction();
  
    try {
      const movie = await Movies.findByPk(id, { transaction });
  
      if (!movie) {
        await transaction.rollback();
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Movie not found",
          data: null,
          error: "Not Found",
        });
      }
  
      await MovieGenre.destroy({ where: { movieId: id }, transaction });
  
      if (movie.cover) {
        const filePath = path.join(__dirname, "..", "uploads", movie.cover);
        await fs.remove(filePath);
      }
  
      await Movies.destroy({ where: { id }, transaction });
  
      await transaction.commit();
  
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Movie deleted successfully",
        data: null,
        error: null,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error deleting movie:", error);
      return res.status(500).json({
        status: 500,
        success: false,
        message: "Internal server error",
        data: null,
        error: error.message || "Internal Server Error",
      });
    }
  }
};

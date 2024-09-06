const { db, sequelize } = require("../models");
const fs = require("fs-extra");
const path = require("path");
const Genres = db.Genre;

module.exports = {
  all: async (req, res) => {
    try {
      const genres = await Genres.findAll();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "ok",
        data: {
          genres,
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
      const genre = await Genres.findOne({
        where: { id: id },
      });

      if (!genre) {
        return res.status(404).json({
          status: 404,
          success: false,
          message: "genre not found",
          data: null,
          error: "Genre Not Found",
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
      const { name } = req.body;

      const genre = await Genres.findByPk(id, { transaction });

      if (!genre) {
        await transaction.rollback();
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Genre not found",
          data: null,
          error: "Not Found",
        });
      }

      await genre.update(
        { name },
        { transaction }
      );

      await transaction.commit();
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Genre updated successfully",
        data: { genre },
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
    console.log(req.files);
    
    const transaction = await sequelize.transaction();

    try {
      const { name } = req.body;

      const genre = await Genres.create(
        { name },
        { transaction }
      );

      await transaction.commit();
      return res.status(201).json({
        status: 201,
        success: true,
        message: "New Genre created",
        data: { genre },
        error: null,
      });
    } catch (error) {
      await transaction.rollback();
      console.error("Error creating genre:", error);
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
      const genre = await Genres.findByPk(id, { transaction });
  
      if (!genre) {
        await transaction.rollback();
        return res.status(404).json({
          status: 404,
          success: false,
          message: "Genre not found",
          data: null,
          error: "Not Found",
        });
      }

      await Genres.destroy({ where: { id }, transaction });
  
      await transaction.commit();
  
      return res.status(200).json({
        status: 200,
        success: true,
        message: "Genre deleted successfully",
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

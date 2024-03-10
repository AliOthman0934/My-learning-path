const express = require("express");
const movieController = require("../controller/movieController");
const movieRoute = express.Router();

movieRoute.route("/")
    .get(movieController.getMovies)
    .post(movieController.createMovie)

movieRoute.route("/:id")
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie)

module.exports = movieRoute ;
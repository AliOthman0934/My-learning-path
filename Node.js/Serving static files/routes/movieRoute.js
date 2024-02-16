const express = require("express");
const movieController = require("../controller/movieController");
const movieRoute = express.Router();
movieRoute.param("id", movieController.checkId);

movieRoute.route("/")
    .get(movieController.getMovies)
    .post(movieController.validatBody,movieController.createMovie)

movieRoute.route("/:id")
    .get(movieController.getMovie)
    .patch(movieController.updateMovie)
    .delete(movieController.deleteMovie)

module.exports = movieRoute ;
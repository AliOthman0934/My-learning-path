const { query } = require("express");
const Movie = require("../modles/movieModle");

exports.getMovies = async (req, res) => {
    try {
        let queryStr = JSON.stringify(req.query);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => {
            return `$${match}`
        })
        const queryObj = JSON.parse(queryStr);

        const query = Movie.find(queryObj);

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            query = query.sort(sortBy);
        } else {
            query = query.sort("-createdAt")
        }

        const movie = await query;
        res.status(200).json({
            status: "success",
            length: movie.length,
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }

};

exports.createMovie = async (req, res) => {
    try {
        const movie = await Movie.create(req.body);
        res.status(201).json({
            status: "success",
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

};

exports.getMovie = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);
        res.status(200).json({
            status: "success",
            length: movie.length,
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }

};

exports.updateMovie = async (req, res) => {
    try {
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidetors: true });
        res.status(200).json({
            status: "success",
            data: {
                movie: updateMovie
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }

};

exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            data: null
        })

    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })

    }
};
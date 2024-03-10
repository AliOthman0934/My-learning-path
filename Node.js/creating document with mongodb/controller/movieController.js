const Movie = require("../modles/movieModle");

exports.getMovies = (req, res) => {

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

exports.getMovie = (req, res) => {

};

exports.updateMovie = (req, res) => {

};

exports.deleteMovie = async(req, res) => {
    try{
        await Movie.findByIdAndDelete(req.params.id)
        res.status(204).json({
            status: "success",
            data: null
        })

    }catch(err){
        res.status(404).json({
            status: "fail",
            message: err.message
        })

    }
};
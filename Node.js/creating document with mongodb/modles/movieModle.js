const mongoose = require("mongoose");


const movieSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required filed"],
        unique: true
    },

    description: String,

    duration: {
        type: Number,
        required: [true, "duration is required filed"]
    },

    rating: {
        type: Number,
        default: 1.0
    },

});

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie
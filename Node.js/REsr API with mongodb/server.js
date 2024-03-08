const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = require("./app");

console.log(process.env);

mongoose.connect(process.env.CONN_STR, {
})
    .then(() => {
        console.log("DB connection successful")
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

const movieSchema =  mongoose.Schema({
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

const movieModel = mongoose.model("movie", movieSchema); 

const port = 3000;

app.listen(port, () => {
    console.log("server has started...")
})


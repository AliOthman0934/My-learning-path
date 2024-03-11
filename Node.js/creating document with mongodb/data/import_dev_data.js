const mongoose = require("mongoose");
const dotenv = require("dotenv");
const fs = require ("fs");
const movie = require ("../modles/movieModle");

dotenv.config({ path: "../config.env" });

mongoose.connect(process.env.CONN_STR, {
})
    .then(() => {
        console.log("DB connection successful")
    })
    .catch((error) => {
        console.error("Error connecting to the database:", error);
    });

const movies = JSON.parse(fs.readFileSync("./data/movies.json", "utf-8"))
console.log(movies);

const deleteMovies = async ()=>{
    try{
        await movie.deleteMany();
        console.log("Data sucessfully deleted")
    }catch(err){
        console.log(err.message)
    }
    process.exit();
};

const importMovie = async ()=>{
    try{
        await movie.create(movies);
        console.log("Data sucessfully imported")
    }catch(err){
        console.log(err.message)
    }
    process.exit();
};

console.log(process.argv);

if(process.argv[2] === "--import"){
    importMovie();
};

if(process.argv[2] === "--delete"){
    deleteMovies();
};
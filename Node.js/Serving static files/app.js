const express = require("express");
const moviesRoute = require("./routes/movieRoute");
const app = express();


app.use(express.json());
app.use(express.static("./public"));
// const movieRoute = express.Router();

app.use("/api/v1/movies", moviesRoute)

app.use((req,res,next)=>{
    req.requestedAt = new Date().toISOString();
    next();
})





module.exports = app



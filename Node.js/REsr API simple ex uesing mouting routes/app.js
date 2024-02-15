const express = require("express");
const moviesRoute = require("./routes/movieRoute");
const app = express();


app.use(express.json());

// const movieRoute = express.Router();

app.use("/api/v1/movies", moviesRoute)

app.use((req,res,next)=>{
    req.requestedAt = new Date().toISOString();
    next();
})

const port = 3000;

app.listen(port, () => {
    console.log("server has started...")
})

// module.exports = app



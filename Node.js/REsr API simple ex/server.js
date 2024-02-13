import { error } from "console";
import express, { json } from "express";
import fs from "fs"

const app = express();
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "UTF-8"));
app.use(express.json());

app.use((req,res,next)=>{
    req.requestedAt = new Date().toISOString();
    next();
})

const getMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        requestedAt : req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    })
};

const createMovie = (req, res) => {
    const lastIndexId = movies[movies.length - 1].id + 1;
    const newIndex = Object.assign({ id: lastIndexId }, req.body);

    movies.push(newIndex);

    fs.writeFile("./data/movies.json", JSON.stringify(movies), (error) => {
        res.status(201).json({
            status: "success",
            data: {
                movie: newIndex
            }
        })
    })
};

const getMovie = (req, res) => {
    const serchId = +req.params.id;
    let movie = movies.find(el => el.id === serchId);

    if (!movie) {
        return res.status(404).json({
            status: "fail",
            message: `movie with ID ${serchId} not found`
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    })
};

const updateMovie = (req, res) => {
    let id = +req.params.id;
    let movieToUpdate = movies.find(el => el.id === id);

    if (!movieToUpdate) {
        return res.status(400).json({
            status: "fail",
            message: `movie with ID ${id} is not found`

        })
    }

    let index = movies.indexOf(movieToUpdate);
    Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

    fs.writeFile("./data/movies.json", JSON.stringify(movies), (error) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
            }
        })
    })
};

const deleteMovie = (req, res) => {
    const id = +req.params.id;
    const movieToDelete = movies.find(el => el.id === id);

    if (!movieToDelete) {
        return res.status(400).json({
            status: "fail",
            message: `the movie with ID ${id} is not found`
        })

    }

    const index = movies.indexOf(movieToDelete);
    movies.splice(index, 1);

    fs.writeFile("./data/movies.json", JSON.stringify(movies), (error) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })
};

// app.get("/api/v1/movies", getMovies);

// app.post("/api/v1/movies", createMovie);

// app.get("/api/v1/movies/:id", getMovie);

// app.patch("/api/v1/movies/:id", updateMovie);

// app.delete("/api/v1/movies/:id", deleteMovie);


app.route("/api/v1/movies")
    .get(getMovies)
    .post(createMovie)

app.route("/api/v1/movies/:id")
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie)


const port = 3000;

app.listen(port, () => {
    console.log("server has started...")
})



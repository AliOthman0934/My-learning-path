import { error } from "console";
import express, { json } from "express";
import fs from "fs"

const app = express();
const movies = JSON.parse(fs.readFileSync("./data/movies.json", "UTF-8"));
app.use(express.json());

app.get("/api/v1/movies", (req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: {
            movies: movies
        }
    })
});

app.post("/api/v1/movies", (req, res) => {
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
});

app.get("/api/v1/movies/:id", (req, res) => {
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
});

app.patch("/api/v1/movies/:id", (req, res) => {
    let id = +req.params.id;
    let movieToUpdate = movies.find(el => el.id === id);

    if (!movieToUpdate) {
        return res.status(400).json({
            status: "fail",
            message: `movie with ID ${id} is not found`

        })
    }

    let index = movies.indexOf(movieToUpdate);
    console.log(index);
    Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

    fs.writeFile("./data/movies.json", JSON.stringify(movieToUpdate), (error) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
            }
        })
    })

})
const port = 3000;

app.listen(port, () => {
    console.log("server has started...")
})



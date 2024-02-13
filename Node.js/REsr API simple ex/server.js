import { error } from "console";
import express from "express";
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

app.get("/api/v1/movies/:id",(req,res)=>{
    const serchId = +req.params.id ;
    let movie = movies.find(el => el.id === serchId);

    if(!movie){
        return res.status(404).json({
            status : "fail",
            message : `movie with ID ${serchId} not found`
        })
    }

    res.status(200).json({
        status : "success",
        data : {
            movie : movie
        }
    })
})
const port = 3000;

app.listen(port, () => {
    console.log("server has started...")
})



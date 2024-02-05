import express from "express"
import studenRouter from "./routes/students.js"
const app =express();

app.get("/",(req,res)=>{
    res.send("Hallo from server")
})
app.use(express.json());
app.use("/student",studenRouter);


app.listen("3000",()=>{
    console.log("Server is listening on prot 3000")
})

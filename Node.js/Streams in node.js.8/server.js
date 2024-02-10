import {fs} from "fs";
import {createServer, http} from "http";


const server = http.createServer();
server.listen(8000,'127.0.0.1',()=>{
    console.log("server has started ")
})


server.on("request",(req,res)=>{
    fs.readfile("./test.txt",(err,data)=>{
        if(err){
            res.end("somthing went wrong")
            return;
        }
        res.end(data);
    })
})
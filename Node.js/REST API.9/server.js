import { error } from "console";
import {fs} from "fs";
import {createServer, http} from "http";


// const server = http.createServer();
// server.listen(8000,'127.0.0.1',()=>{
//     console.log("server has started ")
// })


// server.on("request",(req,res)=>{
//     fs.readfile("./test.txt",(err,data)=>{
//         if(err){
//             res.end("somthing went wrong")
//             return;
//         }
//         res.end(data);
//     })
// })

// const server = http.createServer();
// server.listen(8000,"127.0.0.1",()=>{
//     console.log("server has started on port 8000")
// })

// server.on("request",(req,res)=>{
//     let rs = fs.creatReadStream("./test.txt");
    
//     res.on("data",(chunk)=>{
//         res.write(chunk);
//     })

//     res.on("end",()=>{
//         res.end();
//     })

//     res.on("error",(error)=>{
//         res.end(error.message);
//     })
// })


const server = http.createServer();

server.listen(8000,"127.0.0.1",()=>{
    console.log("server has sarted");
});

server.on("request",(req,res)=>{
    let rs = fs.creatReadStream("./test.txt");
    res.pipe(res);
});


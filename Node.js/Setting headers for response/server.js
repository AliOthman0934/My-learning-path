const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./index.html", "utf-8");

const server = http.createServer((req, res) => {
    let path = req.url;
    if (path === "/" || path.toLowerCase() === "/home") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%content%}}", "You are in home page"));
    } else if (path.toLowerCase() === "/products") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%content%}}", "You are in products page"));
    } else if (path.toLowerCase() === "/about") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%content%}}", "You are in about page"));
    } else if (path.toLowerCase() === "/contact") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%content%}}", "You are in contact page"));
    } else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end(html.replace("{{%content%}}", "Error 404: page not found"));
    }
});

server.listen(3000, "", () => {
    console.log("Server started on port 3000");
});

const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./index.html", "utf-8");

const server = http.createServer((req, res) => {
    let path = req.url;
    if (path === "/" || path.toLowerCase() === "/home") {
        res.end(html.replace("{{%content%}}", "You are in Home page"));
    } else if (path.toLocaleLowerCase() === "/products") {
        res.end(html.replace("{{%content%}}", "You are in Products page"));
    } else if (path.toLocaleLowerCase() === "/about") {
        res.end(html.replace("{{%content%}}", "You are in About page"));
    } else if (path.toLocaleLowerCase() === "/contact") {
        res.end(html.replace("{{%content%}}", "You are in Contact page"));
    } else {
        res.end(html.toLocaleLowerCase().replace("{{%content%}}", "Page not found"));
    }
});

server.listen(3000, "", () => {
    console.log("Server has started on port 3000");
});

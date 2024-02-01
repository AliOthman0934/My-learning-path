const fs = require("fs");
const http = require("http");

const html = fs.readFileSync("./index.html", "utf-8");
let productsJson = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
let productsHtml = fs.readFileSync("./products.html", "utf-8");

let productsArray = productsJson.map((product) => {
    let output = productsHtml.replace('{{%IMAGE%}}', product.productImage);
    output = output.replace('{{%NAME%}}', product.name);
    output = output.replace('{{%MODELNAME%}}', product.modeName);
    output = output.replace('{{%MODELNO%}}', product.modelNumber);
    output = output.replace('{{%SIZE%}}', product.size);
    output = output.replace('{{%CAMERA%}}', product.camera);
    output = output.replace('{{%PRICE%}}', product.price);
    output = output.replace('{{%COLOR%}}', product.color);
    output = output.replace('{{%ID%}}', product.id);
    output = output.replace('{{%ROM%}}', product.ROM);
    output = output.replace('{{%DESC%}}', product.Description);

    return output;
});

const server = http.createServer((req, res) => {
    let path = req.url;

    if (path === "/" || path.toLowerCase() === "/home") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%CONTENT%}}", "You are in home page"));
    } else if (path.toLowerCase() === "/products") {
        let myProduct = productsArray.join("");
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%CONTENT%}}", myProduct));
    } else if (path.toLowerCase() === "/about") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%CONTENT%}}", "You are in about page"));
    } else if (path.toLowerCase() === "/content") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%CONTENT%}}", "You are in content page"));
    } else {
        res.writeHead(404, { "content-type": "text/html" });
        res.end(html.replace("{{%CONTENT%}}", "Error 404: page not found"));
    }
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});

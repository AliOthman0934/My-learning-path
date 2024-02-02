const readline = require('readline');
const fs = require("fs");
const http = require("http");
const url = require("url");


const productsDetails = fs.readFileSync("./products-details.html", "utf-8");
const html = fs.readFileSync("./index.html", "utf-8");
let productsJson = JSON.parse(fs.readFileSync('./products.json', 'utf-8'))
let productsHtml = fs.readFileSync("./products.html", "utf-8");

// let productsArray = productsJson.map((product) => {
//     let output = productsHtml.replace('{{%IMAGE%}}', product.productImage);
//     output = output.replace('{{%NAME%}}', product.name);
//     output = output.replace('{{%MODELNAME%}}', product.modeName);
//     output = output.replace('{{%MODELNO%}}', product.modelNumber);
//     output = output.replace('{{%SIZE%}}', product.size);
//     output = output.replace('{{%CAMERA%}}', product.camera);
//     output = output.replace('{{%PRICE%}}', product.price);
//     output = output.replace('{{%COLOR%}}', product.color);
//     output = output.replace('{{%ID%}}', product.id);
//     output = output.replace('{{%ROM%}}', product.ROM);
//     output = output.replace('{{%DESC%}}', product.Description);


//     return output;
// });

function replaceContent(htmlPage, product) {
    let output = htmlPage.replace('{{%IMAGE%}}', product.productImage);
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
}

const server = http.createServer((req, res) => {

    let { query, pathname: path } = url.parse(req.url, true);

    if (path === "/" || path.toLowerCase() === "/home") {
        res.writeHead(200, { "content-type": "text/html" });
        res.end(html.replace("{{%CONTENT%}}", "You are in home page"));
    } else if (path.toLowerCase() === "/products") {
        if (!query.id) {
            let productsArray = productsJson.map((prod) => {
                return replaceContent(productsHtml, prod)
            })
            let myProduct = productsArray.join("");
            res.writeHead(200, { "content-type": "text/html" });
            res.end(html.replace("{{%CONTENT%}}", myProduct));
        } else {
            let productId = productsJson[query.id];
            console.log(productId)
            let productResponseHtml = replaceContent(productsDetails, productId);
            res.end(html.replace("{{%CONTENT%}}", productResponseHtml))
        }
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

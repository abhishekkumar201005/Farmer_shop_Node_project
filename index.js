
//--------------REQUIRE FILES-------
const fs = require("fs");
const http = require("http");
const url = require("url");

//import local module
const replTemplate = require("./modules/replaceTemplate");

// Global Decln
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

//data extract from file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const dataObj = JSON.parse(data);

//main code
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  //Overview Page
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });
    const cardHtml = dataObj.map((el) => replTemplate(tempCard, el)).join("");
    const output = tempOverview.replace("{%prod_card_fig}", cardHtml);
    res.end(output);
    // Product Page
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });
    const product = dataObj[query.id];
    const output = replTemplate(tempProduct, product);
    res.end(output);
    //Not Found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>Page not found </h1>");
  }
});
server.listen(8000, () => {
  //when server start listening
  console.log("server start");
});

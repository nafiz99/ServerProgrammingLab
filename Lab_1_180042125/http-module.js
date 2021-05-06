const http = require("http");
const load = require("./loadContents");

const server = http.createServer((req, res) => {
  // console.log(req);
  //res.writeHead(205, { "Content-Type": "text/plain" });
  if (req.url == "/") {
    res.write(load.index);
  } else if (req.url == "/about") {
    res.write(load.about);
  } else if (req.url == "/blog") {
    res.write(load.blog);
  } else if (req.url == "/contact") {
    res.write(load.contact);
  } else if (req.url == "/pricing") {
    res.write(load.pricing);
  } else if (req.url == "/services") {
    res.write(load.services);
  } else if (req.url == "/work") {
    res.write(load.work);
  } else {
    res.write("<h1>This page does not exist</h1>");
  }
  res.end();
});

module.exports = { server };

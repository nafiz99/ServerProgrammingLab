const http = require("http");

const server = http.createServer((req, res) => {
  // console.log(req);
  //res.writeHead(205, { "Content-Type": "text/plain" });
  if(req.url=='/'){
    res.write('<h1>This is the base URL</h1>');
  }
  else if(req.url=='/home'){
    res.write('<h1>This is home page</h1>');
  }
  else{
    res.write('<h1>This page doesnt exist</h1>');
  }
  res.end();
});

//server.listen(7777);
module.exports = { server };

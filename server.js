// /* Import node's http module: */
// var http = require('http');
// var fs = require('fs');
var requestHandler = require('./server/request-handler.js');


// var server = http.createServer(requestHandler.handleRequest);
// server.listen(port);

var port = process.env.port || 1337;

var http = require('http'),
    url = require('url'),
    path = require('path'),
    fs = require('fs');
var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "js": "text/javascript",
    "css": "text/css"};

http.createServer(function(req, res) {
    var uri = url.parse(req.url).pathname;
    var filename = path.join(process.cwd(), uri);

    path.exists(filename, function(exists) {
      console.log(exists);
      if(!exists) {
        console.log('i:' + filename);
        requestHandler.handleRequest(req, res);
        return;
      } else if (uri === '/') {
        filename += 'client/index.html'
      } else if (uri.substr(0,7) === 'client/' {
        filename = process.cwd();
        filename = filename.substr(7);
      }
      console.log('o:' + filename);

      var mimeType = mimeTypes[path.extname(filename).split(".")[1]];
      res.writeHead(200, mimeType);

      var fileStream = fs.createReadStream(filename);
      fileStream.pipe(res);

    }); //end path.exists
}).listen(port);

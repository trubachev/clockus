var static = require('node-static');

var fileServer = new static.Server('./dist');

var port = process.env.PORT || 3005

console.log(port)
require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(port);

var fs = require('fs');
var http = require('http');
var url = require('url');
var ROOT_DIR = "/home/ec2-user/cs360/weather/";

http.createServer(function (req, res) {
  console.log("HTTP Request Received!");

  var urlObj = url.parse(req.url, true, false);
  if (urlObj.pathname.toLowerCase().indexOf("getcity") != -1) {

    fs.readFile(ROOT_DIR + "cities.txt", function (err, data) {
      if (err) {
        throw err;
      }

      var queryCity = urlObj.query.q;
      var cities = data.toString().split("\n");

      var preJSON = [];

      cities.forEach(function(city) {
        if (city.toLowerCase().indexOf(queryCity.toLowerCase()) == 0) {
          console.log("PICKED: " + city);
          preJSON.push(city.toString());
        };
      });

      res.writeHead(202);
      res.end(JSON.stringify(preJSON));
    });
  }
  else {
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err,data) {
      if (err) {
        res.writeHead(404);
        console.log("HTTP FAILED!");
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }
}).listen(80);

// // HTTP CLIENT //
// var options = {
//     hostname: 'localhost',
//     port: '80',
//     path: '/hello.html'
//   };
// function handleResponse(response) {
//   var serverData = '';
//   response.on('data', function (chunk) {
//     serverData += chunk;
//   });
//   response.on('end', function () {
//     console.log(serverData);
//   });
// }
// http.request(options, function(response){
//   handleResponse(response);
// }).end();
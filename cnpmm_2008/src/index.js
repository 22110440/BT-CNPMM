var express = require('express');
var app = express();
// Phuong thuc get() phan hoi mot GET Request
app.get('/', function (req, res) {
console.log("GET Request");
res.send('<h1>Hello world</h1>');
});
var server = app.listen(3000, function () {
var host = server.address().address
var port = server.address().port
console.log("http://%s:%s", host, port);
});

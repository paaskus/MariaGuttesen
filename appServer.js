var express = require('express');
var app = express();
var path = require('path');

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host: "+host);
    console.log("port: "+port);

    console.log('Example app listening at http://%s:%s', host, port);
});

// make public access to bower_components
app.use("/bower", express.static("bower_components"));

// make public access to frontend files
app.use("/public", express.static("public"));

/* CONSTANTS */
var constants = require('./constants');

/* EXPRESS VARS */
var express = require('express');
var app = express();
var path = require('path');

/* MONGODB VARS */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');

var url = constants.DATABASE_URI;

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});

// viewed at http://localhost:3000
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});

var server = app.listen(constants.server.PORT, constants.server.HOST, function callback() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host: "+host);
    console.log("port: "+port);

    console.log('Example app listening at http://%s:%s', host, port);
});

// make public access to bower_components
app.use("/lib", express.static("bower_components"));

// make public access to frontend assets
app.use("/assets", express.static("assets"));

var express = require('express');
var app = express();
var uploadRoutes = express.Router();

var http = require('http'),
  path = require('path'),
  os = require('os'),
  fs = require('fs');

var Busboy = require('busboy');

uploadRoutes.route('/image').post(function (req, res) {
  if (req.headers['token'] == undefined) {
    res.json({ "error": "No header present" });
    return;
  }
  var busboy = new Busboy({ headers: req.headers });
  const now = new Date()
  var ts = Math.round(now.getTime() / 1000) + "_";
  busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
    ts += filename;
    file.pipe(fs.createWriteStream("src/resources/images/todos/" + ts));
  });
  busboy.on('finish', function () {
    res.writeHead(200, { 'Connection': 'close' });
    res.end(ts);
  });
  return req.pipe(busboy);
});



module.exports = uploadRoutes;
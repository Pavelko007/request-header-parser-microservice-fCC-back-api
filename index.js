// index.js
// where your node app starts

// init project
require("dotenv").config();
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/whoami", function (req, res) {
  //get ip address
  var os = require("os");
  var ip = "0.0.0.0";
  var ips = os.networkInterfaces();
  Object.keys(ips).forEach(function (_interface) {
    ips[_interface].forEach(function (_dev) {
      if (_dev.family === "IPv4" && !_dev.internal) ip = _dev.address;
    });
  });
  //get a language
  var languages = req.headers["accept-language"];
  var mostCommonLanguage;
  if (languages) {
    var languages = languages.split(":");
    mostCommonLanguage = languages[0].split(",")[0];
  } else mostCommonLanguage = "en-US";

  res.json({ ipaddress: ip, language: mostCommonLanguage });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});

// server.js
// set up ========================
var express = require("express");
var app = express();
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var nodemailer = require("nodemailer");
var multer = require("multer");

app.use(function (req, res, next) {
  //allow cross origin requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Max-Age", "3600");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
  );
  next();
});
// configuration
app.use(express.static(__dirname + "/public")); // set the static files location /public/img will be /img for users
app.use("/public/uploads", express.static(__dirname + "/public/uploads"));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "50mb" })); // log every request to the console
app.use(bodyParser.urlencoded({ limit: "50mb", extended: "true" })); // parse application/x-www-form-urlencoded                                // parse application/json
app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json

var transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "kr977322@gmail.com",
    pass: "Kajal@123",
  },
});

/** API for sending mail */
app.post("/api/sentmail", function (req, res) {
  var msg = {
    html: "<b>Hello!</b><p>Mail sent working</p>.",
    createTextFromHtml: true,
    from: "<kr977322@gmail.com>",
    to: "<kr04022000@gmail.com>",
    subject: "Nodemail Credentials",
  };
  transport.sendMail(msg, function (err) {
    if (err) {
      return;
    }
    return res.json({
      successMessage: "Credentials has been sent to your Email.",
    });
  });
});

app.listen(process.env.PORT || 9000, function () {
  console.log("App listening on port 9000");
});

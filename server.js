require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const request = require('request');
const nodemailer = require('nodemailer');
const base64url = require('base64-url');

app.use("/", express.static(__dirname + '/build'));
var port = process.env.PORT || 3000;

const pass = process.env.GMAIL;

const transporter = nodemailer.createTransport("smtps://bearyourhartmann%40gmail.com:"+pass+"@smtp.gmail.com")

const mailOptions = {
  from: '"Your Loyal Server" <front@bearyourhartmann.com>',
  to: 'bearyourhartmann@gmail.com',
  subject: 'Bus Form Update',
  text: "Hello world",
  html: '<h1>Hello World!</h1>'
};


app.use(function(err, req, res, next){
  res.status(err.status || 500);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, function () {
  console.log('this is the port: ', port);
  console.log('mail server now online!');
});

app.post("/formupload", function(req, res){
  console.log("this is the request body:", req.body)

  mailOptions.text = req.body.textarea;
  mailOptions.html = req.body.textarea;

  transporter.sendMail(mailOptions, function(error, info){
    if (error){
      return console.log("this is the error:", error);
    }
    console.log('Message sent: ' + info.response);
  });
  res.redirect('http://localhost:9292/message')
})

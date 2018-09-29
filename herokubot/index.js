const Discord = require("discord.js");
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`bot is online`);
});

client.login('***************');

var express = require('express');
var app = express();
app.use(express.static('public'));

app.get("/", function (request, response) {
  response.send('hi');
});

//your bot will respond to the words "ramen" and "sigh"
const responseObject = {
  "ramen": "noodles",
  "sigh": "u okay?"
};

client.on('message', msg => {
  if (!msg.author.bot) {
    if (responseObject[msg.content]) {
      msg.channel.send(responseObject[msg.content]);
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log(listener.address().port);
});

//if you want you bot to be responsive 24/7 uncomment the block and replace 'nameofyourherokuapp' with the app name you chose when you typed 'heroku create'

/*
var http = require("http");
setInterval(function() {
    http.get("http://nameofyourherokuapp.herokuapp.com");
}, 100000);
*/

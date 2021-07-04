//the only lines you need to edit are line 34 and line 38

var Discord = require("discord.js");
var client = new Discord.Client();

var express = require('express');
var app = express();

var ffmpeg = require('ffmpeg');
var music = require('discord.js-music-v11');
var fs = require('fs');
var ytdl = require('ytdl-core');
var glob = require("glob");
var opus = require("node-opus");
const { getInfo } = require('ytdl-getinfo');

app.use(express.static('public'));

app.get("/", function (request, response) {
  response.send('will black tea do?');
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  client.user.setActivity('say hat#help');
  client.user.setAvatar('./img/hatter.png').catch(console.error);
  client.user.setUsername('hatter').catch(console.error);
});

client.on('error', console.error);

music(client);

client.login('*'); //replace star with bot token

var https = require("https");
setInterval(function() {
    https.get("https://google.com"); //replace google.com with your app's url if you're hosting it online
    console.log("hatter is running");
}, 60000);

var dispatcher;
var stream;
var mee;
var embed;
var audioname;
var queuesong;
var queuelist = [];
var nqueuelist = [];
var queuecount = 0;
var ytsongname;
var textqueue;
var voicie;
var tracklist = "";
var trackname;
var audiopath;
var i;
var a_string;
var pocom;
var playlist = [];
var newlistname;
var i;
var eF = 0;
var listoflist = "";
var stringylist;
var listcheck;
var addy;
var toaddto;
var streamname;
var numm;
var toplaylist;
var playarray;
var selfstart;
var queueplaysong;
var playlistchan;
var deletie;
var nobigembed;
var posInt;
var isNum;
var hasDeci;
var checklistlength;

fs.readFile('playlist.txt', 'utf8', function(err, contents) {
  playlist = JSON.parse(contents);
  if (err){
    console.log(err);
  }
  else {
    for (i = 0; i < playlist.length; i++) {
      listcheck = playlist[i].split("--:::-$$-:::--");
      listoflist += listcheck[0]+ "\n\n";
    }
  }
});

function checkFileExistsSync(filepath){
  let flag = true;
  try{
    fs.accessSync(filepath, fs.F_OK);
  }
  catch(error){
    flag = false;
  }
  return flag;
}

function embeddy(x,y) {
  embed = new Discord.RichEmbed()
  .setDescription(x)
  .setColor(0x991551)
  y.send({embed}).catch(console.error);
}

client.on('message', msg => {

  if ((msg.content.includes("#") && !msg.content.includes("--:::-$$-:::--")) || msg.author.bot) {
    pocom = msg.content.toLowerCase();
    mee = msg.guild.me;

    //hat#pause
    if (pocom == "hat#pause") {
      if (mee.voiceChannel && !dispatcher.paused) {
        dispatcher.pause();
      }
    }

    //hat#resume
    else if (pocom == "hat#resume") {
      if (mee.voiceChannel && dispatcher.paused) {
        dispatcher.resume();
      }
    }

    //hat#np
    else if (pocom == "hat#np") {
      if (mee.voiceChannel && dispatcher.stream) {
        if (audioname.includes("https://youtu") || audioname.includes("https://www.youtu") || audioname.includes("https://m.youtu") || audioname.includes("https://www.m.youtu")) {
          a_string = "now playing " + streamname;
          embeddy(a_string,msg.channel);
        }
        else {
          a_string = "now playing " + audioname;
          embeddy(a_string,msg.channel)
        }
      }
      else {
        embeddy("not playing anything",msg.channel)
      }
    }

    //hat#skip
    else if (pocom == "hat#skip") {
      if (mee.voiceChannel && queuelist.length != 0) {
        dispatcher.end();
      }
      else if (mee.voiceChannel && queuelist.length == 0) {
        embeddy("there aren't any songs left to skip",msg.channel)
      }
    }

    //hat#tracks
    else if (pocom == "hat#tracks") {
      var getDirectories = function (src, callback) {
        glob(src + '/**/*', callback);
      };
      getDirectories('music', function (err, res) {
        if (err) {
          console.log('Error', err);
        } else {
          for (i = 0; i < res.length; i++) {
            trackname = res[i].slice(6);
            tracklist += trackname + "\n";
          }
          if (tracklist.length < 4) {
            embeddy("no tracks found",msg.channel);
          }
          else if (tracklist.length < 2046) {
            embeddy(tracklist,msg.channel);
            fs.writeFile('tracklist.txt', tracklist, function(err) {
              if (err){
                console.log(err);
              }
            });
            tracklist = "";
          }
          else {
            fs.writeFile('tracklist.txt', tracklist, function(err) {
              if (error){
                console.log(error);
              } else {
                msg.channel.send({file: "tracklist.txt"}).catch(console.error);
              }
            });
            tracklist = "";
          }
        }
      });
    }

    //hat#dc
    else if (pocom == "hat#dc") {
      if (msg.member.voiceChannel) {
        voicie = msg.member.voiceChannel;
        queuelist = [];
        nqueuelist = [];
        voicie.leave();
      }
    }

    //hat#clearq
    else if (pocom == "hat#clearq") {
      queuelist = [];
      nqueuelist = [];
      embeddy("the queue's been cleared",msg.channel);
    }

    //hat#showq
    else if (pocom == "hat#showq") {
      if (queuelist.length != 0) {
        textqueue = nqueuelist.join("\n");
        embeddy(textqueue,msg.channel);
      }
      else {
        embeddy("the queue's empty",msg.channel);
      }
    }

    //hat#start [playlistname]
    else if (pocom.startsWith("hat#start ")) {
      toplaylist = msg.content.slice(10);
      if (msg.member.voiceChannel) {
        playlistchan = msg.member.voiceChannel;
        if (playlist.length == 0) {
          embeddy("you don't have any playlists to start",msg.channel);
        }
        else {
          for (i = 0; i < playlist.length; i++) {
            listcheck = playlist[i].split("--:::-$$-:::--");
            if (listcheck[0] == toplaylist) {
              eF = 1;
              numm = i;
              break;
            }
          }
          if (eF == 1) {
            eF = 0;
            queuelist = [];
            nqueuelist = [];
            if (mee.voiceChannel) {
              mee.voiceChannel.leave();
            }
            playarray = playlist[numm].split("--:::-$$-:::--");
            if (playarray.length > 1) {
              if (playarray[1].startsWith("https://www.")) {
                nobigembed = playarray[1].slice(12);
                playarray[1] = nobigembed;
              }
              else if (playarray[1].startsWith("https://")) {
                nobigembed = playarray[1].slice(8);
                playarray[1] = nobigembed;
              }
              selfstart = "playlist has been queued... loading first track: " + playarray[1];
              queuelist = [];
              nqueuelist = [];
              for (i = 2; i < playarray.length; i++) {
                if (queuelist.length == "0") {
                  queuelist[0] = playarray[i];
                  nqueuelist[0] = playarray[i];
                }
                else {
                  queuelist[queuelist.length] = playarray[i];
                  nqueuelist[queuelist.length - 1] = playarray[i];
                }
              }
              queuelist.pop();
              nqueuelist.pop();
              msg.channel.send(selfstart);
            }
            else {
              embeddy("no tracks found in the playlist",msg.channel);
            }
          }
          else {
            eF = 0;
            embeddy("couldn't find that playlist... check the spelling or caps?",msg.channel);
          }
        }
      }
      else {
        embeddy("join a voice channel first",msg.channel);
      }
    }

    //hat#play [trackname] or [url]
    else if (pocom.startsWith("hat#play ") || (pocom.startsWith("loading from queue... ") && msg.author.bot) || (pocom.startsWith("playlist has been queued... loading first track: ") && msg.author.bot)) {
      if (!msg.member.voiceChannel && !pocom.startsWith("playlist has been queued... loading first track: ")) {
        embeddy("you have to be in a voice channel to command me",msg.channel);
      }
      else {
        if (pocom.startsWith("playlist has been queued... loading first track: ")) {
          audioname = msg.content.slice(49);
          voicie = playlistchan;
          client.user.lastMessage.delete();
          if (audioname.startsWith("youtu") || audioname.startsWith("m.youtu")) {
            audioname = "https://" + audioname;
          }
        }
        else if (pocom.startsWith("hat#play ") && queuelist.length != 0) {
          audioname = msg.content.slice(9);
          queuelist = [];
          nqueuelist = [];
          voicie = msg.member.voiceChannel;
        }
        else if (pocom.startsWith("hat#play ")) {
          audioname = msg.content.slice(9);
          voicie = msg.member.voiceChannel;
        }
        else {
          audioname = msg.content.slice(22);
          voicie = msg.member.voiceChannel;
          client.user.lastMessage.delete();
          if (audioname.startsWith("youtu") || audioname.startsWith("m.youtu")) {
            audioname = "https://" + audioname;
          }
        }
        if (mee.voiceChannel) {
          voicie.leave();
        }
        if (audioname.includes("http://")) {
          embeddy("please use https links, not http",msg.channel);
        }
        else if (!audioname.includes("https://youtu") && !audioname.includes("https://www.youtu") && !audioname.includes("https://www.m.youtu") && !audioname.includes("https://m.youtu") && !audioname.includes("youtube.com")) {
          audiopath = "./music/" + audioname;
          if (checkFileExistsSync(audiopath)) {
            a_string = "playing " + audioname;
            embeddy(a_string,msg.channel);
            voicie.join().then(connection => {
              dispatcher = connection.playStream(audiopath).on('error', function(error){
                voicie.leave();
                console.log(error);
                embeddy("problem trying to connect",msg.channel);
              });
              dispatcher.on("end", end => {
                if (queuelist.length != 0) {
                  msg.channel.send("loading from queue... " + queuelist[0]).catch(console.error);
                  queuelist.shift();
                  nqueuelist.shift();
                }
                else {
                  voicie.leave();
                }
              });
            }).catch((error) => {
              console.log(error);
              embeddy("problem trying to connect to voice channel",msg.channel)
            });
          }
          else {
            embeddy("can't find that file", msg.channel);
            if (queuelist.length != 0) {
              if (queuelist[0].includes("https://youtu")) {
                nobigembed = queuelist[0].slice(8);
                queuelist[0] = nobigembed;
              }
              else if (queuelist[0].includes("https://www.youtu")) {
                nobigembed = queuelist[0].slice(12);
                queuelist[0] = nobigembed;
              }
              else if (queuelist[0].includes("https://m.youtu")) {
                  nobigembed = queuelist[0].slice(10);
                  queuelist[0] = nobigembed;
                }
                else if (queuelist[0].includes("https://www.m.youtu")) {
                  nobigembed = queuelist[0].slice(14);
                  queuelist[0] = nobigembed;
                }
              msg.channel.send("loading from queue... " + queuelist[0]).catch(console.error);
              queuelist.shift();
              nqueuelist.shift();
            }
            else {
              voicie.leave();
            }
          }
        }
        else if (audioname.includes("https://youtu") || audioname.includes("https://www.youtu") || audioname.includes("https://www.m.youtu") || audioname.includes("https://m.youtu")) {
          try {
            let url = audioname;
            stream = ytdl(url);
            a_string = "playing " + audioname;
            getInfo(audioname).then(info => {
              streamname = info.items[0].title;
            }).catch((error) => {
              streamname = "youtube video: " + audioname;
            });
          }
          catch (err) {
            a_string = "i couldn't find that video... let's play something else";
            stream = ytdl("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
          }
          voicie.join().then(connection => {
            embeddy(a_string,msg.channel);
            dispatcher = connection.playStream(stream).on('error', function(error){
              voicie.leave();
              console.log(error);
              embeddy("problem trying to connect",msg.channel);
            });
            dispatcher.on("end", end => {
              if (queuelist.length != 0) {
                if (queuelist[0].includes("https://youtu")) {
                  nobigembed = queuelist[0].slice(8);
                  queuelist[0] = nobigembed;
                }
                else if (queuelist[0].includes("https://www.youtu")) {
                  nobigembed = queuelist[0].slice(12);
                  queuelist[0] = nobigembed;
                }
                else if (queuelist[0].includes("https://m.youtu")) {
                    nobigembed = queuelist[0].slice(10);
                    queuelist[0] = nobigembed;
                  }
                else if (queuelist[0].includes("https://www.m.youtu")) {
                  nobigembed = queuelist[0].slice(14);
                  queuelist[0] = nobigembed;
                }
                msg.channel.send("loading from queue... " + queuelist[0]).catch(console.error);
                queuelist.shift();
                nqueuelist.shift();
              }
              else {
                voicie.leave();
              }
            });
          }).catch((error) => {
            embeddy("problem trying to connect to voice channel",msg.channel);
          });
        }
      }
    }

    //hat#q [trackname] or [url]
    else if (pocom.startsWith("hat#q ")) {
      if (msg.member.voiceChannel && mee.voiceChannel) {
        queuesong = msg.content.slice(6);
        if (queuesong.includes("http://")) {
          embeddy("please use https:// links, not http://",msg.channel);
        }
        else if (queuesong.includes("https://")) {
          if (queuesong.startsWith("https://www.")) {
            nobigembed = queuesong.slice(12);
            queuesong = nobigembed;
          }
          else if (queuesong.startsWith("https://")) {
            nobigembed = queuesong.slice(8);
            queuesong = nobigembed;
          }
          getInfo("https://" + queuesong).then(info => {
            ytsongname = info.items[0].title;
            if (queuelist.length == "0") {
              queuelist[0] = queuesong;
              nqueuelist[0] = ytsongname;
              a_string = "queued " + ytsongname;
              embeddy(a_string,msg.channel);
            }
            else {
              queuelist[queuelist.length] = queuesong;
              nqueuelist[queuelist.length - 1] = ytsongname;
              a_string = "queued " + ytsongname;
              embeddy(a_string,msg.channel);
            }
          }).catch((error) => {
            embeddy("couldn't find that url", msg.channel);
          });
        }
        else {
          audiopath = "./music/" + queuesong;
          if (checkFileExistsSync(audiopath)) {
            if (queuelist.length == "0") {
              queuelist[0] = queuesong;
              nqueuelist[0] = queuesong;
              a_string = "queued " + queuesong;
              embeddy(a_string,msg.channel);
            }
            else {
              queuelist[queuelist.length] = queuesong;
              nqueuelist[queuelist.length - 1] = queuesong;
              a_string = "queued " + queuesong;
              embeddy(a_string,msg.channel);
            }
          }
          else {
            embeddy("can't find that file",msg.channel);
          }
        }
      }
      else if (msg.member.voiceChannel) {
        embeddy("my queue function only works if i'm already playing another track",msg.channel);
      }
      else {
        embeddy("you can't command me when you're not in a voice channel",msg.channel);
      }
    }

    //hat#create [playlistname]
    else if (pocom.startsWith("hat#create ")) {
      newlistname = msg.content.slice(11);
      if (/\s/g.test(newlistname) || newlistname.startsWith("http") || newlistname.length > 25) {
        embeddy("the playlist name cannot contain spaces, links, and must be under 25 characters",msg.channel);
      }
      else {
        if (playlist.length == 0) {
          playlist[0] = newlistname + "--:::-$$-:::--";
          a_string = "created playlist: " + newlistname;
          listoflist += newlistname + "\n\n";
          stringylist = JSON.stringify(playlist);
          fs.writeFile('playlist.txt', stringylist, function(err) { if (err){ console.log(err); } });
          embeddy(a_string,msg.channel);
        }
        else {
          for (i = 0; i < playlist.length; i++) {
            listcheck = playlist[i].split("--:::-$$-:::--");
            if (listcheck[0] == newlistname) {
              eF = 1;
            }
          }
          if (eF == 1) {
            eF = 0;
            embeddy("that list already exists",msg.channel);
          }
          else if (listoflist.length < 1900) {
            playlist[playlist.length] = newlistname + "--:::-$$-:::--";
            a_string = "created playlist: " + newlistname;
            listoflist += newlistname + "\n\n";
            stringylist = JSON.stringify(playlist);
            fs.writeFile('playlist.txt', stringylist, function(err) { if (err){ console.log(err); } });
            embeddy(a_string,msg.channel);
          }
          else {
            embeddy("you have too many playlists... try deleting one first",msg.channel);
          }
        }
      }
    }

    //hat#delete [playlistname]
    else if (pocom.startsWith("hat#delete ")) {
      newlistname = msg.content.slice(11);
      if (playlist.length == 0) {
        embeddy("you don't have any playlists yet",msg.channel);
      }
      else {
        for (i = 0; i < playlist.length; i++) {
          listcheck = playlist[i].split("--:::-$$-:::--");
          if (listcheck[0] == newlistname) {
            eF = 1;
            playlist.splice(i, 1);
            stringylist = JSON.stringify(playlist);
            fs.writeFile('playlist.txt', stringylist, function(err) { if (err){ console.log(err); } });
            break;
          }
        }
        if (eF == 1) {
          eF = 0;
          embeddy("deleted the list",msg.channel);
          listoflist = "";
          for (i = 0; i < playlist.length; i++) {
            listcheck = playlist[i].split("--:::-$$-:::--");
            listoflist += listcheck[0]+ "\n\n";
          }
        }
        else {
          eF = 0;
          embeddy("couldn't find that list",msg.channel);
        }
      }
    }

    //hat#playlists
    else if (pocom == "hat#playlists") {
      if (listoflist.length > 0) {
        embeddy(listoflist,msg.channel);
      }
      else {
        embeddy("no playlists found",msg.channel);
      }
    }

    //hat#display [playlistname]
    else if (pocom.startsWith("hat#display ")) {
      showlist = msg.content.slice(12);
      if (listoflist.length == 0) {
        embeddy("there aren't any playlists to show",msg.channel);
      }
      else {
        for (i = 0; i < playlist.length; i++) {
          listcheck = playlist[i].split("--:::-$$-:::--");
          if (listcheck[0] == showlist) {
            numm = i;
            eF = 1;
          }
        }
        if (eF == 1) {
          eF = 0;
          displaylist = playlist[numm].split("--:::-$$-:::--");
          displaylist2 = displaylist.join("\n\n");
          embeddy(displaylist2,msg.channel);
        }
        else {
          embeddy("couldn't find that list. check the spelling or capitalisation?",msg.channel);
        }
      }
    }

    //hat#add;playlistname;trackname or trackurl
    else if (pocom.startsWith("hat#add;")) {
      addy = msg.content.split(";");
      if (addy.length == 3) {
        if (listoflist.length == 0) {
          embeddy("there aren't any playlists to add songs to",msg.channel);
        }
        else {
          for (i = 0; i < playlist.length; i++) {
            listcheck = playlist[i].split("--:::-$$-:::--");
            if (listcheck[0] == addy[1]) {
              numm = i;
              eF = 1;
              break;
            }
          }
          if (eF == 1 && playlist[numm].length < 1900) {
            if (addy[2].includes("http://")) {
              embeddy("please use https:// links, not http://",msg.channel);
              eF = 0;
            }
            else if (addy[2].includes("https://")) {
              eF = 0;
              getInfo(addy[2]).then(info => {
                //ytsongname = info.items[0].title;
                playlist[numm] += addy[2] + "--:::-$$-:::--";
                a_string = "added " + addy[2] + " to " + addy[1];
                stringylist = JSON.stringify(playlist);
                fs.writeFile('playlist.txt', stringylist, function(err) {
                  if (err){
                    console.log(err);
                    embeddy("error trying to save playlist",msg.channel)
                  }
                  else {
                    embeddy(a_string,msg.channel);
                  }
                });
              }).catch((error) => {
                embeddy("couldn't find that video", msg.channel);
              });
            }
            else {
              eF = 0;
              audiopath = "./music/" + addy[2];
              if (checkFileExistsSync(audiopath)) {
                playlist[numm] += addy[2] + "--:::-$$-:::--";
                a_string = "added " + addy[2] + " to " + addy[1];
                stringylist = JSON.stringify(playlist);
                fs.writeFile('playlist.txt', stringylist, function(err) {
                  if (err){
                    console.log(err);
                    embeddy("error trying to save playlist",msg.channel)
                  }
                  else {
                    embeddy(a_string,msg.channel);
                  }
                });
              }
              else {
                eF = 0;
                embeddy("can't find that file",msg.channel);
              }
            }
          }
          else if (eF == 1 && playlist[numm].length > 1900) {
            embeddy("this playlist is already too long, try removing some songs first",msg.channel);
            eF = 0;
          }
          else {
            embeddy("couldn't find that playlist. use `hat#create` to make one.",msg.channel);
          }
        }
      }
    }

    //hat#rm;playlistname;tracknumber
    else if (pocom.startsWith("hat#rm;")) {
      addy = msg.content.split(";");

      posInt = Number(addy[2]);
      isNum = isNaN(posInt);
      hasDeci = addy[2].includes(".");

      if (addy.length == 3) {
        if (listoflist.length == 0) {
          embeddy("there aren't any playlists",msg.channel);
        }
        else {
          for (i = 0; i < playlist.length; i++) {
            listcheck = playlist[i].split("--:::-$$-:::--");
            if (listcheck[0] == addy[1]) {
              numm = i;
              eF = 1;
              break;
            }
          }
          checklistlength = playlist[numm].split("--:::-$$-:::--");
          if (eF == 1 && isNum == false && hasDeci == false && addy[2] > 0 && posInt <= (checklistlength.length - 1 ) && checklistlength[posInt].length > 1) {
            deletie = playlist[numm].split("--:::-$$-:::--");
            deletie.splice(posInt, 1);
            playlist.pop();
            playlist[numm] = deletie.join("--:::-$$-:::--");
            a_string = "deleted track #" + addy[2];
            stringylist = JSON.stringify(playlist);
            fs.writeFile('playlist.txt', stringylist, function(err) { if (err){ console.log(err); } });
            embeddy(a_string,msg.channel);
          }
          else {
            embeddy("not found. please check your command.",msg.channel);
          }
        }
      }
    }

    //hat#help
    if (pocom == "hat#help") {
      embed = new Discord.RichEmbed()
      .setDescription("🍰 **setup**\n\n1) move your sound files to hatter's `music` directory to add them to his track list\n\n2) that's it\n\n🍵 **commands**\n\nto play audio:\n\n`hat#play filename.ext`\n\n(ex. hat#play sample.mp3)\n\n`hat#play https://youtubeURL`\n\nto view his track list:\n\n`hat#tracks`\n\nto see which track is currently playing:\n\n`hat#np`\n\nto pause, resume, and skip:\n\n`hat#pause`\n\n`hat#resume`\n\n`hat#skip`\n\nto queue a track:\n\n`hat#q filename.ext`\n\n`hat#q https://youtubeURL`\n\nto show the queue:\n\n`hat#showq`\n\nto clear the queue:\n\n`hat#clearq`\n\nto force disconnect:\n\n`hat#dc`\n\nto create a new playlist:\n\n`hat#create playlistname`\n\nto delete a playlist:\n\n`hat#delete playlistname`\n\nto view all playlists:\n\n`hat#playlists`\n\nto list the tracks in a playlist:\n\n`hat#display playlistname`\n\nto add a track to a playlist:\n\n`hat#add;playlistname;filename.ext`\n\n(ex. hat#add;HattersList;sample.mp3)\n\n`hat#add;playlistname;https://youtubeURL`\n\nto remove a tracks from a playlist:\n\n`hat#rm;playlistname;playlistposition`\n\n(ex: hat#rm;HattersList;2)\n\nto play a playlist:\n\n`hat#start playlistname`\n\nto view his help guide:\n\n`hat#help`\n\n🍭 [hatter's repo](https://github.com/niconicosette)")
      msg.channel.send({embed}).catch(console.error);
    }
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log(listener.address().port);
});

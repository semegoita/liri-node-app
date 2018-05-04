require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2];
var value = process.argv.slice(3);

switch (action) {
  case "my-tweets":
    getTwitter();
    break;

  case "spotify-this-song":
    if (process.argv.length < 4) {
      value = "The Sign"
    }
    getSpotify(value);
    break;

  case "movie-this":
    if (process.argv.length < 4) {
      value = "Mr Nobody"
    }
    getMovie();
    break;

  case "do-what-it-says":
    doIt();
    break;

}

function getTwitter() {
  var params = { screen_name: 'Seme Goita', count: 21 };
  client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        var tweetInfo = (
          "-----------------------------------------" +
          "\n @semegoita: " + tweets[i].text + "\n Created At: " + tweets[i].created_at +
          "\n-----------------------------------------");
        console.log(tweetInfo);

        // fs.appendFile("twitterLog.txt", tweetInfo, function(err) {
        //   if (err) {
        //     console.log(err);
        //   }
        
        // });

      }

    }
  });
}

function getSpotify(value) {
  spotify.search({ type: 'track', query: value }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    var song = data.tracks.items[0]
    var songInfo = (
      "-----------------------------------------" +
      "\r\n Artist(s): " + song.artists[0].name +
      "\r\n Song Title: " + song.name +
      "\r\n Preview Song: " + song.preview_url +
      "\r\n Album: " + song.album.name +
      "\r\n-----------------------------------------");
    console.log(songInfo);

    // fs.appendFile("spotifyLog.txt", songInfo, function(err) {

    //   if (err) {
    //     console.log(err);
    //   }
    
    //   else {
    //     console.log("Content Added to Text File!");
    //   }
    
    // });
  })
}

function getMovie() {

  request("http://www.omdbapi.com/?t=" + value + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    if (!error && response.statusCode === 200) {
      
      var movieInfo = (
        "-------------------------------------------" +
        "\n Movie Title: " + JSON.parse(body).Title +
        "\n Year: " + JSON.parse(body).Year +
        "\n IMDB Rating: " + JSON.parse(body).imdbRating +
        "\n Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value +
        "\n Produced In: " + JSON.parse(body).Country +
        "\n Language: " + JSON.parse(body).Language +
        "\n Plot: " + JSON.parse(body).Plot +
        "\n Actors: " + JSON.parse(body).Actors +
        "\n-------------------------------------------");
      console.log(movieInfo);

      // fs.appendFile("omdbLog.txt", movieInfo, function(err) {

      //   if (err) {
      //     console.log(err);
      //   }
      
      //   else {
      //     console.log("Content Added to Text File!");
      //   }
      
      // });

    }

  });
}

function doIt() {
  fs.readFile('random.txt', "utf8", function (error, data) {
    var txt = data.split(',');

    getSpotify(txt[1]);
  });
}


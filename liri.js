require("dotenv").config();

var request = require("request");
var keys = require("./keys");
//console.log(keys);
var Twitter = require('twitter');
//console.log(Twitter);
var Spotify = require('node-spotify-api');

var fs = require('fs');

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter);
// var inputString = process.argv[2];
// var value = process.argv.slice(3);


function myTweets() {

  client.stream('statuses/filter', { track: 'twitter' }, function (stream) {
    stream.on('data', function (tweet) {
      console.log(tweet.text);
    });

    stream.on('error', function (error) {
      console.log(error);
    });
  });
}

function spotifyThisSong(){
spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }

  console.log(data.tracks.items[0]);
});
}

function movieThis(){

  // Grab the movieName which will always be the third node argument.
  var movieName = process.argv[2];

  // Then run a request to the OMDB API with the movie specified
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  // This line is just to help us debug against the actual URL.
  console.log(queryUrl);

  request(queryUrl, function(error, response, body) {

    // If the request is successful
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log( "The Movie title is: " + JSON.parse(body).title +"\nRelease Year: " + JSON.parse(body).Year + "\nIMDB Rating of the movie: " + JSON.parse(body).IMDBrating)
    }
  });
}
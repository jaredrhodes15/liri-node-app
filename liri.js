// Pseudo code for Liri HW

// GO TO APIS AND GET DATA AND CONSOLE LOG IT BY USING COMMAND LINE ARGUMENTS
// import packages and keys
// make some variables

// LIRI will search Spotify for songs, Go to Spotify and get music data
require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var request = require("request");

var moment = reqiure("moment");

var spotify = new Spotify(keys.spotify);


function getMusicData() { 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
}
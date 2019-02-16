// Pseudo code for Liri HW

// GO TO APIS AND GET DATA AND CONSOLE LOG IT BY USING COMMAND LINE ARGUMENTS
// import packages and keys
// make some variables

// LIRI will search Spotify for songs, Go to Spotify and get music data
require("dotenv").config();
var keys = require("./keys.js");

var Spotify = require('node-spotify-api');
 
var spotify = new Spotify({
    // INSET MY ID AND SECRET BELOW
  id: asdfasdfasdfasdfasdfsdf,
  secret: asdfasdfad
});


function getMusicData() { 
spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
 
console.log(data); 
});
}
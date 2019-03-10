// Pseudo code for Liri HW

// GO TO APIS AND GET DATA AND CONSOLE LOG IT BY USING COMMAND LINE ARGUMENTS
// import packages and keys
// make some variables

// LIRI will search Spotify for songs, Go to Spotify and get music data
require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var fs = require("fs");

var moment = require("moment");

var request = require("request");

var divider = "\n----------------------------------\n";


// Code below was given

var spotify = new Spotify(keys.spotify);


function spotifyQuery() {
  var queryTerm;
	var comboTerm = "";

	for (var i = 3; i < process.argv.length; i++) {
		comboTerm += process.argv[i] + " ";
	}

	if (process.argv[2] === "spotify-this-song" && process.argv[3] != undefined) {
		queryTerm = comboTerm;
	}
	else if (process.argv[2] ==="spotify-this-song" && process.argv[3] == undefined) {
		queryTerm = "The Sign, Ace of Base ";
	}
	else if (process.argv[2] === "do-what-it-says") {
		queryTerm = readQuery;
	}

	spotify.search({type: 'track', query: queryTerm}, function (err, data) {

		if (data.tracks.items[0] == undefined) {
			console.log("No Song Found");
			return;
		}

		var artist = data.tracks.items[0].artists[0].name;

		for (var i = 1; i < data.tracks.items[0].artists.length; i++) {
			artist += ", " + data.tracks.items[0].artists[i].name;
		}

		// console.log(artist);

		var songMessage = "Song: " + data.tracks.items[0].name + "\nArtist: " + artist + "\nAlbum: " + data.tracks.items[0].album.name + "\nLink: " + data.tracks.items[0].external_urls.spotify;

		songMessage += divider;

		console.log(divider + songMessage);

		fs.appendFile("log.txt", songMessage, function (err) {
			if (err) {
				console.log(err);
			}
		})
	})
}

 
//OMDB

function movieQuery () {
  var queryTerm;
	var comboTerm = "";

	for (var i = 3; i < process.argv.length; i++) {
		comboTerm += process.argv[i] + " ";
	}

	if (process.argv[2] == "movie-this" && process.argv[3] != undefined) {
		queryTerm = comboTerm;
	}
	else if (process.argv[2] == "movie-this" && process.argv[3] == undefined) {
		queryTerm = "Mr. Nobody";
	}
	else if (process.argv[2] == "do-what-it-says") {
		queryTerm = readQuery;
	}

      var queryURL = "http://www.omdbapi.com/?t=" + queryTerm + "&apikey=trilogy"

          //Request npm call
          request(queryURL, function (error, response, body) {
            var obj = JSON.parse(body);
            
            if (obj.response === false){
              console.log("No Movie Found");
            }

            var movieMessage = "Title: " + obj.Title + "\nYear: " + obj.Year + "\nIMDB Rating: " + obj.Ratings[0].Value + "\nRotten Tomatoes Rating: " + obj.Ratings[1].Value + "\nCountry: " + obj.Country + "\nLanguage: " + obj.Language + "\nPlot: " + obj.Plot + "\nActors: " + obj.Actors;

	        	movieMessage += divider;

		        console.log(divider + movieMessage);
            console.log('error:', error); // Print the error if one occurred
            // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // console.log('body:', body); // Print the HTML for the Google homepage.
          }); 

}

//Bands in Town for concert, get concert info
function bandQuery () {
  var queryTerm;
	var comboTerm = "";

	for (var i = 3; i < process.argv.length; i++) {
		comboTerm += process.argv[i] + " ";
	}

	if (process.argv[2] === "concert-this" && process.argv[3] != undefined) {
		queryTerm = comboTerm;
	}
	else if (process.argv[2] === "concert-this" && process.argv[3] == undefined) {
		queryTerm = "Ariana Grande";
	}
	else if (process.argv[2] === "do-what-it-says") {
		queryTerm = readQuery;
	}

      var bandURL = "https://rest.bandsintown.com/artists/" + queryTerm + "/events?app_id=codingbootcamp&date=upcoming";

          //Request npm call
          request(bandURL, function (error, response, body) {
            


            var obj = JSON.parse(body);
            
            if (obj.response === false){
              console.log("No Concert Found");
            }

            var bandMessage = "Venue: " + obj.venue + "\nWhen: " + moment(obj.datetime).format("MM/DD/YYYY, h:mm A");

	        	bandMessage += divider;

		        console.log(divider + bandMessage);
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            // // console.log('body:', body); // Print the HTML for the Google homepage.
          }); 

}

var readQuery;

function doThisWrite () {

	fs.readFile("random.txt", "utf8", function (err, data) {

		if (err) {
			return console.log(err);
		}

		data = data.split(", ")

		readQuery = data[1];

		if (data[0] === "spotify-this-song") {
		 	spotifyQuery();
		}
		else if (data[0] === "movie-this") {
		    movieQuery();
		}
    else if (data[0] === "concert-this"){
        bandQuery();
    }
	});

}



var action = process.argv[2];

switch (action) {
	case "spotify-this-song":
		spotifyQuery();
		break;

  case "movie-this":
		movieQuery();
    break;
    
  case "concert-this":
    bandQuery();
    break;  

	case "do-what-it-says":
		doThisWrite();
		break;
	default:
		console.log("Please Use a Working Command: \nspotify-this-song \nmovie-this \nconcert-this \ndo-what-it-says");
		break;
}


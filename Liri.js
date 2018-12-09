require("dotenv").config();
// var require = require(inquirer)

var Spotify = require("node-spotify-api");
var axios = require("axios");
var moment = require("moment");

var keys = require("./keys")

var spotify = new Spotify(keys.spotify);
var band = process.env.BANDS_API_KEY
var movie = process.env.OMDB_API_KEY


var userChoice = process.argv[2];
var userInput = process.argv[3];

switch (userChoice) {
    case "concert-this":
    axios.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=" + band).then(
                function (bandData) {
                   console.log(bandData.data)
        console.log("concert");
                });
        break;

    case "spotify-this-song":
    spotify.search({ type: 'track', query: userInput, limit: 4 }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        } else{
            console.log("Song Name: " + userInput.toUpperCase());
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("Album Name: " + data.tracks.items[0].album.name);
            console.log("URL: " + data.tracks.items[0].album.external_urls.spotify);
             
        }

    
      console.log(data); 
      });
        console.log("spotify");
        break;

    case "movie-this":
    axios.get("http://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=" + movie).then(
        function (movieData) {
            console.log("The movie's title is: " + movieData.data.Title);
            console.log("The movie's release year is: " + movieData.data.Year);
            console.log("The movie's IMDB rating is: " + movieData.data.imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + movieData.data.Ratings[1].value);
            console.log("The movie's country of origin is: " + movieData.data.Country);
            console.log("The movie's language is: " + movieData.data.Language);
            console.log("The movie's plot is: " + movieData.data.Plot);
            console.log("The movie's cast is: " + movieData.data.Actors);

        }
      )
        console.log("movie");
        break;

    case "do-what-it-says":
         console.log("whatever");
        break;

    default:
    console.log("please enter something");
        break;
}

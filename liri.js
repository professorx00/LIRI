require('dotenv').config();
const axios = require('axios')
const moment = require('moment');
const Spotify = require('node-spotify-api');
const fs = require('fs')






function searchSpotify(songTitle) {
    let spot = new Spotify({
        id: process.env.SPOT_CLIENT_ID,
        secret: process.env.SPOT_SECRET
    });
    spot.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data.tracks.items);
    });
}

function searchMovie(movieTitle) {

    let omdbApi = process.env.OBM_API;

    axios.get(`http://www.omdbapi.com/?apikey=${omdbApi}&t=${movieTitle}`)
        .then(function (response) {

            console.log(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error)
            }
        });
}

function searchBand(bandName) {
    let api = process.env.bandsintown
    let artist = bandName
    axios.get(`https://rest.bandsintown.com/artists/${artist}/events?app_id=${api}`)
        .then(function (response) {

            console.log(response.data);
        })
        .catch(function (error) {
            if (error.response) {
                console.log(error)
            }
        });
}
function doIt(){
    console.log("Doing Something LALALALA")
}

const arguments = process.argv.slice(3).join(" ");
const command= process.argv[2]
switch(command){
    case "concert-this":
        searchBand(arguments);
        break;
    case "spotify-this-song":
        searchSpotify(arguments);
        break;
    case "movie-this":
        searchMovie(arguments);
        break;
    case "do-what-it-says":
        doIt();
        break;
    default:
        console.log(" I did not understand what you need. Please do not beat me my meat master. Please!")
}


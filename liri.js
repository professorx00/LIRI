require('dotenv').config();
const axios = require('axios')
const moment = require('moment');
const Spotify = require('node-spotify-api');
const fs = require('fs')






function searchSpotify(songTitle) {
    console.log(songTitle);
    let spot = new Spotify({
        id: process.env.SPOT_CLIENT_ID,
        secret: process.env.SPOT_SECRET
    });
    spot.search({ type: 'track', query: songTitle }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        if (data.tracks.total == 0) {
            console.log("empty")
        }
        else {
            for (let x = 0; x < 4; x++) {
                console.log(data.tracks.items[x])
            }

        }
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
function doIt() {
    console.log("Doing Something LALALALA")
}

const arguments = process.argv.slice(3).join(" ");
const command = process.argv[2]
if (process.argv.length > 3) {
    switch (command) {
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
}
else{
    switch (command) {
        case "concert-this":
            console.log("Dear Meatbags Master, I can not get the concert if there is no concert.")
            break;
        case "spotify-this-song":
            searchSpotify("the sign");
            break;
        case "movie-this":
            searchMovie("Mr. Nobody");
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log(" I did not understand what you need. Please do not beat me my meat master. Please!")
    }
}



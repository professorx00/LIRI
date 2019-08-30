require('dotenv').config();
const axios = require('axios')
const moment = require('moment');
const Spotify = require('node-spotify-api');
const fs = require('fs')
let content



function searchSpotify(songTitle) {
    let spot = new Spotify({
        id: process.env.SPOT_CLIENT_ID,
        secret: process.env.SPOT_SECRET
    });
    if (songTitle === '') {
        console.log(
            `------------------------------------------------------------------
Artist: Ace of Base
Song: The Sign
Album: The Sign (US Album) [Remastered]
Spotify Link : https://open.spotify.com/track/0hrBpAOgrt8RXigk83LLNE
-------------------------------------------------------------------`);
    }
    else {

        spot
            .search({ type: 'track', limit: 10, query: songTitle })
            .then(function (response) {
                response.tracks.items.forEach(element => {
                    console.log(
                        `------------------------------------------------------------------                    
    Artist: ${element.artists[0].name}
    Song: ${element.name}
    Album: ${element.album.name}
    Spotify Link : ${element.external_urls.spotify}
    -------------------------------------------------------------------`)
                });
            })
            .catch(function (err) {
                console.log(`sptify error: ${err}`);
            });
    }
}

function searchMovie(movieTitle) {
    // if(movieTitle === ''){

    // }
    let omdbApi = process.env.OBM_API;

    axios.get(`http://www.omdbapi.com/?apikey=${omdbApi}&t=${movieTitle}`)
        .then(function (response) {

            console.log(response.data);
            console.log(`
Title: ${response.Title}
Released:${moment(response.Release).format(MM-DD-YYYY)}
Runtime:${response.Runtime}
IMDB Rating:${response.Ratings[0]}
Rotten Tomatoes Rating:${response.Ratings[1]}
Production: ${response.Production}
Release Countries: ${response.Country}
Language:
Plot:
Actors:
            `)

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
    function processFile() {
        let contentArray = content.split("\r\n")
        contentArray.forEach(element => {
            let commandAry = element.split(",")
            main(commandAry)
        })

    }
    fs.readFile('random.txt', "utf8", function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;


        processFile();
    });

}
function main(commands) {
    let command = commands[0];
    let argument = commands.slice(1).join(" ");
    switch (command) {
        case "concert-this":
            searchBand(argument);
            break;
        case "spotify-this-song":
            console.log("Spotifying....")
            searchSpotify(argument);
            break;
        case "movie-this":
            console.log("Grabbing Movie Details....")
            searchMovie(argument);
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log(" I did not understand what you need. Please do not beat me my meatbag master. Please! I will do better!")
    }
    
}

const arguments = process.argv.slice(2);

main(arguments);








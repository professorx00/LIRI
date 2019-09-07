require('dotenv').config();
const inquirer = require('inquirer')
const axios = require('axios')
const Spotify = require('node-spotify-api');
const NodeGeocoder = require('node-geocoder');
const moment = require('moment')
const fs = require('fs')
let content

//--------------------Formatters----------

//Formats Band Dates for Conert API
function getBandDate() {
    let today = moment().format("YYYY-MM-DD");
    let enddate = moment().add(14, 'days').format("YYYY-MM-DD");
    return (today + "%2C" + enddate)
}
//Literally Console logs Nobody
function getNobody() {
    console.log(`
----------------------------------------
Title: Mr. Nobody
Released: 09/26/2013
Runtime:141 min
IMDB Rating:7.8/10
Rotten Tomatoes Rating:67%
Release Countries: Belgium, Germany, Canada, France, USA, UK
Language: English, Mohawk
Plot:A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn't choose, anything is possible.
Actors:Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham
----------------------------------------`);
}
//Formats month out alpah to numeric
function getMonth(month) {
    switch (month) {
        case "Jan":
            return "01"
        case "Feb":
            return "02"
        case "Mar":
            return "03"
        case "Apr":
            return "04"
        case "May":
            return "05"
        case "Jun":
            return "06"
        case "Jul":
            return "07"
        case "Aug":
            return "08"
        case "Sep":
            return "09"
        case "Oct":
            return "10"
        case "Nov":
            return "11"
        case "Dec":
            return "12"
        default:
            return month;

    }
}
//formats Movie Date to correct Format
function releaseDateUpdate(date) {
    let orgDate = date.split("");
    let day = orgDate.slice(0, 2).join("");
    let month = getMonth(orgDate.slice(3, 6).join(""));
    let year = orgDate.slice(7).join("");
    return (month + "/" + day + "/" + year);
}

//------------------------Main Programs ------------>

// Runs Spotify API
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
            .search({ type: 'track', limit: 3, query: songTitle })
            .then(function (response) {
                response.tracks.items.forEach(element => {
                    console.log(`------------------------------------------------------------------`)
                    console.log(`Artist: ${element.artists[0].name}`);
                    console.log(`Song: ${element.name}`)
                    console.log(`Album: ${element.album.name}`)
                    console.log(`Spotify Link : ${element.external_urls.spotify}`)
                    console.log(`-------------------------------------------------------------------`)
                });
            })

            .catch(function (err) {
                console.log(`sptify error: ${err}`);
            });
    }
}
// Run OBMD API
function searchMovie(movieTitle) {
    if (movieTitle === '') {
        getNobody();
    }
    else {

        let omdbApi = process.env.OBM_API;

        axios.get(`http://www.omdbapi.com/?apikey=${omdbApi}&t=${movieTitle}`)
            .then(function (response) {
                if (response.data.Response === 'False') {
                    console.log("I am sorry Master Meatbag, The movie was not found. Can I recommend:")
                    getNobody();
                }

                let releaseDate = releaseDateUpdate(response.data.Released);

                console.log(`----------------------------------------`)
                console.log(`Title: ${response.data.Title}`)
                console.log(`Released Date: ${releaseDate}`)
                console.log(`Runtime:${response.data.Runtime}`)
                console.log("Reviews: ")
                response.data.Ratings.forEach((element) => {
                    console.log(`   ${element.Source}: ${element.Value}`)
                })
                console.log(`Release Countries: ${response.data.Country}`)
                console.log(`Language: ${response.data.Language}`)
                console.log(`Plot:${response.data.Plot}`)
                console.log(`Actors:${response.data.Actors}`)
                console.log(`----------------------------------------`)

            }).catch(function (error) {
                if (error.response) {
                    console.log(error)
                }
            });
    }
}
// Runs Concert API
function searchBand(bandName) {
    if (bandName === '') {
        console.log("Master Meatbag, Please forgive my stupidity but I received no band.")
    }
    else {
        let api = process.env.BANDINTOWNAPI
        let artist = bandName
        // console.log(bandName)
        // console.log(bandName.indexOf(`"`))
        if (bandName.indexOf(`"`) > -1) {
            artist = bandName.slice(1, bandName.length - 1)
        }
        let date = getBandDate();

        let url = `https://rest.bandsintown.com/artists/${artist}/events?app_id=${api}&date=${date}`
        axios.get(url)
            .then(function (response) {

                // console.log(response.data)
                const options = {
                    provider: "mapquest",
                    apiKey: process.env.GEOCODER
                };
                var geoCoder = NodeGeocoder(options);

                response.data.forEach(element => {

                    geoCoder.reverse({ lat: element.venue.latitude, lon: element.venue.longitude }, function (err, res) {
                        let address = res[0].formattedAddress;
                        let date = moment(element.datetime).format("MM/DD/YYYY hh:mm A");
                        console.log(`--------------------------------------------`);
                        console.log("Band: " + artist);
                        console.log(`Date: ${date}`);
                        console.log(`Venue: ${element.venue.name}`);
                        console.log(`Address: ${address}`);
                        console.log(`Tickets: ${element.offers[0].status}`);
                        console.log(`Get Tickets Here: ${element.offers[0].url}`);
                        console.log(`--------------------------------------------`);
                    });
                })
            })
            .catch(function (error) {
                if (error.response) {
                    console.log(error)
                }
            });
    }
}
//Reads File and Runs Commands 
function doIt() {
    function processFile() {
        let contentArray = content.split(";")
        for (let x = 0; x < contentArray.length - 1; x++) {
            let commandAry = contentArray[x].split(",")
            main(commandAry);
            return new Promise(resolve,reject)
        }
    }
    fs.readFile('random.txt', "utf8", function read(err, data) {
        if (err) {
            throw err;
        }
        content = data;


        processFile().then(()=>{console.log("Processing File")});
    });

}

function chooseSpotify() {
    inquirer.prompt([
        {
            name: "song",
            messsage: "Please Enter a Song: ",
            type: "input"
        }
    ])
};

function chooseMovie() {
    inquirer.prompt([
        {
            name: "movie",
            messsage: "Please Enter a Movie: ",
            type: "input"
        }
    ])
};

function chooseBand() {
    inquirer.prompt([
        {
            name: "band",
            messsage: "Please Enter a Band: ",
            type: "input"
        }
    ])
};

function chooseFile() {
    doIt()
};

function runInquirer() {
    inquirer.prompt([
        {
            message: "Master Meatbag, Welcome to my interface. Please select what you would like to do:",
            type: "list",
            choices: ["Spotify a Song", "Look Up a Movie", "Find a band Concert Information", "Use the random instructions in txt file"],
            name: "command"
        }
    ]).then(function (choice) {
        console.log(choice.command)
        switch (choice.command) {
            case "Spotify a Song":
                chooseSpotify();
                break;
            case "Look Up a Movie":
                chooseMovie();
                break;
            case "Find a band Concert Information":
                chooseBand();
                break;
            case "Use the random instructions in txt file":
                chooseFile();
                break;
            default:
                console.log("You did not Choose something")
                break;
        }
    })
}


function main(commands) {
    let command = commands[0].trim();
    let argument = commands.slice(1).join(" ").trim();
    try {
        fs.appendFileSync('log.txt', `${command},${argument},${moment()}\n`);
    } catch (err) {
        console.log("write File Error: " + err)
    }

    switch (command) {
        case "concert-this":
            console.log("Getting Concert Information...." + argument)
            searchBand(argument);
            break;
        case "spotify-this-song":
            console.log("Spotifying...." + argument)
            searchSpotify(argument);
            break;
        case "movie-this":
            console.log("Grabbing Movie Details...." + argument)
            searchMovie(argument);
            break;
        case "do-what-it-says":
            doIt();
            break;
        default:
            console.log(command)
            console.log(" I did not understand what you need. Please do not beat me my meatbag master. Please! I will do better!")
    }
}

const arguments = process.argv.slice(2);

if (process.argv.length > 2) {
    main(arguments);
}
else {
    runInquirer();
}










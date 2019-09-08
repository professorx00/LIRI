<h1 align="center"> LIRI</h1>
<p align="center">
  Siri in your Command Line
</p>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Development Keys](#development-keys)
- [Usage](#usage)
  - [Inquirer UI:](#inquirer-ui)
  - [Spotify this Song:](#spotify-this-song)
  - [Movie This:](#movie-this)
  - [Concert This:](#concert-this)
  - [Do What it Says:](#do-what-it-says)
  - [Command Line Calls:](#command-line-calls)
  - [Command Line Examples:](#command-line-examples)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Introduction


# Features

A few of the things you can do with Liri:

* Get Spotify Information from command line
* Get Movie Information from command line
* Get Concert Information from command line
* Get Spotify Information from text based UI
* Get Movie Information from text based UI
* Get Concert Information from text based UI





# Requirements
    
    Packages:
        Dependencies: 
            *axios: Version ^0.19.0
            *inquirer: Version ^7.0.0
            *moment: Version ^2.24.0
            *node-geocoder: Version ^3.23.0
            *node-spotify-api: Version ^1.1.1
        Developer Dependencies:
            *dotenv: Version ^8.1.0

    API:
        *Spotify :https://developer.spotify.com/documentation/web-api/<br>
        *OMDB API:http://omdbapi.com/<br>
        *Bands In Town: https://manager.bandsintown.com/support/bandsintown-api<br>
        *Mapquest: https://developer.mapquest.com/<br>

# Development Keys 
.Env File example:

SPOT_CLIENT_ID=[Spotify Client ID]<br>
SPOT_SECRET=[Spotify Secret]<br>
OBM_API=[OMDB API Key]<br>
BANDINTOWNAPI=[Band In Town API Key]<br>
GEOCODER=[Mapquest API Key]<br>

# Usage

## Inquirer UI:
    To enter into the Liri UI you will need to type into the console `node liri` with no arguments
## Spotify this Song:

    This will request that you enter a Song Title
    Example:
[![](http://img.youtube.com/vi/yMAlSOCt1y4/0.jpg)](http://www.youtube.com/watch?v=yMAlSOCt1y4 "Liri-Inquirer-Spotify-this Example")
## Movie This:

    This will request that you enter a Movie Title:
    # Example:
[![](http://img.youtube.com/vi/xljHl--jOeA/0.jpg)](http://www.youtube.com/watch?v=xljHl--jOeA "Liri- Inquirer- Movie Choice Example")

## Concert This:

    This will request that you enter a Band Name:
    Example:
[![](http://img.youtube.com/vi/te8WD8APk4A/0.jpg)](http://www.youtube.com/watch?v=te8WD8APk4A "Liri - Inquirer- Concert-this example")

## Do What it Says:

    This takes in a random.txt file in the base Directory. 
    Format of Random.txt file:
        command,"Item want to seach";

    Available commands:
        spotify-this
        movie-this
        concert-this
    Example File:
    concert-this,"ghost";
    movie-this,"Matrix";
    spotify-this-song,"Future Husband";

    Example Video:
[![](http://img.youtube.com/vi/YVjPe3w5MUg/0.jpg)](http://www.youtube.com/watch?v=YVjPe3w5MUg "Liri- Inquirer- Do-what-it-say Operation Example")

## Command Line Calls:
Liri has the ability to call command line calls directly into the command line.

`node liri [command] [arguments] [arguments] ... `


## Command Line Examples:
Spotify-this:<br>
[![](http://img.youtube.com/vi/hMAczPdGU0E/0.jpg)](http://www.youtube.com/watch?v=hMAczPdGU0E "Liri-Command Line- Spotify-this Example")

Movie-this:<br>
[![](http://img.youtube.com/vi/xRrt_NtcZt8/0.jpg)](http://www.youtube.com/watch?v=xRrt_NtcZt8 "Liri-Command Line- Movie-this Example")

Concert-this:<br>
[![](http://img.youtube.com/vi/mDhUf2RBXwg/0.jpg)](http://www.youtube.com/watch?v=mDhUf2RBXwg "Liri-Command Line-Concert-this Example")
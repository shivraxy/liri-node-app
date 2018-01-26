/* Possible input parameters :
 1. my-tweets
 2. spotify-this-song
 3. movie-this
 4. do-what-it-says 
 usage : node liri.js <parameter>
 */

inputParam = process.argv.splice(2);

fs = require("fs");
_ = require('underscore');

command = inputParam[0];
commandParam = inputParam[1];

if (command === 'do-what-it-says') {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if (error)
            return console.log(error);
        var dataArr = data.split(",");
        command = dataArr[0].trim();
        commandParam = dataArr[1].trim();
        executeCommand();
    })

} else
    executeCommand();

function executeCommand() {
    switch (command) {
        case 'my-tweets':
            var Twitter = require('twitter');
            var client = new Twitter(require('./keys.js').twitterKeys);
            var params = { screen_name: 'shiv_ram_j' };
            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    console.log('Tweety Time !!!!');
                    console.log(_.pluck(tweets, 'text').join("\n"));
                    // console.log(JSON.stringify(tweets[0].text, null, 2));
                }
            });
            break;

        case 'spotify-this-song':

            if (commandParam == null)
                songname = "The Sign";
            else
                songname = commandParam;

            var Spotify = require('node-spotify-api');
            var spotify = new Spotify(require('./keys.js').spotifyKeys);

            spotify.search({ type: 'track', query: songname }, function(err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                console.log('Artist(s) : ' + JSON.stringify(data.tracks.items[0].album.artists[0].name, null, 2));
                console.log('Song name : ' + JSON.stringify(data.tracks.items[0].name, null, 2));
                console.log('Link : ' + JSON.stringify(data.tracks.items[0].album.external_urls.spotify, null, 2));
                console.log('Album : ' + JSON.stringify(data.tracks.items[0].album.name, null, 2));
            });
            break;

        case 'movie-this':
            var request = require("request");
            movieName = inputParam[1];

            if (inputParam[1] == null) {
                console.log("If you haven't watched Mr. Nobody, then you should: http://www.imdb.com/title/tt0485947/");
                console.log("It's on Netflix!");
                break;
            } else
                movieName = inputParam[1];


            request("http://www.omdbapi.com/?t=" + movieName.trim() + "&y=&plot=short&apikey=40e9cece", function(error, response, body) {

                if (!error && response.statusCode === 200) {
                    console.log('============================================');
                    console.log('Movie Title:' + JSON.parse(body).Title);
                    console.log('Year the movie came out: ' + JSON.parse(body).Year);
                    console.log('IMDB Rating of the movie:' + JSON.parse(body).imdbRating);
                    console.log('Rotten Tomatoes Rating of the movie:' + JSON.parse(body).Year);
                    console.log('Country where the movie was produced:' + JSON.parse(body).Country);
                    console.log('Language of the movie:' + JSON.parse(body).Language);
                    console.log('Plot of the movie:' + JSON.parse(body).Plot);
                    console.log('Actors in the movie:' + JSON.parse(body).Actors);

                }
            });

        default:
            console.log(">>");
            console.log("Please enter valid input parameter. Expecting .. \n1. my-tweets \n2. spotify-this-song <song name>\n3. movie-this \n4. do-what-it-says");

    }
}
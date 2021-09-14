'use struct';
const express = require('express');
const app = express();
const cors = require('cors');
const Axios = require('axios');
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT;
const WeatherKey = process.env.WEATHER_API_KEY;
const MovieKey = process.env.MOVIE_API_KEY ;
const data = require('./data/weather.json');

////////////////////////////////////
///////////// STARTING /////////////
////////////////////////////////////
app.get('/', (req, res) => {
  res.status(200).json({ "❤️": "I'm working" })
})
////////////////////////////////////
///////////// CHECKING /////////////
////////////////////////////////////
app.listen(PORT, () => {
  console.log('Hello from The Back-End!❤️');
  console.log(`Hello!❤️ You In Port:${PORT} !`);
  console.log(`Hello!❤️ Your weather key:${WeatherKey} !`);
  console.log(`Hello!❤️ Your Movie key:${MovieKey} !`);
});
////////////////////////////////////
/////// HELLO MESSAGE LIVE /////////
////////////////////////////////////
let start = async (req, res) => {
  res.status(200).send('Hello from The Back-End!❤️');
}
app.get('/start', start)
////////////////////////////////////
///// WEATHER DATA FOR 16 DAYS /////
////////////////////////////////////
let handleWeather = async (req, res) => {
  let lat = req.query.lat ;
  let lon = req.query.lon ;

  let url = `https://api.weatherbit.io/v2.0/forecast/daily?&key=${WeatherKey}&lat=${lat}&lon=${lon}` ;
  let axiosResponse = await Axios.get(url);
  let weatherData = axiosResponse.data;
  let cleanedData = weatherData.data.map(item => {
    return new ForeCast(item.datetime, item.weather.description);
  })
  res.status(200).json(cleanedData);
}
app.get('/weather', handleWeather)

class ForeCast {
  constructor( date , description) {
    this.date = date;
    this.description = description ;
  }
}
////////////////////////////////////
////////////// MOVIES //////////////
////////////////////////////////////
let movies = async (req, res) => {
  let query = req.query.query ;
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MovieKey}&query=${query}` ;
  let axiosRes = await Axios.get(movieUrl);
  let movieData = axiosRes.data;
  let cleanData = movieData.results.map(item => {
    return new Movies(item.original_title , item.release_date , item.vote_average , item.poster_path);
  })
  res.status(200).json(cleanData);
}
app.get('/movies', movies)

class Movies {
  constructor( title , release ,vote , image) {
    this.title = title ;
    this.vote = vote ;
    this.release = release ;
    this.image = image ;
  }
}
////////////////////////////////////
///////////// MY DATA //////////////
////////////////////////////////////
app.get('/weather-data', (req, res) => {
  let lat = Number(req.query.lat);
  let lon = Number(req.query.lon);
  if (lat && lon) {
    let result = [];
    data.forEach(item => {
      if (Math.trunc(item.lat) === Math.trunc(lat) && Math.trunc(item.lon) === Math.trunc(lon)) {
        result.push(item);
      }
    });
    let city = result[0];
    if (result.length > 0) {
      let foreCast = city.data.map(item => {
        return {
          name: city.city_name,
          date: item.datetime,
          description: item.weather.description
        };
      });
      res.status(200).json(foreCast);
    } else {
      res.status(404).send('Not Found !!');
    }
  } else {
    res.status(400).send('Please Provide Correct Query !!');
  }
});
////////////////////////////////////




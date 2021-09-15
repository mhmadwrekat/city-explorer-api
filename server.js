'use struct';
const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
app.use(cors());
const PORT = process.env.PORT;
const handleWeather = require('./controllers/Weather');
const Movies = require('./controllers/Movie');
const Myweather = require('./controllers/Myweather');
////////////////////////////////////
///////////// CHECKING /////////////
////////////////////////////////////
app.get('/', (req, res) => {
  res.status(200).json({ "❤️": "Hello from The Back-End !" })
})
////////////////////////////////////
app.listen(PORT, () => {
  console.log(`Hello! You In Port :❤️ ${PORT} ❤️!`);
});
////////////////////////////////////
app.get('/weather-data', Myweather);
app.get('/weather', handleWeather)
app.get('/movies', Movies);
////////////////////////////////////
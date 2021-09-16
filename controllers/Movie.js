'use strict';
const MoviesModel = require('../models/Movies.model');
const MovieKey = process.env.MOVIE_API_KEY;
const Axios = require('axios');
const Cache = require('../helpers/cacheMovie');
let cache = new Cache();

const movies = async (req, res) => {
    let newDate = new Date();
    if (cache.data.length > 0 && cache.date.getDate() === newDate.getDate()) {
        res.status(200).json({ 'Message': 'Data Retrieved From The Cache 💚', cache });
    } else {
        let query = req.query.query;
        let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MovieKey}&query=${query}`;
        let axiosRes = await Axios.get(movieUrl);
        let movieData = axiosRes.data;
        let cleanData = movieData.results.map(item => {
            return new MoviesModel(item.original_title, item.release_date, item.vote_average, item.poster_path);
        })
        cache.data = cleanData;
        cache.date = newDate;
        res.status(200).json({ 'Message': 'Data Is Coming From The API ❤️', cleanData });
    }
}
module.exports = movies;
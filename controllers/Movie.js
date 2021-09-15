'use strict';
const MoviesModel = require('../models/Movies.model');
const MovieKey = process.env.MOVIE_API_KEY;
const Axios = require('axios');

const movies = async (req, res) => {
    let query = req.query.query;
    let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${MovieKey}&query=${query}`;
    let axiosRes = await Axios.get(movieUrl);
    let movieData = axiosRes.data;
    let cleanData = movieData.results.map(item => {
        return new MoviesModel(item.original_title, item.release_date, item.vote_average, item.poster_path);
    })
    res.status(200).json(cleanData);
}

module.exports = movies;
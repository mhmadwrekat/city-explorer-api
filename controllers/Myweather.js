'use strict';
const data = require('../data/weather.json');

const Myweather = async (req, res) => {
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
}
module.exports = Myweather;
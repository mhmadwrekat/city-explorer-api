'use struct';
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
require('dotenv').config();
const PORT = process.env.PORT;
const data = require('./data/weather.json');
////////////////////////////////////////
app.listen(PORT, () => {
    console.log(`Hello from The Back-End!❤️ You In Port:${PORT} !`);
})
//////////////////////////////////////
app.get('/data', (req, res) => {
    console.log('❤️');
    let city = data[0] ;
    //res.status(200).json(city) ;
    let searchD = city.data.map(item => {
        return {
            date: item.valid_date,
            description: item.weather.description
        }
    })
    let custom = {
        search: searchD,
        city_name: city.city_name
    }
    res.status(200).json(custom);
});
///////////////////////////////////////
app.get('/weather-data', (req, res) => {
    let lat = Number(req.query.lat);
    let lon = Number(req.query.lon);
    if (lat && lon) {
        let result = [];
        data.forEach(item => {
            if (item.lat === lat && item.lon === lon) {
                result.push(item)
            }
        })
        let city = result[0];
        if (result.length > 0) {
            let foreCast = city.data.map(item => {
                return {
                    name : city.city_name ,
                    date: item.datetime,
                    description : item.weather.description
                }
            })
            res.status(200).json(foreCast);
        } else {
            res.status(404).send('Not Found !!');
        }
    } else {
        res.status(400).send('Please Provide Correct Query !!');
    }
})
//lon
//35.91
//lan
//31.95
///////////////////////////////////////
/*
  app.get('/weather',weatherInformation);

app.get('/movie', movieInformation);

app.get('/', function (req, res) {
  res.send(' Hello from The Back-End ! ❤️')
});


app.listen(PORT,()=>{
  console.log(`server started at ${PORT}`);
});
*/


const express = require('express');
const requestHandler = require('./requestHandler');
// const fetch = require('node-fetch');
// const dotenv = require('dotenv');


const app = express();
// dotenv.config();
const port = process.env.PORT || 3000;
// const weatherApiKey = process.env.WEATHER_KEY;
// const pixaApiKey = process.env.PIXA_KEY;
// const geonamesUsername = process.env.GEONAME_KEY;

app.use(express.static('dist'));

app.get('/', (req,res)=>{
    res.sendFile('dist/index.html')
})

app.get('/api/trip', requestHandler.getTrip);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;
const weatherApiKey = process.env.WEATHER_KEY;
const pixaApiKey = process.env.PIXA_KEY;
const geonameApiKey = process.env.GEONAME_KEY;

app.use(express.static('dist'));

app.get('/', (req,res)=>{
    res.sendFile('dist/index.html')
})

app.get('/api/trip', getTrip);

app.get('/api/weather', getWeatherData);

app.get('/api/coordinates', getCoordinates);

app.get('/api/photo', getPhoto);

const getTrip = async (req,res,next) =>{

  const { cityName, days } = req.query;
  
  if(cityName == undefined || cityName ==="" ){
    return res.status(400).json({error: 'City name is required'})
  }

  const {latitude, longitude, errMsg} = await getCoordinates(cityName)

  if(errMsg != undefined){
    return res.status(400).json({errMsg:errMsg})
  }


}

/*
return {
              cityName: cityName,
              latitude: city.lat,
              longitude: city.lng,
              errMsg: ''
            }
*/
const getCoordinates = async (cityName) =>{
    try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${geonamesUsername}`);
        const data = await response.json();

        if (data.geonames && data.geonames.length > 0) {
            const city = data.geonames[0];
            return {
              latitude: city.lat,
              longitude: city.lng
            }
        } else {
            return {
              errMsg: 'City not found'
            }
        }
    } catch (error) {
        console.error(error);
        return {
          errMsg: 'An error occurred while fetching data from Geonames'
        }
    }
}

const getWeatherData = async (lat, lng, days) =>{
    try {
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=${days}&key=${weatherApiKey}`);
    const data = await response.json();
    const targetDateData = data[days];
    return {
      max_temp: targetDateData.max_temp,
      min_temp: targetDateData.min_temp,
      description: targetDateData.weather.description
    }
  } catch (error) {
    return {
      errMsg: 'Failed to fetch weather data'
    }
  }
}

const getPhotoUrl = async(location, pixaApiKey) =>{
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${pixaApiKey}&q=${location}&image_type=photo`);
    const data = await response.json();
    if(data.total = 0){
      return {
        errMsg: 'Cannot fount photo of your city'
      }
    }
    return {
      photoUrl: hits[0].largeImageURL
    }
  } catch (error) {
    console.log(error);
    return {
      errMsg: 'Failed to fetch photo data'
    }
  }
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

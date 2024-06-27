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

// async function getTrip(req,res,next){

//   const { cityName, days } = req.query;
  
//   if(cityName == undefined || cityName ==="" ){
//     return res.status(400).json({error: 'City name is required'})
//   }
//   // Get photo
//   const {photoUrl, photoErrMsg} = await getPhotoUrl(cityName);

//   if(photoErrMsg != undefined){
//     return res.status(400).json({errMsg:photoErrMsg})
//   }
//   // check days 
//   if(days >7){
//     return res.status(200).json({
//       photoUrl: photoUrl
//     });
//   }
//   else {
//     // Get coordinates
//     const {latitude, longitude, coorErrMsg} = await getCoordinates(cityName);

//     if(coorErrMsg != undefined){
//       return res.status(400).json({errMsg:coorErrMsg});
//     }

//     // Get weather info
//     const {max_temp, min_temp, description, weatherErrMsg} = await getWeatherData(latitude, longitude, days);
    
//     if(weatherErrMsg != undefined){
//       return res.status(400).json({errMsg:weatherErrMsg});
//     }
//     else {
//       return res.status(200).json({
//         max_temp:max_temp,
//         min_temp:min_temp,
//         description:description
//       })
//     }
//   }
// }

/*
return {
              cityName: cityName,
              latitude: city.lat,
              longitude: city.lng,
              coorErrMsg: ''
            }
*/
// const getCoordinates = async (cityName) =>{
//     try {
//         const response = await fetch(`http://api.geonames.org/searchJSON?q=${cityName}&maxRows=1&username=${geonamesUsername}`);
//         const data = await response.json();

//         if (data.geonames && data.geonames.length > 0) {
//             const city = data.geonames[0];
//             return {
//               latitude: city.lat,
//               longitude: city.lng
//             }
//         } else {
//             return {
//               coorErrMsg: 'City not found'
//             }
//         }
//     } catch (error) {
//         console.error(error);
//         return {
//           coorErrMsg: 'An error occurred while fetching data from Geonames'
//         }
//     }
// }

// const getWeatherData = async (lat, lng, days) =>{
//     try {
//     const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=${days}&key=${weatherApiKey}`);
//     const data = await response.json();
//     const targetDateData = data.data[days-1];
//     console.log(targetDateData)
//     return {
//       max_temp: targetDateData.max_temp,
//       min_temp: targetDateData.min_temp,
//       description: targetDateData.weather.description
//     }
//   } catch (error) {
//     console.log(error);
//     return {
//       weatherErrMsg: 'Failed to fetch weather data'
//     }
//   }
// }

// const getPhotoUrl = async(location) =>{
//   try {
//     let encodedLocation = encodeURIComponent(location);
//     console.log(encodedLocation);
//     const response = await fetch(`https://pixabay.com/api/?key=${pixaApiKey}&q=${encodedLocation}&image_type=photo`);
//     const data = await response.json();
//     if(data.total = 0){
//       return {
//         photoErrMsg: 'Cannot found photo of your city'
//       }
//     }
//     return {
//       photoUrl: data.hits[0].largeImageURL
//     }
//   } catch (error) {
//     console.log(error);
//     return {
//       photoErrMsg: 'Failed to fetch photo data'
//     }
//   }
// }

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
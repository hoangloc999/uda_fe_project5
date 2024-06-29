const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const weatherApiKey = process.env.WEATHER_KEY;
const pixaApiKey = process.env.PIXA_KEY;
const geonamesUsername = process.env.GEONAME_KEY;

/**
 * Get Coordinates from a specified location
 * @param {*} location 
 * @returns 
 */
const getCoordinates = async (location) =>{
    try {
        const response = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesUsername}`);
        const data = await response.json();

        if (data.geonames && data.geonames.length > 0) {
            const locationData = data.geonames[0];
            return {
              latitude: locationData.lat,
              longitude: locationData.lng
            }
        } else {
            return {
              coorErrMsg: 'City not found'
            }
        }
    } catch (error) {
        console.error(error);
        return {
          coorErrMsg: 'An error occurred while fetching data from Geonames'
        }
    }
}
/**
 * Call API to get weather info
 * @param {lat} lat 
 * @param {lng} lng 
 * @param {days diff of departureDate and today} days 
 * @returns 
 */
const getWeatherData = async (lat, lng, days) =>{
    try {
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&days=${days}&key=${weatherApiKey}`);
    const data = await response.json();
    const targetDateData = data.data[days-1];
    console.log(targetDateData)
    return {
      max_temp: targetDateData.max_temp,
      min_temp: targetDateData.min_temp,
      description: targetDateData.weather.description
    }
  } catch (error) {
    console.log(error);
    return {
      weatherErrMsg: 'Failed to fetch weather data'
    }
  }
}
/**
 * Get photo of location
 * @param {Keyword of photo} location 
 * @returns 
 */
const getPhotoUrl = async(location) =>{
  try {
    let encodedLocation = encodeURIComponent(location);
    console.log(encodedLocation);
    const response = await fetch(`https://pixabay.com/api/?key=${pixaApiKey}&q=${encodedLocation}&image_type=photo`);
    const data = await response.json();
    if(data.total = 0){
      return {
        photoErrMsg: 'Cannot found photo of your place'
      }
    }
    const imgUrl = data.hits[0].largeImageURL;
    if(imgUrl === undefined){
      return {
        photoErrMsg: 'Cannot found photo of your place'
      }
    } else {
      return {
        photoUrl: imgUrl
      }
    }
    
  } catch (error) {
    console.log(error);
    return {
      photoErrMsg: 'Failed to fetch photo data'
    }
  }
}
/**
 * 
 * @param {request} req 
 * @param {response} res 
 * @param {callback} next 
 * @returns 
 */
async function getTrip(req,res,next){

    const { location, days } = req.query;
    
    if(location == undefined || location ==="" ){
      return res.status(400).json({error: 'City name is required'})
    }
    // Get photo
    const {photoUrl, photoErrMsg} = await getPhotoUrl(location);
  
    if(photoErrMsg != undefined){
      return res.status(400).json({errorMsg:photoErrMsg})
    }
    // check days 
    if(days == undefined || days < 1 || days >7){
      return res.status(200).json({
        photoUrl: photoUrl
      });
    }
    else {
      // Get coordinates
      const {latitude, longitude, coorErrMsg} = await getCoordinates(location);
  
      if(coorErrMsg != undefined){
        return res.status(400).json({errorMsg:coorErrMsg});
      }
  
      // Get weather info
      const {max_temp, min_temp, description, weatherErrMsg} = await getWeatherData(latitude, longitude, days);
      
      if(weatherErrMsg != undefined){
        return res.status(400).json({errorMsg:weatherErrMsg});
      }
      else {
        return res.status(200).json({
          max_temp:max_temp,
          min_temp:min_temp,
          description:description,
          photoUrl:photoUrl
        })
      }
    }
  }

exports.getTrip = getTrip;
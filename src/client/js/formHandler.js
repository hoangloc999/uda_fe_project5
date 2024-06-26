import fetch from 'node-fetch';

// Make sure get form after DOM load completely

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('travel-form');
    form.addEventListener('submit', handleSubmit);

    // User cannot select past
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
})

async function handleSubmit(event) {
    event.preventDefault();
    alert('Submit success')

    // get input
    const location = document.getElementById('location').value;
    const date = document.getElementById('date').value;
    const resultDiv = document.getElementById('result');
    console.log(location)
    console.log(date)
    console.log(resultDiv)

    const geonamesUsername = 'your_geonames_username';
    const weatherbitApiKey = 'your_weatherbit_api_key';
    const pixabayApiKey = 'your_pixabay_api_key';

    resultDiv.innerHTML = 'Loading...';
    // Call API to my server
    try {
        const geonamesResponse = await fetch(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${geonamesUsername}`);
        const geonamesData = await geonamesResponse.json();
        
        if (geonamesData.geonames.length === 0) {
          resultDiv.innerHTML = 'Location not found.';
          return;
        }
    
        const { lat, lng } = geonamesData.geonames[0];
        const departureDate = new Date(date);
        const currentDate = new Date();
        const oneWeekFromNow = new Date();
        oneWeekFromNow.setDate(currentDate.getDate() + 7);
        // Display response result
        if (departureDate <= oneWeekFromNow) {
          const weatherResponse = await fetch(`/api/weather?lat=${lat}&lng=${lng}&apiKey=${weatherbitApiKey}`);
          const weatherData = await weatherResponse.json();
          const weather = weatherData.data[0];
          const weatherInfo = `Weather: ${weather.weather.description}, Temperature: ${weather.temp}°C`;
    
          const pixabayResponse = await fetch(`/api/image?location=${location}&apiKey=${pixabayApiKey}`);
          const pixabayData = await pixabayResponse.json();
          const imageUrl = pixabayData.hits[0].webformatURL;
    
          resultDiv.innerHTML = `<p>${weatherInfo}</p><img src="${imageUrl}" alt="${location}">`;
        } else {
          const pixabayResponse = await fetch(`/api/image?location=${location}&apiKey=${pixabayApiKey}`);
          const pixabayData = await pixabayResponse.json();
          const imageUrl = pixabayData.hits[0].webformatURL;
    
          resultDiv.innerHTML = `<img src="${imageUrl}" alt="${location}">`;
        }
      } catch (error) {
        resultDiv.innerHTML = 'Error occurred while fetching data.';
        console.error(error);
      }
    
}

export { handleSubmit };
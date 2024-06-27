import fetch from 'node-fetch';
import {getDifferenceInDays, getCurrentDate} from './helper'
import {addImageToDiv, appendTrip, clearDiv} from './UIBuilder'

var tripList = [];
var tripResult;

// Make sure get form after DOM load completely

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('travel-form');
    form.addEventListener('submit', handleSubmit);

    // User cannot select past
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // save trip button
    const btnSaveTrip = document.getElementById('btn-save');
    btnSaveTrip.addEventListener('click', saveTripClick);
})

async function handleSubmit(event) {
    event.preventDefault();
    // get input
    const location = document.getElementById('location').value;
    const departureDate = document.getElementById('date').value;
    const resultDiv = document.getElementById('result');
    
    const tripContainer = document.getElementById('trip-container');
    // display result of trip
    tripContainer.classList.remove('hide');

    resultDiv.innerHTML = 'Loading...';

    // check input date is in 7 days from now
    const currentDate = getCurrentDate();
    // const oneWeekFromNow = new Date();
    // oneWeekFromNow.setDate(currentDate.getDate() + 7);
    // get diff date of departure from now
    console.log(currentDate)
    console.log(departureDate)

    var days = getDifferenceInDays(currentDate,departureDate) +1;//plus 1 for today
    console.log(days)

    // Call API to my server
    try {
        tripResult = await fetch(`/api/trip?cityName=${location}&days=${days}`);

        const tripData = await tripResult.json();
        const {max_temp, min_temp, description, photoUrl, errorMsg} = tripData;
        if (errorMsg !== undefined) {
          // display error message
          resultDiv.innerHTML = errorMsg;
          return;
        } else if (max_temp === undefined){
          // display image
          addImageToDiv('photo', photoUrl);
        }
        else {
          // Display button save trip
          const btnSaveTrip = document.getElementById('btn-save');
          btnSaveTrip.classList.remove('hide');

          // return res.status(200).json({
          //   max_temp:max_temp,
          //   min_temp:min_temp,
          //   description:description
          // })
          // display result on screen
          var displayText = '';
          displayText += '<h3>'+ location +'</h3>'
          displayText += 'Max temp:' + max_temp + '<br>';
          displayText += 'Min temp:' + min_temp + '<br>';
          displayText += 'Description:' + description;
          resultDiv.innerHTML = displayText;
          // display image
          addImageToDiv('photo', photoUrl);
        }
        
      } catch (error) {
        resultDiv.innerHTML = 'Error occurred while fetching data.';
        console.error(error);
      }
}

function saveTripClick(event){
  event.preventDefault();
  tripList.push(tripResult);
  console.log(tripResult)
  console.log(tripList)
  //Display saved trips
  displaySavedTrips()
  // hide button save trip
  const btnSaveTrip = document.getElementById('btn-save');
  btnSaveTrip.classList.add('hide');
}

const displaySavedTrips = () =>{
  clearDiv('saved-trips');
  tripList.forEach(element => {
    appendTrip('saved-trips',element.location,element.max_temp,element.min_temp,element.description,element.photoUrl);
  });

  
}

export { handleSubmit };
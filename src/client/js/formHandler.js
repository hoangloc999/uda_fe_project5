import fetch from 'node-fetch';
import {getDifferenceInDays, getCurrentDate} from './helper'
import {addImageToDiv, appendTrip, clearDiv} from './UIBuilder'

var tripList = [];
var tripData;

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
    //console.log(currentDate)
    //console.log(departureDate)

    var days = getDifferenceInDays(currentDate,departureDate) +1;//plus 1 for today
    console.log(days)

    // Call API to my server
    try {
        /** Call API process
         * when has error, display error message
         * when departureDate > 7days from today => only display photo and active 'save trip' button
         * when departureDate < 7days from today => display photo and weather info and active 'save trip' button
         */
        const tripResult = await fetch(`/api/trip?location=${location}&days=${days}`);
        
        tripData = await tripResult.json();
        console.log(tripData)
        const {max_temp, min_temp, description, photoUrl, errorMsg} = tripData;
        console.log(tripResult);
        if(!tripResult.ok){
          // display error message
          resultDiv.innerHTML = errorMsg;
          // Hide button save trip
          const btnSaveTrip = document.getElementById('btn-save');
          btnSaveTrip.classList.add('hide');
          return;
        }
        // save tripName is location
        tripData.location = location;
        tripData.dateInput = departureDate;
        
        // if (errorMsg !== undefined) {
        //   // display error message
        //   resultDiv.innerHTML = errorMsg;
        //   // Hide button save trip
        //   const btnSaveTrip = document.getElementById('btn-save');
        //   btnSaveTrip.classList.add('hide');
        //   return;
        // } else if (max_temp === undefined){
        if (max_temp === undefined){
          if(photoUrl !== undefined){
            // Display button save trip
            const btnSaveTrip = document.getElementById('btn-save');
            btnSaveTrip.classList.remove('hide');
            // Display trip info
            var displayText = '';
            displayText += '<h3>'+ location +'</h3>';
            displayText += 'Travel date:' + departureDate + '<br>';
            resultDiv.innerHTML = displayText;
            // display image
            clearDiv('photo');
            addImageToDiv('photo', photoUrl);
          }
          else {
            // display error message
            resultDiv.innerHTML = 'Photo not found';
            // Hide button save trip
            const btnSaveTrip = document.getElementById('btn-save');
            btnSaveTrip.classList.add('hide');
            return;
          }
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
          displayText += '<h3>'+ location +'</h3>';
          displayText += 'Travel date:' + departureDate + '<br>';
          displayText += 'Max temp:' + max_temp + '<br>';
          displayText += 'Min temp:' + min_temp + '<br>';
          displayText += 'Description:' + description;
          resultDiv.innerHTML = displayText;
          // display image
          clearDiv('photo');
          addImageToDiv('photo', photoUrl);
        }
        
      } catch (error) {
        // Hide button save trip
        const btnSaveTrip = document.getElementById('btn-save');
        btnSaveTrip.classList.add('hide');
        if (error.message.includes('400')) {
          const errorBody = error.message.match(/Body: (.+)/)?.[1];
          // Handle 400 Bad Request
          resultDiv.innerHTML = errorBody
        } else{
          resultDiv.innerHTML = 'Error occurred while fetching data.';
        }
        console.error(error);
      }
}

function saveTripClick(event){
  event.preventDefault();
  tripList.push(tripData);
  //Display saved trips
  displaySavedTrips()
  // hide button save trip
  const btnSaveTrip = document.getElementById('btn-save');
  btnSaveTrip.classList.add('hide');
}

const displaySavedTrips = () =>{
  clearDiv('saved-trips');
  //console.log(tripList)
  tripList.forEach(element => {
    appendTrip('saved-trips',element.location,element.max_temp,element.min_temp,element.description,element.photoUrl,element.dateInput);
  });

  
}

export { handleSubmit };
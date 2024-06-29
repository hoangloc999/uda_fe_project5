/**
 * Utility method to add an img element to a div element
 * @param {string} divId - The id of the target div element
 * @param {string} imgUrl - The URL of the image to be added
 */
function addImageToDiv(divId, imgUrl) {
    // Get the target div element by its ID
    const divElement = document.getElementById(divId);

    // Create a new img element
    const imgElement = document.createElement('img');

    // Set the src attribute of the img element to the provided URL
    imgElement.src = imgUrl;

    // Append the img element to the target div element
    divElement.appendChild(imgElement);
}

function appendTrip(containerId, tripName, maxTemp, minTemp, description, imageUrl, dateInput) {
    // Select the container div
    let container = document.getElementById(containerId);

    // Create HTML structure for the trip
    let tripHtml = '';

    if(maxTemp === undefined){
      tripHtml = `
      <div class="trip">
        <h3>${tripName}</h3>
        <div>Date: ${dateInput}</div>
        <img src="${imageUrl}">
      </div>
    `;
    } else {
      tripHtml = `
      <div class="trip">
        <h3>${tripName}</h3>
        <div>Date: ${dateInput}</div>
        <div>Max temp: ${maxTemp}</div>
        <div>Min temp: ${minTemp}</div>
        <div>Description: ${description}</div>
        <img src="${imageUrl}">
      </div>
    `;
    }
    
    console.log(tripHtml)
    // Append tripHtml to the container div
    container.innerHTML += tripHtml;
}

// Utility function to clear all items within a specified div element
function clearDiv(containerId) {
  // Select the container div
  let container = document.getElementById(containerId);

  // Clear all child nodes within the container
  while (container.firstChild) {
      container.removeChild(container.firstChild);
  }
}

export { 
    addImageToDiv,
    appendTrip,
    clearDiv
 };
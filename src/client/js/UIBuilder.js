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

    // Optionally, you can set other attributes such as alt text, width, height, etc.
    // imgElement.alt = 'Description of the image';
    // imgElement.width = 200; // for example, set width to 200px
    // imgElement.height = 200; // for example, set height to 200px

    // Append the img element to the target div element
    divElement.appendChild(imgElement);
}

function appendTrip(containerId, tripName, maxTemp, minTemp, description, imageUrl) {
    // Select the container div
    let container = document.getElementById(containerId);

    // Create HTML structure for the trip
    let tripHtml = `
      <div class="trip">
        <h3>${tripName}</h3>
        <div>Max temp: ${maxTemp}</div>
        <div>Min temp: ${minTemp}</div>
        <div>Description: ${description}</div>
        <img src="${imageUrl}">
      </div>
    `;

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
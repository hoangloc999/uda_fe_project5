/* Global Variables */
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';
// Personal API Key for OpenWeatherMap API
const apiKey = 'c80cd6f94276794ac1d8125f90c88b96&units=imperial';


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Reference elements
const formUserInfo = document.getElementById('formUserInfo');
const btnGenerate = document.getElementById('generate');
const txtZip = document.getElementById('zip');
const txtFeelings = document.getElementById('feelings');

// Add events listener
btnGenerate.addEventListener('click', e => generateAction(e));

/* Function when click generate button*/
const generateAction = e => {
    e.preventDefault();
    //console.log("Start generate process")

    //get user input
    const zipCode = txtZip.value;
    const content = txtFeelings.value;

    if (zipCode.value !== '') {
        getWeatherData(baseUrl, zipCode, apiKey)
            .then(function(data) {
                // add data to POST request
                postData('/add', { temp: data.main.temp, date: newDate, content: content });
            }).then(function() {
                // call updateUI to update browser content
                updateUI()
            }).catch(function(error) {
                console.log(error);
                alert('Invalid zipCode, please try again!');

            });
        formUserInfo.reset();
    } else {
        alert('Please enter zipCode!');
    }
}

/* Function to GET Web API Data*/
const getWeatherData = async(baseUrl, zipCode, apiKey) => {
    // call get weather info API
    const res = await fetch(`${baseUrl}?q=${zipCode}&appid=${apiKey}`);
    try {
        // return response data
        const data = await res.json();
        return data;
    } catch (error) {
        console.log('error', error);
    }
};

/* Function to POST data */
const postData = async(url, data) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            temp: data.temp,
            date: data.date,
            content: data.content
        })
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log(error);
    }
};

/* Function to update UI of my webpage */
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json();
        console.log(allData);
        // Write updated data to DOM elements
        if (allData.date !== undefined && allData.temp !== undefined && allData.content !== undefined) {
            document.getElementById('date').innerHTML = allData.date;
            document.getElementById('temp').innerHTML = Math.round(allData.temp) + ' degree F';
            document.getElementById('content').innerHTML = allData.content;
        }
    } catch (error) {
        console.log('error', error);
    }
};
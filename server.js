// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// App routes
app.get('/all', getInfo);
app.post('/add', addInfo);

// For GET '/all'
function getInfo(req, res) {
    res.send(projectData);
};

// For POST '/add'
function addInfo(req, res) {
    projectData['temp'] = req.body.temp;
    projectData['date'] = req.body.date;
    projectData['content'] = req.body.content;
    res.send(projectData);
}

// Setup Server
const port = 8083;
const server = app.listen(port, () => {
    console.log(`server is listening on port: ${port}`);
});
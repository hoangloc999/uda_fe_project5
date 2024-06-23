const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('dist'));

app.get('/', (req,res)=>{
    res.sendFile('dist/index.html')
})

app.get('/api/weather', async (req, res) => {
  const { lat, lng, apiKey } = req.query;
  try {
    const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.get('/api/image', async (req, res) => {
  const { location, apiKey } = req.query;
  try {
    const response = await fetch(`https://pixabay.com/api/?key=${apiKey}&q=${location}&image_type=photo`);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

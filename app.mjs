import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.set('view engine', 'ejs');

// Routes
app.get('/', (req, res) => {
  res.render('index', { weather: null });
});

app.get('/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = '1626422805e705624a7a4a661bc98f03'; // Replace with your OpenWeatherMap API key
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json();
    res.render('index', { weather: weatherData });
  } catch (err) {
    console.error(err);
    res.render('index', { weather: null });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

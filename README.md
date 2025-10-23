# 🌤️ Weather Forecast Application

A modern, responsive weather forecast application built with vanilla JavaScript, featuring real-time weather updates, 7-day forecasts, geolocation support, and text-to-speech capabilities.

![Weather App Banner](https://img.shields.io/badge/Weather-Forecast-blue?style=for-the-badge&logo=weather)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=for-the-badge&logo=javascript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### Core Features
- ✅ **Real-time Weather Data** - Get current weather conditions for any location worldwide
- ✅ **7-Day Forecast** - View detailed weather predictions for the week ahead
- ✅ **Geolocation Support** - Automatically detect and display weather for your current location
- ✅ **Search Functionality** - Search weather by city name or coordinates
- ✅ **Temperature Unit Toggle** - Switch between Celsius and Fahrenheit
- ✅ **Text-to-Speech** - Hear weather updates spoken aloud
- ✅ **Dynamic Backgrounds** - Background changes based on current weather conditions
- ✅ **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices

### Advanced Features
- 🔄 **Auto-refresh** - Weather data updates automatically every hour
- 💾 **Local Storage** - Saves recent searches and favorite locations
- 🎨 **Beautiful UI** - Modern glassmorphism design with smooth animations
- ♿ **Accessibility** - WCAG 2.1 compliant with keyboard navigation and screen reader support
- 📊 **Detailed Metrics** - Humidity, wind speed, pressure, and precipitation data
- 🌈 **Weather Icons** - Beautiful weather-specific icons for better visualization

## 🚀 Live Demo

[View Live Demo](#) <!-- Add your deployment URL here -->

## 📸 Screenshots

<!-- Add screenshots of your application here -->

## 🛠️ Technologies Used

- **Frontend Framework**: Vanilla JavaScript (ES6+)
- **Styling**: TailwindCSS 3.4
- **Weather API**: [WeatherAPI.com](https://www.weatherapi.com/)
- **Icons**: Weather Icons 2.0
- **Animations**: Animate.css 4.1
- **APIs Used**:
  - Geolocation API
  - Web Speech API
  - LocalStorage API
  - Fetch API

## 📋 Prerequisites

Before you begin, ensure you have:
- A modern web browser (Chrome, Firefox, Safari, Edge)
- A free API key from [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
- Basic knowledge of HTML, CSS, and JavaScript (for customization)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/weather-forecast.git
cd weather-forecast
```

### 2. Get Your API Key

1. Visit [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
2. Sign up for a free account
3. Copy your API key from the dashboard

### 3. Configure the Application

Open `app.js` and replace the API key:

```javascript
const CONFIG = {
    API_KEY: "YOUR_API_KEY_HERE", // Replace with your actual API key
    // ... other config
};
```

**For Production**: Consider using environment variables or a backend proxy to secure your API key.

### 4. Run the Application

#### Option 1: Using a Local Server (Recommended)

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

#### Option 2: Direct File Opening

Simply open `index-improved.html` in your web browser.

## 📁 Project Structure

```
weather-forecast/
├── index.html              # Original HTML file
├── index-improved.html     # Enhanced HTML with additional features
├── script.js              # Original JavaScript file
├── app.js                 # Refactored JavaScript with improvements
├── styles.css             # Original CSS file
├── styles-improved.css    # Enhanced CSS with better styling
├── config.js              # Configuration file
├── images/                # Weather background images
│   ├── BG-WEATHER.jpg
│   ├── CLOUD.jpg
│   ├── MIST.jpg
│   ├── RAINY.jpg
│   ├── SNOW.jpg
│   ├── SUNNY.jpg
│   └── WIND.jpg
├── .gitignore            # Git ignore file
├── .env.example          # Environment variables template
├── LICENSE               # License file
├── README.md             # Original README
└── README-IMPROVED.md    # This file
```

## 🎯 Usage

### Basic Usage

1. **Search by Location**: Enter a city name in the search bar and click "Search"
2. **Use Current Location**: Click the "📍 My Location" button
3. **Toggle Units**: Click the "°F" or "°C" button to switch temperature units
4. **Hear Forecast**: Click the "🔊" button to hear the weather spoken aloud

### Advanced Usage

#### Search by Coordinates
```
Enter: 40.7128,-74.0060
```

#### Search by ZIP Code (US)
```
Enter: 10001
```

#### Search by IP Address
```
Enter: auto:ip
```

## 🔑 Key Features Explained

### 1. Geolocation
The app uses the browser's Geolocation API to automatically detect your location and display relevant weather data.

### 2. Text-to-Speech
Utilizes the Web Speech API to read weather updates aloud, making the app more accessible.

### 3. Dynamic Backgrounds
Background images change based on weather conditions:
- ☀️ Sunny → Sunny background
- 🌧️ Rainy → Rainy background
- ❄️ Snowy → Snowy background
- ☁️ Cloudy → Cloudy background
- 🌫️ Misty → Misty background
- 💨 Windy → Windy background

### 4. Local Storage
- Saves your last 5 searched locations
- Stores favorite locations
- Remembers temperature unit preference

## 🎨 Customization

### Change Default Location

In `app.js`, modify:
```javascript
const CONFIG = {
    DEFAULT_LOCATION: "Your City", // Change this
    // ...
};
```

### Modify Update Interval

```javascript
const CONFIG = {
    UPDATE_INTERVAL: 3600000, // Change to desired milliseconds
    // ...
};
```

### Add Custom Weather Advice

In `app.js`, find the `getWeatherAdvice()` function and add your custom messages:

```javascript
const adviceMap = {
    rain: "Your custom rainy day advice",
    // ... add more
};
```

## 🐛 Troubleshooting

### Issue: Weather data not loading

**Solution**: 
- Check your API key is correct
- Ensure you have an active internet connection
- Check browser console for error messages
- Verify API key hasn't exceeded rate limits (free tier: 1M calls/month)

### Issue: Geolocation not working

**Solution**:
- Ensure you're using HTTPS (required for geolocation)
- Check browser permissions for location access
- Try using a different browser

### Issue: Speech not working

**Solution**:
- Check browser compatibility (Chrome, Edge work best)
- Ensure volume is not muted
- Try clicking the speak button after page load

## 📊 API Rate Limits

WeatherAPI.com Free Tier:
- 1,000,000 calls per month
- 1 call per second
- 3-day forecast included
- Real-time weather data

## 🚀 Deployment

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select branch and folder
4. Save and wait for deployment

### Deploy to Netlify

1. Connect your GitHub repository
2. Set build command: (none needed for static site)
3. Set publish directory: `/`
4. Deploy!

### Deploy to Vercel

```bash
npm i -g vercel
vercel
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Your Name**
- GitHub: [@yourusername](https://github.com/yourusername)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- Portfolio: [yourwebsite.com](https://yourwebsite.com)

## 🙏 Acknowledgments

- Weather data provided by [WeatherAPI.com](https://www.weatherapi.com/)
- Icons from [Weather Icons](https://erikflowers.github.io/weather-icons/)
- Animations from [Animate.css](https://animate.style/)
- Styling framework: [TailwindCSS](https://tailwindcss.com/)

## 📈 Future Enhancements

- [ ] Add hourly forecast view
- [ ] Implement weather alerts and warnings
- [ ] Add weather maps and radar
- [ ] Support for multiple languages
- [ ] Dark/Light mode toggle
- [ ] Weather comparison between cities
- [ ] Historical weather data
- [ ] Air quality index (AQI)
- [ ] UV index and sun times
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode with cached data
- [ ] Weather widgets for embedding

## 📞 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact me via email: your.email@example.com
- Check the [FAQ section](#) (if available)

## ⭐ Show Your Support

If you found this project helpful, please give it a ⭐ on GitHub!

---

**Made with ❤️ and ☕ by [Your Name]**

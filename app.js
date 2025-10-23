// Weather App - Improved Version
// Author: Your Name
// Description: A modern weather forecast application with advanced features

console.log("Weather App Initialized");

// ==================== CONFIGURATION ====================
const CONFIG = {
    API_KEY: "916d42d7410749c1b01164030251901",
    BASE_URL: "https://api.weatherapi.com/v1/forecast.json",
    DEFAULT_LOCATION: "Bangalore",
    FORECAST_DAYS: 3, // Free tier supports 3 days, paid tier up to 14 days
    UPDATE_INTERVAL: 3600000, // 1 hour
};

// ==================== STATE MANAGEMENT ====================
const appState = {
    currentLocation: CONFIG.DEFAULT_LOCATION,
    currentData: null,
    isCelsius: true,
    favorites: JSON.parse(localStorage.getItem('favorites')) || [],
    recentSearches: JSON.parse(localStorage.getItem('recentSearches')) || [],
};

// ==================== UTILITY FUNCTIONS ====================

/**
 * Get weather icon class based on condition
 * @param {string} condition - Weather condition text
 * @returns {string} Icon class name
 */
function getWeatherIcon(condition) {
    const conditionLower = condition.toLowerCase();
    const iconMap = {
        sunny: "wi-day-sunny",
        clear: "wi-day-sunny",
        rain: "wi-rain",
        drizzle: "wi-sprinkle",
        cloudy: "wi-cloudy",
        overcast: "wi-cloudy",
        snow: "wi-snow",
        mist: "wi-fog",
        fog: "wi-fog",
        windy: "wi-strong-wind",
        thunderstorm: "wi-thunderstorm",
        thunder: "wi-thunderstorm",
    };

    for (const [key, icon] of Object.entries(iconMap)) {
        if (conditionLower.includes(key)) {
            return icon;
        }
    }
    return "wi-na";
}

/**
 * Get weather advice based on condition
 * @param {string} condition - Weather condition text
 * @returns {string} Weather advice
 */
function getWeatherAdvice(condition) {
    const conditionLower = condition.toLowerCase();
    
    const adviceMap = {
        rain: "Today's forecast looks rainy. Don't forget your umbrella!",
        sunny: "It's sunny outside! Wear sunscreen and stay hydrated.",
        clear: "Beautiful clear skies ahead! Perfect day to go outside.",
        snow: "Snowy weather ahead! Bundle up and stay warm.",
        cloudy: "Cloudy skies today. It's a good idea to carry a light jacket.",
        windy: "It's quite windy! Hold on to your hat and secure loose items.",
        mist: "Misty conditions ahead. Drive carefully and stay visible.",
        fog: "Foggy weather. Reduce speed and use fog lights if driving.",
        thunderstorm: "Thunderstorms expected! Stay indoors and stay safe.",
    };

    for (const [key, advice] of Object.entries(adviceMap)) {
        if (conditionLower.includes(key)) {
            return advice;
        }
    }
    return "Have a wonderful day!";
}

/**
 * Get random motivational message
 * @returns {string} Random message
 */
function getRandomMessage() {
    const messages = [
        "Let's make today amazing!",
        "Wishing you a fantastic day!",
        "Hope you have a great day ahead!",
        "Stay positive and enjoy your day!",
        "Make the most of today!",
    ];
    return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Update background image based on weather condition
 * @param {string} condition - Weather condition text
 */
function updateBackground(condition) {
    const body = document.body;
    const conditionLower = condition.toLowerCase();
    
    const backgroundMap = {
        rain: "./images/RAINY.jpg",
        sunny: "./images/SUNNY.jpg",
        clear: "./images/SUNNY.jpg",
        snow: "./images/SNOW.jpg",
        cloudy: "./images/CLOUD.jpg",
        windy: "./images/WIND.jpg",
        mist: "./images/MIST.jpg",
        fog: "./images/MIST.jpg",
    };

    let backgroundImage = "./images/BG-WEATHER.jpg";
    
    for (const [key, image] of Object.entries(backgroundMap)) {
        if (conditionLower.includes(key)) {
            backgroundImage = image;
            break;
        }
    }

    body.style.background = `url('${backgroundImage}') no-repeat center center fixed`;
    body.style.backgroundSize = "cover";
}

/**
 * Convert temperature between Celsius and Fahrenheit
 * @param {number} temp - Temperature value
 * @param {boolean} toCelsius - Convert to Celsius if true, to Fahrenheit if false
 * @returns {number} Converted temperature
 */
function convertTemperature(temp, toCelsius) {
    return toCelsius ? temp : (temp * 9/5) + 32;
}

/**
 * Format temperature with unit
 * @param {number} tempC - Temperature in Celsius
 * @returns {string} Formatted temperature
 */
function formatTemperature(tempC) {
    const temp = appState.isCelsius ? tempC : convertTemperature(tempC, false);
    const unit = appState.isCelsius ? "°C" : "°F";
    return `${Math.round(temp)}${unit}`;
}

// ==================== UI FUNCTIONS ====================

/**
 * Show loading state
 */
function showLoading() {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <div class="flex items-center justify-center p-8">
            <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
        </div>
        <p class="mt-4 text-lg">Loading weather data...</p>
    `;
}

/**
 * Show error message
 * @param {string} message - Error message to display
 */
function showError(message) {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = `
        <div class="p-6 bg-red-500 bg-opacity-80 rounded-lg">
            <i class="wi wi-alien text-6xl mb-4"></i>
            <h3 class="text-2xl font-bold mb-2">Oops!</h3>
            <p class="text-lg">${message}</p>
            <button onclick="fetchWeather('${CONFIG.DEFAULT_LOCATION}')" 
                    class="mt-4 bg-white text-red-500 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
                Try Default Location
            </button>
        </div>
    `;
}

/**
 * Display current weather data
 * @param {Object} data - Weather data from API
 */
function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    const condition = data.current.condition.text;
    const temperature = data.current.temp_c;
    const advice = getWeatherAdvice(condition);
    const message = getRandomMessage();
    const conditionIcon = getWeatherIcon(condition);

    weatherInfo.innerHTML = `
        <div class="animate__animated animate__fadeIn">
            <h2 class="text-3xl font-bold mb-2">
                ${data.location.name}, ${data.location.country}
            </h2>
            <p class="text-sm opacity-80 mb-4">
                ${data.location.region} • Last updated: ${new Date(data.current.last_updated).toLocaleTimeString()}
            </p>
            <div class="flex items-center justify-center gap-4 mb-4">
                <i class="wi ${conditionIcon} text-8xl animate__animated animate__zoomIn"></i>
                <div class="text-left">
                    <p class="text-6xl font-bold">${formatTemperature(temperature)}</p>
                    <p class="text-xl">${condition}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-sm">
                <div class="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                    <i class="wi wi-humidity text-2xl"></i>
                    <p class="font-bold mt-1">${data.current.humidity}%</p>
                    <p class="opacity-80">Humidity</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                    <i class="wi wi-strong-wind text-2xl"></i>
                    <p class="font-bold mt-1">${data.current.wind_kph} km/h</p>
                    <p class="opacity-80">Wind Speed</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                    <i class="wi wi-barometer text-2xl"></i>
                    <p class="font-bold mt-1">${data.current.pressure_mb} mb</p>
                    <p class="opacity-80">Pressure</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg backdrop-blur-sm">
                    <i class="wi wi-raindrop text-2xl"></i>
                    <p class="font-bold mt-1">${data.current.precip_mm} mm</p>
                    <p class="opacity-80">Precipitation</p>
                </div>
            </div>
            <div class="mt-6 p-4 bg-white bg-opacity-20 rounded-lg backdrop-blur-sm">
                <p class="text-lg mb-2">💡 ${advice}</p>
                <p class="text-md opacity-90">✨ ${message}</p>
            </div>
        </div>
    `;

    updateBackground(condition);
    appState.currentData = data;
}

/**
 * Display 7-day forecast
 * @param {Array} forecastDays - Array of forecast day objects
 */
function displayForecast(forecastDays) {
    const forecastContainer = document.getElementById("forecast");
    
    let forecastHTML = '<h3 class="text-2xl font-bold mb-6 text-center">3-Day Forecast</h3><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">';

    forecastDays.forEach(day => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        forecastHTML += `
            <div class="forecast-card animate__animated animate__fadeInUp">
                <p class="font-bold text-lg">${dayName}</p>
                <p class="text-sm opacity-80 mb-2">${dateStr}</p>
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}" class="mx-auto w-16 h-16" />
                <p class="text-sm mt-2">${day.day.condition.text}</p>
                <p class="font-bold text-lg mt-2">${formatTemperature(day.day.maxtemp_c)}</p>
                <p class="text-sm opacity-80">${formatTemperature(day.day.mintemp_c)}</p>
            </div>
        `;
    });

    forecastHTML += '</div>';
    forecastContainer.innerHTML = forecastHTML;
}

// ==================== SPEECH SYNTHESIS ====================

/**
 * Speak weather greeting and forecast
 * @param {Object} data - Weather data from API
 */
function speakWeatherGreeting(data) {
    // Check if data exists
    if (!data || !data.current) {
        alert("Please search for a location first!");
        return;
    }
    
    const condition = data.current.condition.text;
    const temperature = data.current.temp_c;
    const location = data.location.name;
    
    const now = new Date();
    const hours = now.getHours();
    let greeting = hours < 12 ? "Good Morning!" : hours < 18 ? "Good Afternoon!" : "Good Evening!";
    
    const advice = getWeatherAdvice(condition);
    
    // Format temperature for clear speech
    const temp = Math.round(appState.isCelsius ? temperature : convertTemperature(temperature, false));
    const unit = appState.isCelsius ? "degrees Celsius" : "degrees Fahrenheit";
    
    // Create clear, natural speech text
    const textToRead = `${greeting} The weather in ${location} is ${condition}, with a temperature of ${temp} ${unit}. ${advice}`;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const speech = new SpeechSynthesisUtterance(textToRead);
    speech.lang = 'en-US'; // Set language to US English
    
    // Set voice preferences - prioritize English voices
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
        (voice.lang.startsWith('en') && voice.name.includes("Google")) ||
        (voice.lang.startsWith('en') && voice.name.includes("Female")) ||
        (voice.lang.startsWith('en-US')) ||
        (voice.lang.startsWith('en-GB'))
    ) || voices.find(voice => voice.lang.startsWith('en')) || voices[0];
    
    if (preferredVoice) {
        speech.voice = preferredVoice;
    }
    
    // Natural human-like speech settings
    speech.pitch = 1.1;  // Slightly higher pitch for more natural sound
    speech.rate = 1.15;  // Faster rate for natural conversation pace
    speech.volume = 1.0; // Full volume
    
    window.speechSynthesis.speak(speech);
}

/**
 * Wrapper function for speak button - uses current app data
 */
function speakCurrentWeather() {
    if (appState.currentData) {
        speakWeatherGreeting(appState.currentData);
    } else {
        alert("Please search for a location first!");
    }
}

// ==================== API FUNCTIONS ====================

/**
 * Fetch weather data from API
 * @param {string} location - Location to fetch weather for
 */
async function fetchWeather(location = CONFIG.DEFAULT_LOCATION) {
    try {
        showLoading();
        
        const response = await fetch(
            `${CONFIG.BASE_URL}?key=${CONFIG.API_KEY}&q=${location}&days=${CONFIG.FORECAST_DAYS}&aqi=yes`
        );
        
        if (!response.ok) {
            throw new Error("Location not found or API error");
        }

        const data = await response.json();
        
        // Update state
        appState.currentLocation = location;
        
        // Add to recent searches
        addToRecentSearches(location);
        
        // Display data
        displayWeather(data);
        displayForecast(data.forecast.forecastday);
        
        // Speak greeting (optional - can be toggled)
        // speakWeatherGreeting(data);
        
    } catch (error) {
        console.error("Error fetching weather data:", error);
        showError("Unable to fetch weather data. Please check the location and try again.");
    }
}

/**
 * Get user's current location using Geolocation API
 */
function getCurrentLocation() {
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
        return;
    }

    showLoading();
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather(`${latitude},${longitude}`);
        },
        (error) => {
            console.error("Geolocation error:", error);
            showError("Unable to get your location. Please enter a location manually.");
        }
    );
}

// ==================== LOCAL STORAGE FUNCTIONS ====================

/**
 * Add location to recent searches
 * @param {string} location - Location to add
 */
function addToRecentSearches(location) {
    // Remove if already exists
    appState.recentSearches = appState.recentSearches.filter(loc => 
        loc.toLowerCase() !== location.toLowerCase()
    );
    
    // Add to beginning
    appState.recentSearches.unshift(location);
    
    // Keep only last 5
    appState.recentSearches = appState.recentSearches.slice(0, 5);
    
    // Save to localStorage
    localStorage.setItem('recentSearches', JSON.stringify(appState.recentSearches));
}

/**
 * Toggle favorite location
 * @param {string} location - Location to toggle
 */
function toggleFavorite(location) {
    const index = appState.favorites.indexOf(location);
    
    if (index > -1) {
        appState.favorites.splice(index, 1);
    } else {
        appState.favorites.push(location);
    }
    
    localStorage.setItem('favorites', JSON.stringify(appState.favorites));
}

// ==================== EVENT HANDLERS ====================

/**
 * Handle search button click
 */
function handleSearch() {
    const locationInput = document.getElementById("location-input");
    const location = locationInput.value.trim();
    
    if (location) {
        fetchWeather(location);
        locationInput.value = "";
    } else {
        alert("Please enter a location!");
    }
}

/**
 * Toggle temperature unit
 */
function toggleUnit() {
    appState.isCelsius = !appState.isCelsius;
    
    // Re-display current data with new unit
    if (appState.currentData) {
        displayWeather(appState.currentData);
        displayForecast(appState.currentData.forecast.forecastday);
    }
    
    // Update button text
    const unitBtn = document.getElementById("unit-toggle");
    if (unitBtn) {
        unitBtn.textContent = appState.isCelsius ? "°F" : "°C";
    }
}

/**
 * Update time and date display
 */
function updateTimeDate() {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        second: '2-digit'
    });
    const dateStr = now.toLocaleDateString('en-US', { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    const timeElement = document.getElementById("time-date");
    if (timeElement) {
        timeElement.innerHTML = `<span class="font-bold">${timeStr}</span> • ${dateStr}`;
    }
}

// ==================== INITIALIZATION ====================

/**
 * Initialize the application
 */
function initApp() {
    // Set up event listeners
    const searchBtn = document.getElementById("search-btn");
    const locationInput = document.getElementById("location-input");
    
    if (searchBtn) {
        searchBtn.addEventListener("click", handleSearch);
    }
    
    if (locationInput) {
        locationInput.addEventListener("keypress", (e) => {
            if (e.key === "Enter") {
                handleSearch();
            }
        });
    }
    
    // Start time updates
    setInterval(updateTimeDate, 1000);
    updateTimeDate();
    
    // Load voices for speech synthesis
    window.speechSynthesis.getVoices();
    
    // Fetch default weather
    fetchWeather(CONFIG.DEFAULT_LOCATION);
    
    // Set up periodic updates (every hour)
    setInterval(() => {
        fetchWeather(appState.currentLocation);
    }, CONFIG.UPDATE_INTERVAL);
}

// Start the app when DOM is ready
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}

// Export functions for global access
window.fetchWeather = fetchWeather;
window.getCurrentLocation = getCurrentLocation;
window.toggleUnit = toggleUnit;
window.speakWeatherGreeting = speakWeatherGreeting;
window.speakCurrentWeather = speakCurrentWeather;

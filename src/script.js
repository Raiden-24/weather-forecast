console.log("Weather App Initialized");

// Update the API key and base URL for forecast
const API_KEY = "916d42d7410749c1b01164030251901"; 
const BASE_URL = "https://api.weatherapi.com/v1/forecast.json";

function getWeatherIcon(condition) {
    const icons = {
        sunny: "wi-day-sunny",
        rain: "wi-rain",
        cloudy: "wi-cloudy",
        snow: "wi-snow",
        mist: "wi-fog",
        windy: "wi-strong-wind",
    };

    for (let key in icons) {
        if (condition.includes(key)) {
            return icons[key];
        }
    }
    return "wi-na"; // Default icon
}


// Function to display weather data
// Function to display weather data
function displayWeather(data) {
    const weatherInfo = document.getElementById("weather-info");
    const condition = data.current.condition.text.toLowerCase(); // Get weather condition
    const temperature = data.current.temp_c;
    let advice = "";
    let goodWish = "";

    // Define weather-based advice
    if (condition.includes("rain")) {
        advice = "Today's forecast looks rainy. Don't forget your umbrella! Looking for another beautiful day, here in the city!!!";
        } else if (condition.includes("sunny")) {
        advice = "It's sunny outside! Wear sunscreen and stay hydrated. Looking for another beautiful day, here in the city!!!";
        } else if (condition.includes("snow")) {
        advice = "Snowy weather foreseen! Make sure you have your hoodie on and stay warm. Looking for another beautiful day, here in the city!!!";
        } else if (condition.includes("cloudy")) {
        advice = "Clouds just started off in the sky. It's a good idea to carry a light jacket. Looking for another beautiful day, here in the city!!!";
        } else if (condition.includes("windy")) {
        advice = " wind and waves forecast for kiters, surfers, paragliders! Hold on to your hat! Looking for another beautiful day, here in the city!!!";
        } else if (condition.includes("mist")) {
            advice = "The air is thick with moisture, and there's just barely a light rain !! Looking for another beautiful day, here in the city!!!"
        } else {
        advice = "Looking for another beautiful day, here in the city!!!";
        }

    // Define random good wishes
    const goodWishes = [
    "Lets do something new today!!",
    "Hoping for a fine day in the city.",
    "Wishing for a beautiful day in town.",
    "Let's see if the city has a surprise for us today.",
    "Checking the forecast for a perfect city day.",
    ];

    // Randomly select a good wish
    goodWish = goodWishes[Math.floor(Math.random() * goodWishes.length)];

    const conditionIcon = getWeatherIcon(condition);
weatherInfo.innerHTML = `
<h2 class="animate__animated animate__fadeInDown">${data.location.name}, ${data.location.country}</h2>
<p class="animate__animated animate__fadeIn">${temperature}°C</p>
<p class="animate__animated animate__fadeIn">${data.current.condition.text}</p>
<i class="wi ${conditionIcon} animate__animated animate__zoomIn"></i>
<p class="animate__animated animate__fadeInUp">${advice}</p>
<p class="animate__animated animate__fadeInUp">${goodWish}</p>
`;

updateBackground(condition);


}

// Function to speak the greeting and weather update
function speakWeatherGreeting(data) {
    const condition = data.current.condition.text.toLowerCase(); // Get the weather condition
    const temperature = data.current.temp_c;
    let greeting = "";
    let advice = "";

    const now = new Date();
    const hours = now.getHours();
    if (hours < 12) {
    greeting = "Goooooood Morning Amruth!! !";
    } else {
    greeting = "Goooooooood Evening Champ!";
    }

    // Define weather-based advice
    if (condition.includes("rain")) {
    advice = "Today's forecast looks rainy. Don't forget your umbrella! Looking for another beautiful day, here in the city!!!";
    } else if (condition.includes("sunny")) {
    advice = "It's sunny outside! Wear sunscreen and stay hydrated. Looking for another beautiful day, here in the city!!!";
    } else if (condition.includes("snow")) {
    advice = "Snowy weather foreseen! Make sure you have your hoodie on and stay warm. Looking for another beautiful day, here in the city!!!";
    } else if (condition.includes("cloudy")) {
    advice = "Clouds just started off in the sky. It's a good idea to carry a light jacket. Looking for another beautiful day, here in the city!!!";
    } else if (condition.includes("windy")) {
    advice = " wind and waves forecast for kiters, surfers, paragliders! Hold on to your hat! Looking for another beautiful day, here in the city!!!";
    } else if (condition.includes("mist")) {
        advice = "The air is thick with moisture, and there's just barely a light rain !! Looking for another beautiful day, here in the city!!!"
    } else {
    advice = "Looking for another beautiful day, here in the city!!!";
    }

    const textToRead = `${greeting} Today's forecast is ${temperature} degrees with ${condition}. ${advice} `;
    window.speechSynthesis.cancel();
    // Using the Web Speech API to read out the weather and greeting
    const speech = new SpeechSynthesisUtterance(textToRead);

    // Stop any ongoing speech


    // Get all available voices and select a preferred one
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find((voice) => voice.name.includes("Google UK English Female")) || voices[0];
    if (preferredVoice) {
    speech.voice = preferredVoice;
    }
    
    speech.pitch = 0.7; // Slightly higher pitch
    speech.rate = 1.0;  // Slightly slower rate for clear enunciation
    // Speak the weather details
    window.speechSynthesis.speak(speech);
}

function updateBackground(condition) {
    const body = document.body;
    if (condition.includes("rain")) {
        body.style.background = "url('./images/RAINY.jpg') no-repeat center center fixed";
    } else if (condition.includes("sunny")) {
        body.style.background = "url('./images/SUNNY.jpg') no-repeat center center fixed";
    } else if (condition.includes("snow")) {
        body.style.background = "url('./images/SNOW.jpg') no-repeat center center fixed";
    } else if (condition.includes("cloudy")) {
        body.style.background = "url('./images/CLOUD.jpg') no-repeat center center fixed";
    }  else if (condition.includes("windy")) {
        body.style.background = "url('./images/WIND.jpg') no-repeat center center fixed";
    }  else if (condition.includes("mist")) {
        body.style.background = "url('./images/MIST.jpg') no-repeat center center fixed";
    } else {
        body.style.background = "url('./images/BG-WEATHER.jpg') no-repeat center center fixed";
    }
    body.style.backgroundSize = "cover";
}


// Function to display 7-day forecast
function displayForecast(forecastDays) {
const weatherInfo = document.getElementById("weather-info");

let forecastHTML = `<h3 class="text-xl font-bold mt-6">7-Day Forecast</h3><div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">`;

forecastDays.forEach(day => {
    forecastHTML += `
    <div class="bg-white text-black p-4 rounded shadow">
        <p class="font-bold">${new Date(day.date).toLocaleDateString()}</p>
        <img src="${day.day.condition.icon}" alt="Weather Icon" class="mx-auto" />
        <p>${day.day.condition.text}</p>
        <p>Max: ${day.day.maxtemp_c}°C</p>
        <p>Min: ${day.day.mintemp_c}°C</p>
    </div>
    `;
});

forecastHTML += `</div>`;
weatherInfo.innerHTML += forecastHTML;
}

// Function to fetch weather data
async function fetchWeather(location = "Bangalore") {
try {
    // Change the URL to call forecast.json with 'days' parameter for 7-day forecast
    const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${location}&days=7&aqi=no`);
    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();
    
    // Display weather data and 7-day forecast
    displayWeather(data);
    displayForecast(data.forecast.forecastday); // Pass the correct forecast array
    speakWeatherGreeting(data);
} catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Error fetching weather data. Please check the location and try again.");
}
}

// Fetch weather data for default location on load and set hourly updates
function startWeatherUpdates(location = "Bangalore") {
// Fetch weather immediately
fetchWeather(location);

// Set interval to fetch weather every hour (3600000 milliseconds)
setInterval(() => {
    fetchWeather(location);
}, 3600000); // 1 hour in milliseconds
}

// Fetch and display weather for default location on load
document.getElementById("search-btn").addEventListener("click", () => {
const location = document.getElementById("location-input").value;
if (location) {
    startWeatherUpdates(location); // Start hourly updates for the entered location
} else {
    alert("Please enter a location!");
}
});


// Function to update time and date on the app
function updateTimeDate() {
const now = new Date();
const formattedTime = now.toLocaleTimeString();
const formattedDate = now.toLocaleDateString();
document.getElementById("time-date").innerText = `${formattedTime} - ${formattedDate}`;
}

setInterval(updateTimeDate, 1000); // Update every second
updateTimeDate(); // Initial call
// Start with the default location on page load
startWeatherUpdates();
// Fetch weather data for default location on load
fetchWeather();
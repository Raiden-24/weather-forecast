// Configuration file for API keys and constants
// In production, use environment variables or a secure backend

const CONFIG = {
    // For development: Replace with your API key
    // For production: Use a backend proxy to hide the API key
    API_KEY: "916d42d7410749c1b01164030251901",
    BASE_URL: "https://api.weatherapi.com/v1/forecast.json",
    DEFAULT_LOCATION: "Bangalore",
    FORECAST_DAYS: 7,
    UPDATE_INTERVAL: 3600000, // 1 hour in milliseconds
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}

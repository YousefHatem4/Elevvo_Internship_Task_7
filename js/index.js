var inputWeatherUser = document.getElementById('inputWeatherUser');
var inputWeatherBtn = document.getElementById('inputWeatherBtn');
var getLocationBtn = document.getElementById('getLocationBtn');
var weatherCardsContainer = document.getElementById('weatherCards');

var weather = [];
var locationName = '';

// Event Listeners
inputWeatherBtn.addEventListener('click', getWeather);
getLocationBtn.addEventListener('click', getLocationWeather);

// Load default weather (Cairo) on page load
window.addEventListener('load', function() {
    inputWeatherUser.value = 'Cairo';
    getWeather();
    inputWeatherUser.value = '';
});

async function getWeather() {
    showLoading();
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0fe97be6e9644c7aaf082114242611&q=${inputWeatherUser.value}&days=3`);
        var finalResult = await response.json();
        
        if (finalResult.error) {
            alert(finalResult.error.message);
            return;
        }
        
        locationName = finalResult.location.name;
        weather = finalResult.forecast.forecastday;
        display();
    } catch (error) {
        alert("Failed to fetch weather data. Please try again.");
        console.error(error);
    } finally {
        hideLoading();
    }
}

function display() {
    var cartona = '';

    weather.forEach((day, index) => {
        var [year, month, dayNumber] = day.date.split('-');
        var monthName = new Date(`${month}/1`).toLocaleString('en-US', { month: 'long' });
        var formattedDate = `${parseInt(dayNumber)} ${monthName}`;
        
        if (index === 0) {
            // Today's weather (large card)
            cartona += `
                <div class="col-12 col-md-4">
                    <div class="h-100 rounded-3">
                        <div class="d-flex justify-content-between align-items-center bg-card-1 color-font">
                            <p class="m-0 p-2">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                            <p class="m-0 p-2">${formattedDate}</p>
                        </div>
                        <div class="bg-card-2">
                            <div class="card-items">
                                <p class="color-font">${locationName}</p>
                                <h1 class="degree">${day.day.avgtemp_c}<sup>o</sup>C</h1>
                                <img src="https:${day.day.condition.icon}" class="width-image-card" alt="${day.day.condition.text}">
                                <p class="color-blue">${day.day.condition.text}</p>
                                <div class="d-flex flex-wrap justify-content-center">
                                    <div class="d-flex me-4 mb-2">
                                        <div><img src="./Images/images4.png" alt="Humidity"></div>
                                        <p class="ms-1 color-font">${day.day.avghumidity}%</p>
                                    </div>
                                    <div class="d-flex me-4 mb-2">
                                        <div><img src="./Images/images5.png" alt="Wind"></div>
                                        <p class="ms-1 color-font">${day.day.maxwind_kph} km/h</p>
                                    </div>
                                    <div class="d-flex me-4 mb-2">
                                        <div><img src="./Images/images6.png" alt="Direction"></div>
                                        <p class="ms-1 color-font">${day.day.wind_dir}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Forecast cards (smaller)
            var bgCard = index === 1 ? 'bg-card-4' : 'bg-card-5';
            var bgHeader = index === 1 ? 'bg-card-3' : 'bg-card-6';
            
            cartona += `
                <div class="col-12 col-md-4">
                    <div class="h-100 ${bgCard}">
                        <div class="text-center ${bgHeader} color-font">
                            <p class="m-0 p-2">${new Date(day.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                        </div>
                        <div class="mt-5">
                            <div class="card-items text-center">
                                <img src="https:${day.day.condition.icon}" class="width-image-card-2 mb-3 pt-5" alt="${day.day.condition.text}">
                                <p class="degree-2 p-0 m-0">${day.day.avgtemp_c}<sup>o</sup>C</p>
                                <p class="p-0 mb-3 color-font">${day.day.mintemp_c}<sup>o</sup></p>
                                <p class="color-blue">${day.day.condition.text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    weatherCardsContainer.innerHTML = cartona;
}

function getLocationWeather() {
    showLoading();
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;
                fetchWeatherByCoordinates(latitude, longitude);
            },
            error => {
                hideLoading();
                alert("Unable to retrieve your location. Please allow location access.");
                console.error(error);
            }
        );
    } else {
        hideLoading();
        alert("Geolocation is not supported by this browser.");
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    try {
        var response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0fe97be6e9644c7aaf082114242611&q=${lat},${lon}&days=3`);
        var finalResult = await response.json();
        
        if (finalResult.error) {
            alert(finalResult.error.message);
            return;
        }
        
        locationName = finalResult.location.name;
        weather = finalResult.forecast.forecastday;
        display();
    } catch (error) {
        alert("Failed to fetch weather data. Please try again.");
        console.error(error);
    } finally {
        hideLoading();
    }
}

function showLoading() {
    document.getElementById('loadingOverlay').style.display = 'flex';
}

function hideLoading() {
    document.getElementById('loadingOverlay').style.display = 'none';
}
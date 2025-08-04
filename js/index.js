var inputWeatherUser = document.getElementById('inputWeatherUser');
var inputWeatherBtn = document.getElementById('inputWeatherBtn');

var weather = [];
var locationName = '';

//!if i click call getWeather function
inputWeatherBtn.addEventListener('click', getWeather);

//! while its load make it cairo by default 
window.addEventListener('load', function () {
    inputWeatherUser.value = 'Cairo'; 
    getWeather(); 
    inputWeatherUser.value = ''
});

async function getWeather() {
    var x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0fe97be6e9644c7aaf082114242611&q=${inputWeatherUser.value}&days=3`);
    var finalResult = await x.json();
    locationName = finalResult.location.name;
    weather = finalResult.forecast.forecastday;
    display();
}  

function display() {
    var cartona = ``;

    // Access each day manually and display it
    var day1 = weather[0];
    var [year1, month1, dayNumber1] = day1.date.split('-');
    var monthName1 = new Date(`${month1}/1`).toLocaleString('en-US', { month: 'long' });
    var formattedDate1 = `${parseInt(dayNumber1)} ${monthName1}`;
    
    cartona += `
        <div class="col-12 col-md-4">
            <div class="h-100 rounded-3">
                <div class="d-flex justify-content-between align-items-center bg-card-1 color-font">
                    <p class="m-0 p-2">${new Date(day1.date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                    <p class="m-0 p-2">${formattedDate1}</p>
                </div>
                <div class="bg-card-2">
                    <div class="card-items">
                        <p class="color-font">${locationName}</p>
                        <h1 class="degree">${day1.day.avgtemp_c}<sup>o</sup>C</h1>
                        <img src="https:${day1.day.condition.icon}" class="width-image-card" alt="${day1.day.condition.text}">
                        <p class="color-blue">${day1.day.condition.text}</p>
                        <div class="d-flex">
                            <div class="d-flex me-4">
                                <div><img src="./Images/images4.png" alt=""></div>
                                <p class="ms-1 color-font">${day1.day.avghumidity}%</p>
                            </div>
                            <div class="d-flex me-4">
                                <div><img src="./Images/images5.png" alt=""></div>
                                <p class="ms-1 color-font">${day1.day.maxwind_kph} km/h</p>
                            </div>
                            <div class="d-flex me-4">
                                <div><img src="./Images/images6.png" alt=""></div>
                                <p class="ms-1 color-font">${day1.day.wind_dir}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="h-100 bg-card-4">
                <div class="text-center bg-card-3 color-font">
                    <p class="m-0 p-2">${new Date(weather[1].date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                </div>
                <div class="mt-5">
                    <div class="card-items text-center">
                        <img src="https:${weather[1].day.condition.icon}" class="width-image-card-2 mb-3 pt-5" alt="">
                        <p class="degree-2 p-0 m-0">${weather[1].day.avgtemp_c}<sup>o</sup>C</p>
                        <p class="p-0 mb-3 color-font">${weather[1].day.mintemp_c}<sup>o</sup>C</p>
                        <p class="color-blue">${weather[1].day.condition.text}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-12 col-md-4">
            <div class="h-100 bg-card-5">
                <div class="text-center bg-card-6 color-font">
                    <p class="m-0 p-2">${new Date(weather[2].date).toLocaleDateString('en-US', { weekday: 'long' })}</p>
                </div>
                <div class="mt-5">
                    <div class="card-items text-center">
                        <img src="https:${weather[2].day.condition.icon}" class="width-image-card-2 mb-3 pt-5" alt="">
                        <p class="degree-2 p-0 m-0">${weather[2].day.avgtemp_c}<sup>o</sup>C</p>
                        <p class="p-0 mb-3 color-font">${weather[2].day.mintemp_c}<sup>o</sup>C</p>
                        <p class="color-blue">${weather[2].day.condition.text}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.querySelector('.row').innerHTML = cartona;
}

var getLocationBtn = document.getElementById('getLocationBtn');

getLocationBtn.addEventListener('click', getLocationWeather);

function getLocationWeather() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    function successCallback(position) {
        var latitude = position.coords.latitude;
        var longitude = position.coords.longitude;
        fetchWeatherByCoordinates(latitude, longitude);
    }

    function errorCallback(error) {
        alert("Unable to retrieve your location. Please allow location access.");
    }
}

async function fetchWeatherByCoordinates(lat, lon) {
    var x = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=0fe97be6e9644c7aaf082114242611&q=${lat},${lon}&days=3`);
    var finalResult = await x.json();
    locationName = finalResult.location.name;
    weather = finalResult.forecast.forecastday;
    display();
}

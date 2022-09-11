# README.md


# WeatherDashboard
Acceptance Criteria

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city

# User Story
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly

# Links to my project
https://bennygabel.github.io/WeatherDashboard/

https://github.com/BennyGabel/WeatherDashboard

https://github.com/BennyGabel/assets/screenshot/Screenshot.jpg

![WeatherDashboard](https://github.com/BennyGabel/main/blob/main/assets/screenshot/Screenshot.jpg?raw=true)

# Other resources
Bootstrap
openweathermap API
Moment.js API

# Technical Aspects

HTML
- SearchForm
- Weather Class
  > Today
  > 5 day Forecast

Javascript
- Get reference for static elements
- When form is submited, state entered, call getOpenWeatherApi()
- getOpenWeatherApi()   Look for Latitud and Longitud of the state entered
- getOpenWeatherForecast()  Gets rest of information/forecast
  > If state entered was found, look if entry is in history, if not add it to localstorage anddisplay it


Other functions, proceses:
- convDate, Convert a date returned in unix timestamp to a time in JavaScript.  This function was created at the beginning of the project, it was replaced it from momente.js; still left as a learning reference
- addHistButtons	Creates and append Searched/History buttons into screen.
- saveSrcHist       Save searches into localstorage
- getSrcHist        Load searches from localstorage
- sort              Sort array/states
- histSearch.addEventListener("click", function(event) Event listener that extract state/hist searched and call getOpenWeatherApi function

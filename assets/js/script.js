searchFormEl   = document.getElementById("searchForm")
searchInputEl  = document.getElementById("searchInput")
searchButtonEl = document.getElementById("searchButton")

var keyApi = "e361c27c104db2a481a66d649df15118";

var aryToday = {};    // Today's date - weather
var ary5Fore = {};    // 5 days Forecast - Weather


var getOpenWeatherForecast = function(cSearch) {
  // cSearch receives data from  getOpenWeatherApi
  console.log("Second API Call");
  console.log(cSearch);
  console.log();

  var lat = cSearch[0].lat ;    ///   cSearch[0]['lat']
  var lon = cSearch[0].lon ;    ///   cSearch[0]['lon']
  var qryDays = 1 + 5;          ///   Today's day + 5 (additional) forecast days

  // var apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=${keyApi}`;

  // units=imperial    return temperature in Fahrnheit
  // var apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=6&units=imperial&appid=${keyApi}`;
  var apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=${qryDays}&units=imperial&appid=${keyApi}`;


  fetch(apiUrl2).then(function(resp_2) {
    // request was successful
    if (resp_2.ok) {
      resp_2.json().then(function(data2) {
      console.log("Displaying Data2");
      console.log(data2);

      // Will conver Unix Date to JavaScript
      // Weather's object: description, icon, id, main
      // Temp's object: day, eve, max, min, morn, night
      aryToday = {date: convDate(data2.list[0].dt),
                  weather: data2.list[0].weather,
                  temp: data2.list[0].temp,
                  humidity: data2.list[0].humidity,
                  mph: data2.list[0].speed}


                  //new Date(aryToday['date'])          
                  //                                                           Mon Sep 05 2022 12:00:00 GMT-0400 (Eastern Daylight Time)
                  // new Date(aryToday['date']).toDateString().split(" ")
                  //                                                           (4) ['Mon', 'Sep', '05', '2022']
                  //                                                           0                  :                   "Mon"
                  //                                                           1                  :                   "Sep"
                  //                                                           2                  :                   "05"
                  //                                                           3                  :                   "2022"
                  

      });
    }
    else {
      alert("There was a problem with your request!");
    }

  })
};



// WRONT !!!
var getOpenWeatherApi = function(event) {
    event.preventDefault()

    var userEntry = searchInputEl.value.trim()

    
    /* // WORKS for current weather 
    var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?lat=43.000351&lon=-75.499901&appid="+keyApi;  */

    //Template literals
    var apiUrl1 = `https://api.openweathermap.org/geo/1.0/direct?q=${userEntry}&limit=5&appid=${keyApi}`

    fetch(apiUrl1).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
          //  console.log(data);

          getOpenWeatherForecast(data)
            // displayIssues(data);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
    })
};


function convDate(pnUnix) {
  // Convert Unix timestamp to a time in JavaScript
  let unix = pnUnix;   /// i.e. 1507473344
  let retDate = new Date(unix*1000);

  return retDate
}


// Event listener 
searchFormEl.addEventListener("submit", getOpenWeatherApi) 



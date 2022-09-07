searchFormEl   = document.getElementById("searchForm")  ;
searchInputEl  = document.getElementById("searchInput") ;
searchButtonEl = document.getElementById("searchButton");


todayEl        = document.getElementById("Today")       ;
forc1El        = document.getElementById("For_Day_1")   ;
forc2El        = document.getElementById("For_Day_2")   ;
forc3El        = document.getElementById("For_Day_3")   ;
forc4El        = document.getElementById("For_Day_4")   ;
forc5El        = document.getElementById("For_Day_5")   ;


var keyApi = "e361c27c104db2a481a66d649df15118";

var aryToday = {};    // Today's date - weather
var ary5Fore = {};    // 5 days Forecast - Weather

var todaysDate = moment().format("YYYY-MM-DD");    // Extract Today's date from moment.js API

// todaysDtTm variable was intended for an URL not used in here, just tested with 
var todaysDtTm = todaysDate + "T12:00:00Z";        // To be used for UV extraction  


var getOpenWeatherForecast = function(cSearch) {
  // cSearch receives data from  getOpenWeatherApi
  // console.log("Second API Call");
  // console.log(cSearch);
  // console.log();

  // Extract Latitude and Longitude from City entered
  var lat = cSearch[0].lat ;    ///   cSearch[0]['lat']
  var lon = cSearch[0].lon ;    ///   cSearch[0]['lon']
  var qryDays = 1 + 5;          ///   Today's day + 5 (additional) forecast days

  var todaysUv = 0;


// Will Extract UV
var apiUv =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${keyApi}`; 


fetch(apiUv).then(function(resp_uv) {
  if (resp_uv.ok) {
    resp_uv.json().then(function(data_uv) {
        todaysUv = data_uv.current.uvi;
    })
  }
})


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

      // document.getElementById("today").textContent = aryToday.date;



      // aryCurDate will be replaced by        var todaysDate = moment().format("YYYY-MM-DD");    // Extract Today's date from moment.js API
      // aryCurDate = Date(aryToday.date).split(" ")    /// Array Current Date      


      const para = document.createElement("p");
      para.innerText = "This is a paragraph";
      todayEl.appendChild(para);




    });
    }
    else {
      alert("There was a problem with your request!");
    }

  })
};



var getOpenWeatherApi = function(event) {
    event.preventDefault()

    var userEntry = searchInputEl.value.trim()

    
    /* // WORKS for current weather 
    var apiUrl1 = "https://api.openweathermap.org/data/2.5/weather?lat=43.000351&lon=-75.499901&appid="+keyApi;  */

    // Will call API with City's name
    // Template will use literals
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



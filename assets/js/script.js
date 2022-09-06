searchFormEl   = document.getElementById("searchForm")
searchInputEl  = document.getElementById("searchInput")
searchButtonEl = document.getElementById("searchButton")

var keyApi = "e361c27c104db2a481a66d649df15118";

var getOpenWeatherForecast = function(cSearch) {
  // cSearch receives data from  getOpenWeatherApi
  console.log("Second API Call");
  console.log(cSearch);
  console.log();

  var lat = cSearch[0].lat ;    ///   cSearch[0]['lat']
  var lon = cSearch[0].lon ;    ///   cSearch[0]['lon']

  // var apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&appid=${keyApi}`;

  // units=imperial    return temperature in Fahrnheit
  var apiUrl2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lat}&lon=${lon}&cnt=5&units=imperial&appid=${keyApi}`;
  

  fetch(apiUrl2).then(function(resp_2) {
    // request was successful
    if (resp_2.ok) {
      resp_2.json().then(function(data2) {
        console.log("Displaying Data2");
        console.log(data2);


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





// Event listener 
searchFormEl.addEventListener("submit", getOpenWeatherApi) 








// function getApi() {
//     // Replace `octocat` with anyone else's GitHub username
//     keyApi = "e361c27c104db2a481a66d649df15118";
//     var apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=43.000000&lon=-75.000000&&appid="+keyApi;
//     // var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=43.000000&lon=-75.000000&appid="+keyApi;
//     fetch(apiUrl)
//       .then(function(response) {
//         console.log(response);
//         return response.json();
//       });
// }
//  getApi();
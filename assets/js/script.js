var getOpenWeatherApi = function(repo) {
    console.log(repo);

    // // // var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc"; 
/*   var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}   */
    keyApi = "e361c27c104db2a481a66d649df15118";
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=43.000000&lon=-75.000000&&appid="+keyApi;

    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {
            //console.log(data);
            displayIssues(data);
          });
        }
        else {
          alert("There was a problem with your request!");
        }
    })
};

getOpenWeatherApi()
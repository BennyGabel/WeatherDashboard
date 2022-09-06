alert('Hi');

var lat = 40.7127281;
var lon = -74.0060152;
var today = '2022-09-06'

var keyApi = "e361c27c104db2a481a66d649df15118";





// // var apiUv = `https://api.openweathermap.org/data/2.5/uvi?appid=${keyApi}&lat=${lat}&lon=${lon}`
// var apiUv = `http://api.openweathermap.org/v3/uvi/{location}/{datetime}.json?appid={api_key}

// `https://api.openweathermap.org/data/2.5/uvi?appid=${apiKey1}&lat=${lat}&lon=${lon}`;
// var apiUv = `http://api.openweathermap.org/v3/uvi/lat=${lat}&lon=${lon}/${today}.json?appid=${keyApi}`    /// NOT WORKING

//var apiUv =`https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=${keyApi}`; 
var apiUv =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${keyApi}`; 


fetch(apiUv).then(function(resp_uv) {
  if (resp_uv.ok) {
    resp_uv.json().then(function(data_uv) {
        idxUv = data_uv.current.uvi

    })
  }
})

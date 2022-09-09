searchFormEl   = document.getElementById("searchForm")  ;
searchInputEl  = document.getElementById("searchInput") ;
searchButtonEl = document.getElementById("searchButton");
histSearchEl   = document.getElementById("histSearch")  ;

// Static Elements
// todayEl        = document.getElementById("Today")       ;   NOT USED
// forc1El        = document.getElementById("For_Day_1")   ;   NOT USED
// forc2El        = document.getElementById("For_Day_2")   ;   NOT USED
// forc3El        = document.getElementById("For_Day_3")   ;   NOT USED
// forc4El        = document.getElementById("For_Day_4")   ;   NOT USED
// forc5El        = document.getElementById("For_Day_5")   ;   NOT USED

td0DateEl      = document.getElementById("Today_Date")  ;
td0TempEl      = document.getElementById("Today_Temp")  ;
td0WindEl      = document.getElementById("Today_Wind")  ;
td0HumidEl     = document.getElementById("Today_Humid") ;
td0UvEl        = document.getElementById("Today_UV"   ) ;

fc1DateEl      = document.getElementById("Fore1_Date")  ;
fc1ImageEl     = document.getElementById("Fore1_Img")   ;
fc1TempEl      = document.getElementById("Fore1_Temp")  ;
fc1WindEl      = document.getElementById("Fore1_Wind")  ;
fc1HumidEl     = document.getElementById("Fore1_Humid") ;

fc2DateEl      = document.getElementById("Fore2_Date")  ;
fc2ImageEl     = document.getElementById("Fore2_Img")   ;
fc2TempEl      = document.getElementById("Fore2_Temp")  ;
fc2WindEl      = document.getElementById("Fore2_Wind")  ;
fc2HumidEl     = document.getElementById("Fore2_Humid") ;

fc3DateEl      = document.getElementById("Fore3_Date")  ;
fc3ImageEl     = document.getElementById("Fore3_Img")   ;
fc3TempEl      = document.getElementById("Fore3_Temp")  ;
fc3WindEl      = document.getElementById("Fore3_Wind")  ;
fc3HumidEl     = document.getElementById("Fore3_Humid") ;

fc4DateEl      = document.getElementById("Fore4_Date")  ;
fc4ImageEl     = document.getElementById("Fore4_Img")   ;
fc4TempEl      = document.getElementById("Fore4_Temp")  ;
fc4WindEl      = document.getElementById("Fore4_Wind")  ;
fc4HumidEl     = document.getElementById("Fore4_Humid") ;

fc5DateEl      = document.getElementById("Fore5_Date")  ;
fc5ImageEl     = document.getElementById("Fore5_Img")   ;
fc5TempEl      = document.getElementById("Fore5_Temp")  ;
fc5WindEl      = document.getElementById("Fore5_Wind")  ;
fc5HumidEl     = document.getElementById("Fore5_Humid") ;

// Search History
var histSearched = [];




// var userEntry  = searchInputEl.value.trim()             ;

var keyApi     = "e361c27c104db2a481a66d649df15118"     ;

var aryToday = {};    // Today's date - weather
var ary5Fore = {};    // 5 days Forecast - Weather

var todaysDate = moment().format("YYYY-MM-DD");    // Extract Today's date from moment.js API
var todays_mdy = moment().format("MM/DD/YYYY");    // Extract Today's date from moment.js API

//td0DateEl.innerText =  "(" +  todays_mdy + ")"  ;         //         td0DateEl      = document.getElementById("Today_Date")  ;

// todaysDtTm variable was intended for an URL not used in here, just tested with 
var todaysDtTm = todaysDate + "T12:00:00Z";        // To be used for UV extraction  

// First Time... 
//   Will display History searched
//   Will load those searches into an array
histSearched = dispaySrcHist()
//dispaySrcHist()


////////////////
function dispaySrcHist() {
  var allHist = getSrcHist();     

  console.log("Hey you!!");
  console.log(allHist);

  var srcHist = sort();
  console.log(srcHist);
/*
  searchFormEl

  hScore.style     = "display:block";  // Make it visible

  var searchBtn = document.createElement("button"); 
  hd.textContent  = "Scores:"     // <h1>High Scores</h1>



FROM THE WEB
document.addEventListener('DOMContentLoaded', function() {
    var button = document.createElement('input');
    button.type = 'button';
    button.id = 'submit';
    button.value = 'Submit';
    button.className = 'btn';
 
    button.onclick = function() {
    // …
    };
 
    var container = document.getElementById('container');
    container.appendChild(button);
}, false);

*/  
  





  for (var i=0; i< allHist.length; i++) {
      var curSearch =  allHist[i].city;
      console.log(curSearch)
      
      var cmdBut = document.createElement('button');
      cmdBut.innerHTML = curSearch ;
      console.log(cmdBut.textContent)
      cmdBut.className = 'col-12 searchHist';
      histSearchEl.appendChild(cmdBut);
  

      // if ((histSearched.find(({ city }) => city === curSearch) !== null) {
      //   /// If didnt find the city on the arrray of history searches
      //   searchFormEl.appendChild(cmdBut)    //    husrScore.appendChild(li);   // hScore.appendChild(li);
      // })
      

  }

  
  return allHist
  ///////////
  

}


var getOpenWeatherForecast = function(cSearch, userEntry) {
  // cSearch receives data from  getOpenWeatherApi
  
  // Extract Latitude and Longitude from City entered
  var lat = cSearch[0].lat ;    ///   cSearch[0]['lat']
  var lon = cSearch[0].lon ;    ///   cSearch[0]['lon']
  var qryDays = 1 + 5      ;    ///   Today's day + 5 (additional) forecast days

  var todaysUv   = 0       ;
  var todaysWind = 0       ;


  // Will Extract UV
  //var apiUv =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${keyApi}`; 
  var apiUv =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&appid=${keyApi}`; 

  // Will try cnt6    doesn't work
  // var apiUv =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly&cnt=6&appid=${keyApi}`; 

  fetch(apiUv).then(function(resp_uv) {
    if (resp_uv.ok) {
      resp_uv.json().then(function(data_uv) {
          // todaysUv   = data_uv.current.uvi        ;
          todaysUv   = (Math.round(data_uv.current.uvi* 100) / 100).toFixed(2);
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

      // aryToday = {date: convDate(data2.list[0].dt),    WILL CALCULATE DATE WITH MOMENT

      aryToday = {date: moment.unix(data2.list[0].dt).format("MM/DD/YYYY"),
                  weather: data2.list[0].weather,
                  temp: data2.list[0].temp,
                  humidity: data2.list[0].humidity,
                  mph: data2.list[0].speed}

      
      //td0DateEl.innerText  = userEntry + "  (" +  todays_mdy + ")"  ;         //         td0DateEl      = document.getElementById("Today_Date")  ;
      td0DateEl.innerText  = userEntry + "  (" + moment.unix(data2.list[0].dt).format("MM/DD/YYYY") + ")";   // Convert unix date into format expected using momen.js
      td0TempEl.innerText  = aryToday.temp.day + "°F"             ;
      td0WindEl.innerText  = data2.list[0].speed + " MPH"           ;
      td0HumidEl.innerText = aryToday.humidity +"%"               ;
      td0UvEl.innerText    = todaysUv                             ;
      
      // UV Levels extracted from  
      https://weather.com/en-CA/canada/science/news/2018-06-11-uv-index-sunburn-skin-dangers?cm_ven=PS_GGL_DSA_09162019_1&par=MK_GGL&tpcc=mktg-search-Google-acquisition&gclid=Cj0KCQjwguGYBhDRARIsAHgRm49o1tZ6252jpUsGZz0eqDfsSMMAxr38B-XXXnEpndSq3qoadkxaoZUaAh0XEALw_wcB
      
      // 0 to 2: Low
      // 3 to 5: Moderate
      // 6 to 7: High
      // 8 to 10: Very High
      // 11 or more: Extrem


      // Project requested ONLY 3 levels/colors
      if (todaysUv<=2) {
        td0UvEl.style.backgroundColor = "green" ;
      } else if (todaysUv<=5) {
        td0UvEl.style.backgroundColor = "blue"  ;
      } else {
        td0UvEl.style.backgroundColor = "red"   ;
      }

      //td0UvEl.style.



      // The following line converts a unix date into GMT
      //fc1DateEl.innerText  = convDate(data2.list[1].dt)           ;                //     = document.getElementById("Fore1_Date")  ;
      fc1DateEl.innerText  = moment.unix(data2.list[1].dt).format("MM/DD/YYYY");   // Convert unix date into format expected using momen.js
      img = "http://openweathermap.org/img/w/" + data2.list[1].weather[0].icon + ".png"
      fc1ImageEl.src = img;
      fc1TempEl.innerText  = data2.list[1].temp.day + "°F"        ;                //     document.getElementById("Fore1_Temp")  ;
      fc1WindEl.innerText  = data2.list[1].speed                  ;                // [document.getElementById("Fore1_Wind")  ;
      fc1HumidEl.innerText = data2.list[1].humidity + "%"         ;                // document.getElementById("Fore1_Humid") ;

      fc2DateEl.innerText  = moment.unix(data2.list[2].dt).format("MM/DD/YYYY");   // Convert unix date into format expected using momen.js
      img = "http://openweathermap.org/img/w/" + data2.list[2].weather[0].icon + ".png"
      fc2ImageEl.src = img;
      fc2TempEl.innerText  = data2.list[2].temp.day + "°F"        ;                //     document.getElementById("Fore1_Temp")  ;
      fc2WindEl.innerText  = data2.list[2].speed                  ;                //fc1WindEl.innerText  = document.getElementById("Fore1_Wind")  ;
      fc2HumidEl.innerText = data2.list[2].humidity + "%"         ;                // document.getElementById("Fore1_Humid") ;

      fc3DateEl.innerText  = moment.unix(data2.list[3].dt).format("MM/DD/YYYY");   // Convert unix date into format expected using momen.js
      img = "http://openweathermap.org/img/w/" + data2.list[3].weather[0].icon + ".png"
      fc3ImageEl.src = img;
      fc3TempEl.innerText  = data2.list[3].temp.day + "°F"        ;                //     document.getElementById("Fore1_Temp")  ;
      fc3WindEl.innerText  = data2.list[3].speed + " MPH"         ;                //fc1WindEl.innerText  = document.getElementById("Fore1_Wind")  ;
      fc3HumidEl.innerText = data2.list[3].humidity + "%"         ;                // document.getElementById("Fore1_Humid") ;

      fc4DateEl.innerText  = moment.unix(data2.list[4].dt).format("MM/DD/YYYY");   // Convert unix date into format expected using momen.js
      img = "http://openweathermap.org/img/w/" + data2.list[4].weather[0].icon + ".png"
      fc4ImageEl.src = img;
      fc4TempEl.innerText  = data2.list[4].temp.day + "°F"        ;                //     document.getElementById("Fore1_Temp")  ;
      fc4WindEl.innerText  = data2.list[4].speed + " MPH"         ;                // = document.getElementById("Fore1_Wind")  ;
      fc4HumidEl.innerText = data2.list[4].humidity + "%"         ;                // document.getElementById("Fore1_Humid") ;

      fc5DateEl.innerText  = moment.unix(data2.list[5].dt).format("MM/DD/YYYY");  // Convert unix date into format expected using momen.js
      img = "http://openweathermap.org/img/w/" + data2.list[5].weather[0].icon + ".png"
      fc5ImageEl.src = img;
      fc5TempEl.innerText  = data2.list[5].temp.day + "°F"        ;               //     document.getElementById("Fore1_Temp")  ;
      fc3WindEl.innerText  = data2.list[3].speed + " MPH"         ;               //fc1WindEl.innerText  = document.getElementById("Fore1_Wind")  ;
      fc5HumidEl.innerText = data2.list[5].humidity + "%"         ;               // document.getElementById("Fore1_Humid") ;
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

    // Will call API with City's name
    // Template will use literals
    var apiUrl1 = `https://api.openweathermap.org/geo/1.0/direct?q=${userEntry}&limit=5&appid=${keyApi}`

    fetch(apiUrl1).then(function(response) {
        // request was successful
        if (response.ok) {
          response.json().then(function(data) {

          // Will save entry into history - only if is valid
          saveSrcHist(userEntry);
            
          getOpenWeatherForecast(data, userEntry);
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

////////////////
function addHistButtons(pcCity)  {

  /*
  var allHist = getSrcHist();     // getHighScore() ;

  var srcHist = sort();
  
  for (var i=0; i<srcHist.length; i++) {
    var curSearch = srcHist[i].city;

    // var cmdBut = document.createElement("BUTTON"); 
    var cmdBut = document.createElement('button');
    cmdBut.innerHTML = curSearch ;

    searchFormEl.appendChild(cmdBut)    //    husrScore.appendChild(li);   // hScore.appendChild(li);

  }
  */

  // Change: Will ONLY add one city
    // var cmdBut = document.createElement("BUTTON"); 
    var cmdBut = document.createElement('button');
    cmdBut.innerHTML = pcCity ;
    cmdBut.className = 'col-12 searchHist';

    searchFormEl.appendChild(cmdBut)    //    husrScore.appendChild(li);   // hScore.appendChild(li);

}


function saveSrcHist(pcCity) { // saveScore(pcName, pnTotalScore) {
  // Call funtion to return from Loal Storage, and almacenate information in  allHighScore
  var allHist = getSrcHist();     // getHighScore() ;
  
  if (pcCity== null) {
    pcCity = "";
  } else {
    // if City/Search was [passed]
  

    if (allHist  == null){
      allHist  = [];
    }
    
    // Convert current User & High Score into an object
    const obj = {city: pcCity}
        
    // Add Current use/Score to the saved list
    allHist.push(obj);
    
    // Store complete information back into localStorage
    localStorage.setItem("histWeatherSrc", JSON.stringify(allHist));
    
    addHistButtons(pcCity);
  }
}
  

function getSrcHist() { // getAlHighScore() {
  // Get values from localStorage into variable  "currentList"
  var currentList = localStorage.getItem("histWeatherSrc");
  var savedList = [];
  // Evaluate if there is information stored in lavalStorage
  if (currentList  !== null) {
      savedList = JSON.parse(currentList);
      return savedList;
  }
  return savedList;
}

function sort() {
  var unsortLst = getSrcHist();
  //console.log(unsortLst);

  if (unsortLst == null) {unsortLst
      return;
  } else {
      unsortLst.sort(function(a,b){
      return b.city - a.city;
      })
  }

  return unsortLst;
}  


////////////////

// Event listener 
searchFormEl.addEventListener("submit", getOpenWeatherApi) 



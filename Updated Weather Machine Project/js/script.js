  $(document).ready(function() {
    var fahrenheit, celsius;
    var weatherAPIUrl="https://api.openweathermap.org/data/2.5/weather";
    var APIKey = "187a9fe97c6adadc6ee2fa6b0cc244a1"; //my original openweather API key.
    getLatLongi();

    //GET User's Location.
    function getLatLongi() {
      $.ajax({
        url: "https://geoip-db.com/json/",
        type: 'GET', 
        dataType: 'json',
        success: function(data) {
          var lat = data.latitude;
          var longi = data.longitude;
          $('.city').html(data.city);
          $('.country').html(data.country_name);
          weatherAPIUrl += "?lat="+lat+"&lon="+longi+"&APPID="+APIKey+"&units=metric";
          getWeatherData();
          },

/*
  Working on way to allow user to get the weather based on zip code. 
  >>> api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}
  It assumes USA by default, if no other country is given.
  weatherAPIUrl += "?zip="+zip+"&APPID"+APIKey+"&units=metric";
*/


          error: function(err) {
            alert('Oops, something went wrong. Please try again.');
            console.log(err);
          }
         });
        }
      
      //Acquires actual weather data from the user's geographic location.

      function getWeatherData() {
        $.ajax({
          url: weatherAPIUrl,
          type: 'GET',
          dataType: 'json',
          success: function(data) {
            var temperature=data.main.temp;
            celsius=temperature;
            fahrenheit=celsius*1.8+32;
            //Update icon grab below to..well, fix it.
            var icon=data.weather[0].icon;
            var weatherDetail=data.weather[0].main+", "+data.weather[0].description;
            $('.weatherDetail').html(weatherDetail); //updates weather description in actual HTML.
            $('icon_pic>img').attr('src', 'http://openweathermap.org/img/w/'+icon+'.png'); //updates icon based on weather. at least it SHOULD. Fix.
            $('.temp').html(temperature+"&#8451;"); //updates temperature and adds the little degree sign.
          },
          error: function(err) {
            alert('Oops, something went wrong. Please try again.');
            console.log(err);
           }
         });
       }

       /*Toggle between Celsius & Fahrenheit, adding Click Event Listener on Toggle Button.*/
      $('.toggle .btn').click(function(){
        //if div has attribute ID as C ofr Celsius, convert temperature to Fahrenheit.
        if($('.toggle').attr('id')=='c'){
          $('.temp').html(fahrenheit+"&#8457;");
          $('.toggle').attr('id', 'f');
        }
        else if($('.toggle').attr('id') == 'f'){
          //elsif div has attribute ID as F > convert temp to C
          $('.temp').html(celsius+"&#8451;");
          $('.toggle').attr('id', 'c');
        }
      });
    });


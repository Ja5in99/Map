

let map, infoWindow;



function initMap(){
            var options ={
            zoom:18,
            center:{lat:58.43464110000001, lng:15.5971157},
        }

        var map = new   
        google.maps.Map(document.getElementById('map'), options);
        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.getElementById("map"), options);
        google.maps.event.addListener(map,'click',function(event) {		
        latclicked = event.latLng.lat();
        longclicked  =  event.latLng.lng();

const KEY = "AIzaSyC4LOrd9Dy5Uxs8cQ7WyoIZ7yMMVGxjIh0";

let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latclicked},${longclicked}&key=${KEY}`;
fetch(url)
.then(response => response.json())
.then( data => {
    console.log(data)
    let parts = data.results [0].address_components;

    parts.forEach(part => {
        if (part.types.includes("country")){
            document.body.insertAdjacentHTML(
                "beforeend",
                `<p<>COUNTRY: ${part.long_name}</p>`
            );
        }
        if (part.types.includes("administrative_area_level_1")) {
            document.body.insertAdjacentHTML(
                "beforeend",
                `<p>PROVINCE: ${part.long_name}</p>`
            );
        }
        if (part.types.includes("locality")) {
            document.body.insertAdjacentHTML(
                "beforeend",
                `<p>Kommun: ${part.long_name}</p>`
            );
        }
        if (part.types.includes("postal_town")) {
            document.body.insertAdjacentHTML(
                "beforeend",
                `<p>CITY: ${part.long_name}</p>`
            );
    }
        if (part.types.includes("route", "street_number")) {
            document.body.insertAdjacentHTML(
                "beforeend",
                `<p>ROUTE: ${part.long_name}</p>`
            );
        }
    });
    
})
yrApi();
            });
            infoWindow = new google.maps.InfoWindow();
            const locationButton = document.createElement("button");

            locationButton.textContent = "Pan to Current Location";
            locationButton.classList.add("custom-map-control-button");
            map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
            locationButton.addEventListener("click", () => {
              // Try HTML5 geolocation.
              if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                  (position) => {
                    const pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude,
                    };
                    latclicked=position.coords.latitude
                    longclicked=position.coords.longitude
                    infoWindow.setPosition(pos);
                    infoWindow.setContent("Location found.");
                    infoWindow.open(map);
                    map.setCenter(pos);
                    const KEY = "AIzaSyC4LOrd9Dy5Uxs8cQ7WyoIZ7yMMVGxjIh0";

                    let url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latclicked},${longclicked}&key=${KEY}`;
                    fetch(url)
                    .then(response => response.json())
                    .then( data => {
                        console.log(data)
                        let parts = data.results [0].address_components;

                        parts.forEach(part => {
                            if (part.types.includes("country")){
                                document.body.insertAdjacentHTML(
                                    "beforeend",
                                    `<p<>COUNTRY: ${part.long_name}</p>`
                                );
                            }
                            if (part.types.includes("administrative_area_level_1")) {
                                document.body.insertAdjacentHTML(
                                    "beforeend",
                                    `<p>PROVINCE: ${part.long_name}</p>`
                                );
                            }
                            if (part.types.includes("locality")) {
                                document.body.insertAdjacentHTML(
                                    "beforeend",
                                    `<p>Kommun: ${part.long_name}</p>`
                                );
                            }
                            if (part.types.includes("postal_town")) {
                                document.body.insertAdjacentHTML(
                                    "beforeend",
                                    `<p>CITY: ${part.long_name}</p>`
                                );
                        }
                            if (part.types.includes("route", "street_number")) {
                                document.body.insertAdjacentHTML(
                                    "beforeend",
                                    `<p>ROUTE: ${part.long_name}</p>`
                                );
                            }
                        });
                    })
                    
                  },
                  () => {
                    handleLocationError(true, infoWindow, map.getCenter());
                  }
                );
              } else {
                // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
              }
            });
    }

    function yrApi (){


            let xhr = new XMLHttpRequest();
        
            xhr.open ("GET", "https://api.met.no/weatherapi/locationforecast/2.0/compact?lat="+latclicked+"&lon="+longclicked+"");
        
            xhr.responseType = "json";
        
            xhr.onload = function () {
                console.log(xhr.response);
                for (let i = 0; i < 8; i+=2) {
                    let firstitem = xhr.response.properties.timeseries
                    [i];
                    let time = xhr.response.properties.timeseries[i].time;
                    time = time.slice(11,16);
                   
                    let temp = firstitem.data.instant.details.air_temperature;
                    let precipitation = firstitem.data.next_1_hours.details.precipitation_amount;
                    let cloud = xhr.response.properties.timeseries[0].data.instant.details.cloud_area_fraction;
                    
        
                   document.getElementById(i).innerHTML = time + "<br>"  + temp +"°C" + "<br>" + precipitation +" mm/h" ;
                    console.log(temp + " Temp");
                    console.log(time + "Time");
                    console.log(precipitation + " Precipitation");
                    console.log(cloud + " cloud"); 
        
        
        
        
                    if (precipitation == 0) {
                        if (cloud < 10){
                            if (temp > 20){//Sunny and tropical
                                document.getElementById(i).style.backgroundImage="url('https://images.pexels.com/photos/1869961/pexels-photo-1869961.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500')";
                            }
                            else if (temp > 0) {//sunny & warm
                                 document.getElementById(i).style.backgroundImage="url('https://images.pexels.com/photos/1420440/pexels-photo-1420440.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
                            }
                            else { //sunny and cold
                                document.getElementById(i).style.backgroundImage="url('https://cdn.pixabay.com/photo/2017/05/06/04/20/stubaital-2288887_1280.jpg')";
                            }
                        }
                        else {//cloudy
                            document.getElementById(i).style.backgroundImage="url('https://images.pexels.com/photos/3742711/pexels-photo-3742711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260')";
                        }
                        }
                    else { //rain
                        if (temp >0 ){
                        document.getElementById(i).style.backgroundImage="url('https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80')"
                        } //snow
                        else {
                            document.getElementById(i).style.backgroundImage="url('https://www.treehugger.com/thmb/ylgDp8qVIXeWVopNVW7os6phr3M=/4800x2700/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__mnn__images__2019__12__Perfect_Single_Snowflake-79d7515f41e9452b856179b1334506e4.jpg')";
                        }
                    }
        
                }
        
        
            }
        
        
        
            xhr.send();
        }

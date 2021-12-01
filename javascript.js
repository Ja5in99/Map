

let map;

function initMap(){

        var options ={
            zoom:14,
            center:{lat:58.41086, lng:15.62157}
            
        }
        var map = new   
        google.maps.Map(document.getElementById('map'), options);
        var infoWindow = new google.maps.InfoWindow();
        var latlngbounds = new google.maps.LatLngBounds();
        var map = new google.maps.Map(document.getElementById("map"), options);
        google.maps.event.addListener(map,'click',function(event) {		
            		
        latclicked = event.latLng.lat();
        longclicked  =  event.latLng.lng();
console.log(event.latLng.lat());
console.log(event.latLng.lng());
            });
    }
    function yrApi (){
let xhr = new XMLHttpRequest();
xhr.open ("GET", 'https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=' + latclicked + '&lon=' +longclicked);
xhr.responseType = "json";
xhr.onload = function () {

    console.log(xhr.response);

    for (let i = 0; i < 8; i+=2) {
        let firstitem = xhr.response.properties.timeseries
        [i]
        let time = xhr.response.properties.timeseries[i].time
        time = time.slice(11,16);
        let data = firstitem.data.instant.details.air_temperature
        document.getElementById("temp").innerHTML += time + "  är tempraturen " + data + "<br>" ;
        console.log(data);
        console.log(time);
    }
}
xhr.send();
}

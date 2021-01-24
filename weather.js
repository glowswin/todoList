const API_URL="http://api.openweathermap.org/data/2.5/weather";
const API_KEY="c108868c60ac500d578b954d6fbb291d";

const jsWheather = document.querySelector(".js-wheather");

function loadGeoSuc(geo){
    const lat = geo.coords.latitude;
    const lon = geo.coords.longitude;
    callURL(lat,lon);
    const locateObj={
        lat:lat,
        lon:lon
    };
    localStorage.setItem("locateL",JSON.stringify(locateObj));
}
function callURL(lat,lon){
    fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`).then(function(response){
        return response.json();
    }).then(function(json){
        const temp = json.main.temp;
        const si = json.name;
        jsWheather.innerHTML=`${temp}℃, ${si}`;
    });
}
function errorGeo(){

}
function loadGeoLocation(){
    navigator.geolocation.getCurrentPosition(loadGeoSuc,errorGeo);
}

function loadGeo(){
    const locate = localStorage.getItem("locateL");
    if(locate){
        const locateObj = JSON.parse(locate);
        callURL(locateObj.lat,locateObj.lon);
    }else{
        loadGeoLocation();
    }
}
function init(){
    loadGeo();
}

init();
 
const clockContainer = document.querySelector(".js-clock"),
clockTitle = clockContainer.querySelector("h1");
function beutiTime(dateInt){
    if(dateInt<10){
        return `0${dateInt}`;
    }
    return dateInt;
}
function getTime() {
const date = new Date();
const minutes = date.getMinutes();
const hours = date.getHours();
const seconds = date.getSeconds();
clockTitle.innerText = `${beutiTime(hours)}:${beutiTime(minutes)}:${beutiTime(seconds)}`;
}

function init() {
getTime();
setInterval(getTime, 1000);
}

init();
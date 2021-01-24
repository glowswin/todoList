const jsInputName = document.querySelector(".js-input-name");
const jsInputNameText = document.querySelector(".js-input-name #t_name");
const jsInputNameButton = document.querySelector(".js-input-name #bt_name");
const jsGreeting = document.querySelector(".js-greeting");
function inputName(){
    const name = jsInputNameText.value;
    localStorage.setItem("name",name);
    loadName();
}
function loadName(){
    const name = localStorage.getItem("name");
    if(!name){
        jsInputName.style.display="";
        jsGreeting.style.display="none";
        jsGreeting.innerHTML="";
    }
    else{
        jsInputName.style.display="none";
        jsGreeting.style.display="";
        jsGreeting.innerHTML=`Hello ${name}~~`;
    }
}
function init(){
    jsInputNameText.value="";
    jsInputNameButton.addEventListener("click",inputName);
    loadName();
}

init();
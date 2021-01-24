const wrap = document.querySelector("#wrap");
function backImage(){
    const randomNum = Math.floor(Math.random()*4)+1;
    const div = document.createElement("div");
    const image = new Image();
    image.src=`images/back_0${randomNum}.jpg`;
    image.style.width="100%";
    image.style.height="100%";
    image.style.opacity="40%";
    div.append(image);  
    div.style.position="fixed"; 
    div.style.top="0px";
    div.style.zIndex="-1"
    wrap.prepend(div);
}


function init(){
    backImage();
}

init();
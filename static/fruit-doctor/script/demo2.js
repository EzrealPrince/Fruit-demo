const autoSpeed = 1;
const interval = 2000;   //间隔时间

let _marginTop = 0;
let start;
let timeout;
let slider_content = document.querySelector(".main-advantages-right ul");

function turnTop() {
  _marginTop = parseFloat(slider_content.style.marginTop);
  slider_content.style.marginTop = (_marginTop - autoSpeed) + "px";
  _marginTop -= autoSpeed;
  if(parseFloat(slider_content.style.marginTop) <= -375) 
    slider_content.style.marginTop = 0 + "px";
  if(parseFloat(slider_content.style.marginTop) % -25 == 0) {
    clearInterval(start);
    timeout = setTimeout(run,interval);
  }
}
function run() {
  start = setInterval(turnTop,50);
}
run();
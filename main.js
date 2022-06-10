
const timer = document.querySelector(".timer");
const start_button = document.querySelector(".btn-start");
const stop_button = document.querySelector(".btn-stop");
let [minutes, seconds, milliseconds] = [0, 0, 0];


const resetTimer = () => {
    timer.innerHTML = '00:00.00';
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
}

const displayTimer = () => {
    milliseconds = milliseconds + 5;
    if (milliseconds >= 100) {
        seconds++;
        milliseconds = milliseconds - 100;
    }
    if (seconds >= 60){
        minutes++;
        seconds = seconds -60;
    }
    timer.innerHTML = minutes.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0') 
                        + '.' + milliseconds.toString().padStart(2, '0');
    
}

let intervalInstance = null;
start_button.addEventListener('click', () => {
    intervalInstance = setInterval(displayTimer, 50);
    start_button.style.display = "none"
    stop_button.style.display = "block";
})


stop_button.addEventListener('click', () => {

    clearInterval(intervalInstance);
    stop_button.style.display = "none"
    start_button.style.display = "block";
})
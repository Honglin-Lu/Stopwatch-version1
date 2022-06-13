/*
Main business functionalities

1. click Start:
    Button: start -> stop;
    Timer begins to work.
    The current Lap timer begins to work.
    Left button is Lap button.

2. click Stop:
    Button: stop -> start;
    Button: lap -> reset;
    Timer and lap timer stop.

3. click Lap:
    The last lap timer stops working.
    A new lap timer begins to work.
    When the lap records >= 2, the max lap record will 
            be red and the min lap record will be green.

4. click Reset:
    Reset timer.
    Lap records are all removed.
*/
const timer = document.querySelector(".timer");
const startButton = document.querySelector(".btn-start");
const stopButton = document.querySelector(".btn-stop");
const lapButton = document.querySelector(".btn-lap");
const resetButton = document.querySelector(".btn-reset");
const lapRecords = document.querySelector(".lap-records");

let [timerMinutes, timerSeconds, timerCentiseconds] = [0, 0, 0];
let [lapMinutes, lapSeconds, lapCentiseconds] = [0, 0, 0];

let li = null;
let lapTitleSpan = null;
let lapTimeSpan = null;
let counter = 1; // to make the Lap title. (eg. Lap 2)
let lapTimes = []; // change each lap time to centiseconds then put all integers in this array
let [maxIndex, minIndex] = [-1, -1]; //the index of max lapTime and min lapTime in the array lapTimes

let maxLapLi = null;
let minLapLi = null;


const resetTimer = () => {
    timer.innerHTML = '00:00.00';
    [timerMinutes, timerSeconds, timerCentiseconds] = [0, 0, 0];
}

const calculateTime = (min, sec, cisec) => {
    cisec = cisec + 1;
    if (cisec >= 100) {
        sec++;
        cisec = cisec - 100;
    }
    if (sec >= 60){
        min++;
        sec = sec - 60;
    }
    return [min, sec, cisec];
    
}

const displayTimer = () => {
    [timerMinutes, timerSeconds, timerCentiseconds] = calculateTime(timerMinutes, timerSeconds, timerCentiseconds);
    timer.innerHTML = timerMinutes.toString().padStart(2, '0') + ':' + timerSeconds.toString().padStart(2, '0') 
                        + '.' + timerCentiseconds.toString().padStart(2, '0');   
}

const displayLapTime = () => {
    [lapMinutes, lapSeconds, lapCentiseconds] = calculateTime(lapMinutes, lapSeconds, lapCentiseconds);
    lapTimeSpan.innerHTML = lapMinutes.toString().padStart(2, '0') + ':' + lapSeconds.toString().padStart(2, '0') 
    + '.' + lapCentiseconds.toString().padStart(2, '0');   
    
}

const createLiElement = () => {
    li = document.createElement("li");
    li.setAttribute('id', counter)
    lapTitleSpan = document.createElement("span");
    lapTimeSpan = document.createElement("span");
    lapRecords.prepend(li);
    li.appendChild(lapTitleSpan);
    li.appendChild(lapTimeSpan);
    lapTitleSpan.innerHTML = 'Lap ' + counter;
}

let timerIntervalInstance = null;
let lapIntervalInstance = null;
startButton.addEventListener('click', () => {
    if (timerMinutes == 0 && timerSeconds == 0 && timerCentiseconds == 0){
        createLiElement();
    }
    timerIntervalInstance = setInterval(displayTimer, 10);
    lapIntervalInstance = setInterval(displayLapTime, 10);
    
    startButton.style.display = "none"
    stopButton.style.display = "block";

    lapButton.style.display = "block";
    resetButton.style.display = "none";   
})


stopButton.addEventListener('click', () => { 
    clearInterval(timerIntervalInstance);
    clearInterval(lapIntervalInstance);

    stopButton.style.display = "none"
    startButton.style.display = "block";

    resetButton.style.display = "block";
    lapButton.style.display = "none";
    
})

resetButton.addEventListener('click', () => {
    resetTimer();
    lapRecords.innerHTML = "";
    counter = 1;
    [lapMinutes, lapSeconds, lapCentiseconds] = [0, 0, 0];
    lapTimes = [];
    lapButton.style.display = "block";
    resetButton.style.display = "none";
})

const changeLapTimeToCentiseconds = (lapMinutes, lapSeconds, lapCentiseconds) => {
    return lapMinutes * 60 * 100 + lapSeconds * 100 + lapCentiseconds
}


const compareLapTime = (lapTimes) => {
    // get the index of max lapTime and min lapTime in the array lapTimes
    let max = lapTimes.indexOf(Math.max(...lapTimes));
    let min = lapTimes.indexOf(Math.min(...lapTimes));
    return [max, min];
}

const displayMaxMinLapTime = (maxIndex, minIndex) => {
    maxLapLi = document.getElementById(maxIndex + 1);
    minLapLi = document.getElementById(minIndex + 1);
    maxLapLi.style.color = '#d43b36';
    minLapLi.style.color = '#3db85d';
}


lapButton.addEventListener('click', () => {
    let lapTime = changeLapTimeToCentiseconds(lapMinutes, lapSeconds, lapCentiseconds);
    lapTimes.push(lapTime);
    if(lapTimes.length >= 2){
        if (maxLapLi && minLapLi){
            maxLapLi.style.color = '#fefdff';
            minLapLi.style.color = '#fefdff';
        }
        [maxIndex, minIndex] = compareLapTime(lapTimes);
        displayMaxMinLapTime(maxIndex, minIndex);
    }
    counter++;
    [lapMinutes, lapSeconds, lapCentiseconds] = [0, 0, 0];
    clearInterval(lapIntervalInstance);
    createLiElement();
    lapIntervalInstance = setInterval(displayLapTime, 10);

})
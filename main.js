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
import { calculateTime } from "./utility.js";

const timer = document.querySelector(".timer");
const startButton = document.querySelector(".btn-start");
const stopButton = document.querySelector(".btn-stop");
const lapButton = document.querySelector(".btn-lap");
const resetButton = document.querySelector(".btn-reset");
const lapRecords = document.querySelector(".lap-records");

let [timerMinutes, timerSeconds, timerCentiseconds] = [0, 0, 0];
let [lapMinutes, lapSeconds, lapCentiseconds] = [0, 0, 0];

let $oneLapRecord = null;
let $lapTitle = null;
let $lapTime = null;
let counter = 1; // to make the Lap title. (eg. Lap 2)
let lapTimes = []; // change each lap time to centiseconds then put all integers in this array
let [maxIndex, minIndex] = [-1, -1]; //the index of max lapTime and min lapTime in the array lapTimes

let $maxLap = null;
let $minLap = null;


const resetTimer = () => {
    timer.innerHTML = '00:00.00';
    [timerMinutes, timerSeconds, timerCentiseconds] = [0, 0, 0];
}



const displayTimer = () => {
    [timerMinutes, timerSeconds, timerCentiseconds] = calculateTime(timerMinutes, timerSeconds, timerCentiseconds);
    timer.innerHTML = timerMinutes.toString().padStart(2, '0') + ':' + timerSeconds.toString().padStart(2, '0') 
                        + '.' + timerCentiseconds.toString().padStart(2, '0');   
}

const displayLapTime = () => {
    [lapMinutes, lapSeconds, lapCentiseconds] = calculateTime(lapMinutes, lapSeconds, lapCentiseconds);
    $lapTime.innerHTML = lapMinutes.toString().padStart(2, '0') + ':' + lapSeconds.toString().padStart(2, '0') 
    + '.' + lapCentiseconds.toString().padStart(2, '0');   
    
}

const createLiElement = () => {
    $oneLapRecord = document.createElement("li");
    $oneLapRecord.setAttribute('id', counter)
    $lapTitle = document.createElement("span");
    $lapTime = document.createElement("span");
    lapRecords.prepend($oneLapRecord);
    $oneLapRecord.appendChild($lapTitle);
    $oneLapRecord.appendChild($lapTime);
    $lapTitle.innerHTML = 'Lap ' + counter;
}

let timerIntervalInstance = null;
let lapIntervalInstance = null;

const onStart = () => {

    if (timerMinutes == 0 && timerSeconds == 0 && timerCentiseconds == 0) {
        createLiElement();
    }
    timerIntervalInstance = setInterval(displayTimer, 10);
    lapIntervalInstance = setInterval(displayLapTime, 10);

    startButton.style.display = "none";
    stopButton.style.display = "block";

    lapButton.style.display = "block";
    resetButton.style.display = "none";
};

startButton.addEventListener('click', onStart)

const onStop = () => {
     
    clearInterval(timerIntervalInstance);
    clearInterval(lapIntervalInstance);

    stopButton.style.display = "none"
    startButton.style.display = "block";

    resetButton.style.display = "block";
    lapButton.style.display = "none";
    

}

stopButton.addEventListener('click', onStop)

const onReset = () => {
    resetTimer();
    lapRecords.innerHTML = "";
    counter = 1;
    [lapMinutes, lapSeconds, lapCentiseconds] = [0, 0, 0];
    lapTimes = [];
    lapButton.style.display = "block";
    resetButton.style.display = "none";
}

resetButton.addEventListener('click', onReset)

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
    $maxLap = document.getElementById(maxIndex + 1);
    $minLap = document.getElementById(minIndex + 1);
    $maxLap.style.color = '#d43b36';
    $minLap.style.color = '#3db85d';
}

const onLap = () => {
    let lapTime = changeLapTimeToCentiseconds(lapMinutes, lapSeconds, lapCentiseconds);
    lapTimes.push(lapTime);
    if(lapTimes.length >= 2){
        if ($maxLap && $minLap){
            $maxLap.style.color = '#fefdff';
            $minLap.style.color = '#fefdff';
        }
        [maxIndex, minIndex] = compareLapTime(lapTimes);
        displayMaxMinLapTime(maxIndex, minIndex);
    }
    counter++;
    [lapMinutes, lapSeconds, lapCentiseconds] = [0, 0, 0];
    clearInterval(lapIntervalInstance);
    createLiElement();
    lapIntervalInstance = setInterval(displayLapTime, 10);
}

lapButton.addEventListener('click', onLap)
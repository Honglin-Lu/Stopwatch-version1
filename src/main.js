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
import { displayTime } from "./utils.js";

const timer = document.querySelector(".timer");
const startButton = document.querySelector(".btn-start");
const stopButton = document.querySelector(".btn-stop");
const lapButton = document.querySelector(".btn-lap");
const resetButton = document.querySelector(".btn-reset");
const lapRecords = document.querySelector(".lap-records");

let startTime, lapStartTime, lapTime;
let elapsedTime = 0;

let $oneLapRecord = null;
let $lapTitle = null;
let $lapTime = null;
let counter = 1; // to make the Lap title. (eg. Lap 2)
let lapTimes = []; // change each lap time to centiseconds then put all integers in this array
let [maxIndex, minIndex] = [-1, -1]; //the index of max lapTime and min lapTime in the array lapTimes

let $maxLap = null;
let $minLap = null;

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
    
    startTime = Date.now();

    if (elapsedTime == 0) {
        createLiElement();
    }
    timerIntervalInstance = setInterval( () => {
        let timerElapsedTime = Date.now() - startTime;
        timer.innerHTML = displayTime(timerElapsedTime + elapsedTime);
    }, 10);

    lapIntervalInstance = setInterval( () => {
        let lapElapsedTime = Date.now() - startTime;
        $lapTime.innerHTML = displayTime(lapElapsedTime + elapsedTime);
        lapTime = lapElapsedTime + elapsedTime;
    }, 10);

    startButton.style.display = "none";
    stopButton.style.display = "block";

    lapButton.style.display = "block";
    resetButton.style.display = "none";
};

startButton.addEventListener('click', onStart)

const onStop = () => {
    elapsedTime = Date.now() - startTime;
    
    clearInterval(timerIntervalInstance);
    clearInterval(lapIntervalInstance);

    stopButton.style.display = "none"
    startButton.style.display = "block";

    resetButton.style.display = "block";
    lapButton.style.display = "none";
    
}

stopButton.addEventListener('click', onStop)

const onReset = () => {
    elapsedTime = 0;
    timer.innerHTML = displayTime(0);
    lapRecords.innerHTML = "";
    counter = 1;
    lapTimes = [];
    lapButton.style.display = "block";
    resetButton.style.display = "none";
}

resetButton.addEventListener('click', onReset)


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
    clearInterval(lapIntervalInstance);
    console.log(lapTime);
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
    createLiElement();
    lapStartTime = Date.now();
    lapIntervalInstance = setInterval(() => {
        lapTime = Date.now() - lapStartTime;
        $lapTime.innerHTML = displayTime(lapTime);
    }, 10);
}

lapButton.addEventListener('click', onLap)
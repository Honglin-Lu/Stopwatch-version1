const padTo2Digits = (num) => {
    return num.toString().padStart(2, '0');
}

const displayTime = (milliSeconds) => {
    let minutes = Math.floor(milliSeconds / 60000);
    let seconds = Math.floor((milliSeconds % 60000) / 1000);
    let centiSeconds = Math.floor(((milliSeconds % 60000) % 1000) / 10);

    return `${padTo2Digits(minutes)}:${padTo2Digits(seconds)}.${padTo2Digits(centiSeconds)}`;

}

export {displayTime};
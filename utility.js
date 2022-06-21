const calculateTime = (min, sec, ciSec) => {
    ciSec = ciSec + 1;
    if (ciSec >= 100) {
        sec++;
        ciSec = ciSec - 100;
    }
    if (sec >= 60){
        min++;
        sec = sec - 60;
    }
    return [min, sec, ciSec];
    
}

export {calculateTime};
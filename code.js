
const watchTime = document.getElementById("stopWatchTime");
const startBtn = document.getElementById("stopWatchStart");
const stopBtn = document.getElementById("stopWatchStop");
const resetBtn = document.getElementById("stopWatchReset");

let isRunning = 0;
let currTime;
let startTime = -1;
let timeOutId = null;
let prevStopTime = null;

stopBtn.onclick = function(){
    isRunning = 0;
    controlTime(startTime , isRunning);
}

startBtn.onclick = function(){
    prevStopTime = (prevStopTime == null) ? 0 : prevStopTime;
    startTime = Date.now() - prevStopTime;
    currTime = Date.now() - startTime;
    controlTime(startTime , 1);
}

resetBtn.onclick = function(){
    
    controlTime(startTime , 2);
    startTime = -1;
    prevStopTime = null;
    
}


// stopBtn.onclick = ()=> stop();
function controlTime(startTime , runningStatus){

    let currTime =  Date.now() - startTime ;
    
    function start(){

        watchTime.textContent = formattedTime(currTime);
        timeOutId = setTimeout(() => controlTime(startTime , 1), 1);
    
    }

    function stop(){
        prevStopTime = currTime;
        clearTimeout(timeOutId);
        runningStatus = 0;
        watchTime.textContent = formattedTime(currTime);
    }

    function reset(){
        stop();
        watchTime.textContent = "00:00:00:000";
    }

    switch(runningStatus){
        case 0 : stop();break;
        case 1 : start();break;
        case 2 : reset();break;
    }

    

}

function formattedTime(time){
    milliseconds = (time % 1000).toString();
    seconds = ( Math.floor(time / 1000) % 60).toString();
    minutes = (Math.floor(time/ (1000*60))% 60).toString();
    hours = (Math.floor(time/ (1000*60*60))% 24).toString();

   
    const ans = 
    hours.padStart(2, "0")   + ":" + 
    minutes.padStart(2 ,"0") + ":" + 
    seconds.padStart(2,"0")  + ":" +
    milliseconds.padStart(3, "00");

    return ans;
    
}
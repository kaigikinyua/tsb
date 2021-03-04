var { addTransCription,video }=require ('./transcription.js');
const { deciFormat }=require('./transcription.js')
const videoElement=document.getElementById("video")
const playPauseButton=document.getElementById("playPause")
const repeatButton=document.getElementById("repeat")
//volume to be implemented latter on
const editor=document.getElementById('editor')
var repeat={
    start:0,
    end:0,
}

window.onload=()=>{
    resetVideo()
}
editor.addEventListener('keydown',(e)=>{
    if(e.ctrlKey && e.key==' '){
       playPause()
    }else if(e.ctrlKey && event.key=='z'){
        console.log("Repeat Key Combination")
    }else if(e.ctrlKey && event.key=='n'){
        var text=document.getElementById('editor').value
        addTransCription({"text":text,"currentTime":video.currentTime})
        text.value=null
        text.innerHTML=null
        console.log("pushing transcription")
    }else{

    }
})
videoElement.addEventListener('timeupdate',(e)=>{
    upDateVideoTime()
    if(video.duration==null){
        video.duration=videoElement.duration
     }
    //increase length of progress_inner
    var pInner=document.getElementById("progress_inner")
    var pOuter=document.getElementById("progress_outer")
    var percent=(video.currentTime / video.duration)*100
    pInner.style.width=`${percent}%`
    //console.log(pInner.style.width)
    //console.log(percent)
});

playPauseButton.addEventListener('click',(e)=>{
    playPause()
})
function playPause(){
    if(video.IsPlaying){pauseVideo()}
    else{playVideo()}
    video.IsPlaying=!video.IsPlaying
    upDateVideoTime()
}

function resetVideo(){
    video.currentTime=0
    video.duration=null
    video.durationFormated=null
    upDateVideoTime()
}

function playVideo(){
    videoElement.play();
}
function pauseVideo(){
    videoElement.pause();
}
function upDateVideoTime(){
    var timer=document.getElementById("timer")
    timer.innerHTML=convertSeconds(videoElement.currentTime)
    video.currentTime=videoElement.currentTime
    if(video.duration==null){
        video.duration=videoElement.duration
        var formatedDuration=convertSeconds(video.duration)
        var vdDom=document.getElementById("duration")
        vdDom.innerHTML=formatedDuration
        video.formatedDuration=formatedDuration
    }
}


function convertSeconds(time){
    var t=0;
    if(time<60){
        var s=deciFormat(Math.floor(time))
        var t=`00:${s}`
    }else if(time>60 && time<3600){
        var m=deciFormat(Math.floor(time/60));
        var s=deciFormat(Math.floor(time%60));
        t=`${m}:${s}`
    }else if(time>3600){
        console.log("Hour zone")
        var h=deciFormat(Math.floor(time/3600));
        var m=deciFormat(Math.floor((time-h*3600)/60));
        var s=deciFormat(Math.floor(time%60))
        t=`${h}:${m}:${s}`
    }else {
        //console.log("Error while converting time")
        t='00:00:00'
    }
    return t
}

const dialog=require("electron").remote.dialog;
function openDialog(){
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
    .then(result=>{
        //console.log(result)
        videoElement.src=result.filePaths[0]
        videoElement.pathToVideo=videoElement.src.toString()
        resetVideo()
    })
    .catch((err)=>{
        console.log(err)
    })
}

//module.exports={ video }



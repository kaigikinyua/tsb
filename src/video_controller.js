var { addTransCription,video,setVideoSrc,deciFormat }=require ('./transcription.js');
var { Notification }=require('./notifications.js')

const videoElement=document.getElementById("video")
const playPauseButton=document.getElementById("playPause")
var pOuter=document.getElementById("progress_outer")
const repeatButton=document.getElementById("repeat")
const editor=document.getElementById('editor')

window.onload=()=>{
    resetVideo()
}
editor.addEventListener('keydown',(e)=>{
    if(e.ctrlKey && e.key==' '){
       playPause()
    }else if(e.ctrlKey && event.key=='z'){
        console.log("Repeat Key Combination")
    }else if(e.ctrlKey && event.key=='n' || event.key=='N' ){
        var text=document.getElementById('editor')
        addTransCription({"text":text.value,"currentTime":video.currentTime})
        text.value=''
    }else if(e.ctrlKey && event.key=='ArrowRight'){
        scrub(videoElement.currentTime+3)
    }else if(e.ctrlKey && event.key=='ArrowLeft'){
        scrub(videoElement.currentTime-3)
    }else{
        console.log(e.key)
    }
})
videoElement.addEventListener('timeupdate',(e)=>{
    upDateVideoTime()
    if(video.duration==null || video.duration==undefined){
        video.duration=videoElement.duration
        resetVideo()
     }
    //increase length of progress_inner
    var pInner=document.getElementById("progress_inner")
    var percent=(video.currentTime / video.duration)*100
    pInner.style.width=`${percent}%`
});

playPauseButton.addEventListener('click',(e)=>{playPause()})

pOuter.addEventListener('click',(e)=>{
    var cords=e.target.getBoundingClientRect()//getting the position of the element in relation to parent
    var parStart=cords.left//x cordinate in relation to parent
    var mouseClickX=e.clientX//get mouse click x cordinate
    var jumpTo=(mouseClickX-parStart)*(videoElement.duration/e.target.offsetWidth)
    //console.log(jumpTo)
    //console.log(`Jumping to ${jumpTo}`)
    scrub(jumpTo)
})
function scrub(time){
    videoElement.currentTime=time
}

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
    var p=document.getElementById("playPause")
    p.innerHTML=null
    console.log(videoElement.src)
    if(srcNotNull()){
        videoElement.play();
        if(video.duration==null || video.duration==undefined){
            video.duration=videoElement.duration
        }
        p.innerHTML="<i class='fa fa-pause'></i>"
    }else{
        p.innerHTML="<i class='fa fa-pause'></i>"
    }
}

function pauseVideo(){
    var p=document.getElementById("playPause")
    p.innerHTML=null
    if(srcNotNull()){
        videoElement.pause();
        p.innerHTML="<i class='fa fa-play'></i>"
    }
}
function srcNotNull(){
    if(videoElement.src==undefined || videoElement.src=="" || videoElement.src==null){
        Notification.error('Please select a video from your computer')
        return false
    }return true
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
        var s=checkSeconds(deciFormat(Math.floor(time)))
        var t=`00:${s}`
    }else if(time>60 && time<3600){
        var m=checkSeconds(deciFormat(Math.floor(time/60)));
        var s=checkSeconds(deciFormat(Math.floor(time%60)));
        t=`${m}:${s}`
    }else if(time>3600){
        var h=deciFormat(Math.floor(time/3600));
        var m=checkSeconds(deciFormat(Math.floor((time-h*3600)/60)));
        var s=checkSeconds(deciFormat(Math.floor(time%60)))
        t=`${h}:${m}:${s}`
    }else {
        t='00:00:00'
    }
    return t
}
function checkSeconds(seconds){
    var formated_seconds=''
    if(seconds.length>2){formated_seconds=`${seconds[1]}${seconds[2]}`}
    else{formated_seconds=seconds}
    return formated_seconds
}

const dialog=require("electron").remote.dialog;
function openDialog(){
    pauseVideo()
    dialog.showOpenDialog({ properties: ['openFile', 'multiSelections'] })
    .then(result=>{
        setTimeout(()=>{resetVideo()},1000)
        videoElement.src=result.filePaths[0]
        videoElement.pathToVideo=videoElement.src.toString()
        setVideoSrc(videoElement.pathToVideo)
        Notification.success("Successfully loaded the video")
    })
    .catch((err)=>{
        Notification.error('Could not load the video<br/>Please try again')
        //console.log(err)
    })
}
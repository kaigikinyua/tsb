var { configs } = require('./settings.js')
var video={
    IsPlaying:false,
    currentTime:0,
    duration:null,
    durationFormated:null,
    pathToVideo:null
}
function getVideoSrc(){return video.pathToVideo}
function setVideoSrc(src){video.pathToVideo=src}

const timeDeltas={
    processing:1 //configs.settings.displayDeltaSeconds,
}

var transCription=[
    {"start":'00:12',"end":'00:13',"text":"Hardcoded Transcription in transcription.js","startSec":12.02,"endSec":13.03},
    {"start":'00:12',"end":'00:13',"text":"Hardcoded Transcription in transcription.js","startSec":12.02,"endSec":13.03}
]
var lastTsendTime=null
function getTranscription(){return transCription}

function setTfromSec(t){
    transCription=[]
    var output=document.getElementById("output")
    output.innerHTML=''
    t.forEach(tsption=>{
        var start=convertToSrtTimeFormat(tsption.startSec)
        var end=convertToSrtTimeFormat(tsption.endSec)
        transCription.push({"start":start,"end":end,"text":tsption.text,"startSec":tsption.startSec,"endSec":tsption.endSec})
        var append=`<small>${start}</small><small>${end}</small>${tsption.text}`
        var p=document.createElement('p')
        p.innerHTML=append
        output.appendChild(p)
    });
    //add check to confirm new ts
    return true
}
function setTfromsrt(t){

}

function addTransCription({text,currentTime}){
    var start;
    if(currentTime>timeDeltas.processing){
        start=currentTime-timeDeltas.processing
    }else{start=currentTime-1}
    var startSec=start
    var endSec=currentTime
    start=synchTransCription(start)
    lastTsEndTime=currentTime
    var start=convertToSrtTimeFormat(start)
    var end=convertToSrtTimeFormat(currentTime)
    transCription.push({"start":start,"end":end,"text":text,"startSec":startSec,"endSec":endSec})
    var output=document.getElementById("output")
    var append=`<small>${start}</small><small>${end}</small>${text}`
    var p=document.createElement('p')
    p.innerHTML=append
    output.appendChild(p)
    //console.log(transCription)
}
function synchTransCription(tsStartTime){
    if(transCription.length>0){
        if(lastTsendTime<=tsStartTime){
            tsStartTime=lastTsEndTime+0.1
        }
    }
    return tsStartTime
}
function convertToSrtTimeFormat(time){
    var tString=null;
    var minutes=0
    var hours=0
    var seconds=0
    var ms=0
    if(Math.floor(time)>0 && time<60){
        seconds=Math.floor(time)
        ms=Math.floor((time-seconds)*1000)    
    }
    else if(time>60 && time<3600){
        minutes=Math.floor(time/60)
        seconds=Math.floor((time-minutes*60))
        ms=Math.floor((time-(minutes*60)-seconds)*1000)
    }
    else if(time>3600){
        hours=Math.floor(time/3600)
        minutes=Math.floor((time-hours*3600)/60)
        seconds=Math.floor((time-hours*3600-minutes*60))
        ms=Math.floor((time-hours*3600-minutes*60-seconds)*1000)
    }
    else{
        var ms=Math.floor(time*1000)
    }
    hours=deciFormat(hours)
    minutes=deciFormat(minutes)
    seconds=deciFormat(seconds)
    ms=deciFormat(ms)
    if(ms=='00'){
        ms='000'
    }
    tString=`${hours}:${minutes}:${seconds},${ms}`
    return tString
}
function deciFormat(x){
    if(x<10){return `0${x}`}
    else if(x>10 && x<100){return `0${x}`}
    else{return x}
}

module.exports={
    video,
    getVideoSrc,
    setVideoSrc,
    timeDeltas,
    addTransCription,
    getTranscription,
    convertToSrtTimeFormat,
    deciFormat,
    setTfromSec
}
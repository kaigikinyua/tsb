var { getTranscription } =require('./transcription.js')
var tContainer=document.getElementById('transcriptions_preview')

function loadTranscriptions(){
    tContainer.innerHTML=''
    var transcriptions=getTranscription()
    transcriptions.forEach(function (t,index){
        renderTranscriptions(t,index)
    });
}

function renderTranscriptions(t,index){    
    var tContent=document.createElement('p')
    tContent.dataset['index']=index
    tContent.innerHTML=`<small>${t.start}</small><small>${t.end}</small>${t.text}`
    tContainer.appendChild(tContent)
}

function closePreview(){
    //clear rendered transcriptions
}
function editTranscription(){

}
function editStart(){

}
function editEnd(){

}

/*function playVideoPreview(){

}*/
module.exports={
    loadTranscriptions
}

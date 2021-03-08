var { getTranscription } =require('./transcription.js')
var tContainer=document.getElementById('transcriptions_preview')

var transcriptions=getTranscription()
function renderTranscription(){
    var parent=document.getElementById('transcriptions_preview')
    parent.innerHTML=''
    transcriptions.forEach(function(index,t){
        parent.appendChild(createTComponent(index,t))
    })
}
function changeText(index){
    var newText=document.getElementsByName(`tText${index}`)[0].value
    console.log(newText)
}
function changeStart(index){
    var newStart=document.getElementsByName(`start${index}`)[0].value
    console.log(newStart)
}
function changeEnd(index){
    var newEnd=document.getElementsByName(`end${index}`)[0].value
    console.log(newEnd)
}


function createTComponent(t,index){
    var tComponent=document.createElement('div')
    tComponent.classList.add('transcription')
    var fastActions=document.createElement('div')
    fastActions.classList.add('fast_actions')
    fastActions.innerHTML=`
        <i class='fa fa-edit'></i>
        <input type='text' class='text' value='${t.text}' name='tText${index}' onkeyup='changeText(${index})'/>
        <i class='fa fa-trash'></i>
    `
    var timmer=document.createElement('div')
    timmer.classList.add('timmer')
    timmer.innerHTML=`
        <span>
            Start: <input type='text' value='${t.startSec}' name='start${index}' onkeyup='changeStart(${index})'/>
        </span>
        <span>
            End: <input type='text' value='${t.endSec}' name='end${index}' onkeyup='changeEnd(${index})'/>
        </span>
    `
    tComponent.appendChild(fastActions)
    tComponent.appendChild(timmer)
    return tComponent
}

module.exports={
    renderTranscription,
    changeText,
    changeEnd,
    changeStart
}

var { getTranscription,setTfromSec } =require('./transcription.js')
var tContainer=document.getElementById('transcriptions_preview')
var tsEdit=false

var transcriptions=getTranscription()

function renderTranscription(){
    var parent=document.getElementById('transcriptions_preview')
    parent.innerHTML=''
    transcriptions.forEach(function(index,t){
        parent.appendChild(createTComponent(index,t))
    })
}
function changeText(index){
    tsEdit=true
    var newText=document.getElementsByName(`tText${index}`)[0].value
    transcriptions[index].text=newText
}
function changeStart(index){
    tsEdit=true
    var newStart=document.getElementsByName(`start${index}`)[0].value
    transcriptions[index].startSec=newStart
}
function changeEnd(index){
    tsEdit=true
    var newEnd=document.getElementsByName(`end${index}`)[0].value
    transcriptions[index].endSec=newEnd
}
function deleteTranscription(index){
    tsEdit=true
    delete transcriptions[index]
    renderTranscription()
}
function openAddTmenu(){
    var addTButton=document.getElementById('addTButton')
    addTButton.style.display='none'
    var addTMenu=document.getElementById('add_transcription')
    addTMenu.style.display='block'
}
function addNewTranscription(){
    tsEdit=true
    var addTButton=document.getElementById('addTButton')
    addTButton.style.display='block'
    var addTMenu=document.getElementById('add_transcription')
    addTMenu.style.display='none'
    var text=document.getElementsByName('new_transcription')[0].value
    var start=document.getElementsByName('newTstart')[0].value
    var end=document.getElementsByName('newTend')[0].value
    var tindex=document.getElementsByName('newTindex')[0].value
    var copyTranscription=[]
    transcriptions.forEach(function(index,t){
        if(index==tindex){
            copyTranscription[index]={"start":'',"end":'',"text":text,"startSec":start,"endSec":end}
        }else if(index>tindex){
            copyTranscription[index+1]=t
        }else{
            copyTranscription[index]=t
        }
    })
    transcriptions=copyTranscription
    renderTranscription()
}
function synchTranscriptions(){
    setTfromSec(transcriptions)
    renderTranscription()
    transcriptions=getTranscription()
    //make the new transcrption the global transcription
}

function createTComponent(t,index){
    var tComponent=document.createElement('div')
    tComponent.classList.add('transcription')
    var fastActions=document.createElement('div')
    fastActions.classList.add('fast_actions')
    fastActions.innerHTML=`
        Text:
        <input type='text' class='text' value='${t.text}' name='tText${index}' onkeyup='changeText(${index})'/>
        <button onclick='deleteTranscription(${index})'><i class='fa fa-trash'></i></button>
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
    changeStart,
    deleteTranscription,
    addNewTranscription,
    openAddTmenu,
    addNewTranscription,
    synchTranscriptions,
}

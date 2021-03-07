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
    var index_c=tIndexComponent(index)
    var start=tStartComponent(t,index)
    var end=tEndComponent(t,index)
    var text_c=tTextComponent(t,index)
    var elements=[index_c,start,end,text_c]
    elements.forEach(e=>{
        tContent.appendChild(e)
    })
    // tContent.innerHTML=`${index_c}${start}${text_c}${end}`
    tContainer.appendChild(tContent)
}
function tIndexComponent(index){
    var input=document.createElement('input')
    input.classList.add("inputSmall")
    input.type='number'
    input.value=index
    input.dataset['index']=index
    input.name=`index_${index}`
    input.addEventListener('keyup',(e)=>{
        console.log('edditing index')
    })
    return input
}

function tStartComponent(t,index){
    var input=document.createElement('input')
    input.value=t.start
    //input.classList.add('inputSmall')
    input.dataset['index']=index
    input.name=`start_${index}`
    input.addEventListener('keyup',(e)=>{
        console.log('edditing start')
    })
    return input
}

function tEndComponent(t,index){
    var input=document.createElement('input')
    input.value=t.end
    //input.classList.add('inputSmall')
    input.dataset['index']=index
    input.name=`end_${index}`
    input.addEventListener('keyup',(e)=>{
        console.log('edditing end')
    })
    return input
}
function tTextComponent(t,index){
    var input=document.createElement('input')
    input.value=t.text
    input.dataset['index']=index
    input.name=`text_${index}`
    input.addEventListener('keyup',(e)=>{
        console.log('edditing text')
    })
    return input
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

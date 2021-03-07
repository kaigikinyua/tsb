var { getTranscription } =require('./transcription.js')
var tContainer=document.getElementById('transcriptions_preview')

/*function loadTranscriptions(){
    tContainer.innerHTML=''
    var transcriptions=getTranscription()
    transcriptions.forEach(function (t,index){
        renderTranscriptions(t,index)
    });
}

function renderTranscriptions(t,index){    
    var tContent=document.createElement('div')
    tContent.classList.add('transcription_element')
    tContent.dataset['index']=index
    tContent.id=`tElement_${index}`
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
        console.log(e.target.parentNode)
    })
    return input
}

function tStartComponent(t,index){
    var input=document.createElement('input')
    input.value=t.startSec
    //input.classList.add('inputSmall')
    input.name=`start_${index}`
    input.addEventListener('keyup',(e)=>{
        console.log('edditing start')
    })
    return input
}

function tEndComponent(t,index){
    var input=document.createElement('input')
    input.value=t.endSec
    //input.classList.add('inputSmall')
    input.name=`end_${index}`
    input.addEventListener('keyup',(e)=>{
        console.log('edditing end')
    })
    return input
}
function tTextComponent(t,index){
    var input=document.createElement('input')
    input.value=t.text
    input.name=`text_${index}`
    input.addEventListener('keyup',(e)=>{
        console.log('edditing text')
    })
    return input
}*/
new Vue({
    el:'#transcriptions_preview',
    data:{
        transcriptions:getTranscription(),
    }
})

Vue.component('transcription',{
    props:['tObject'],
    template:`
        <div class='transcription_element'>
            <div class='first'>
                <input type='number' class='inputSmall' value='1'>
                <button><i class='fa fa-trash'></i></button>
            </div>
            <div>
                <input type='text' class='text' value='{{ tObject.text }}'/>
                <div class='time'>
                    <div class='time_fields_counter'>
                        <small>Start</small>
                        <input type='text' value='{{ tObject.start }}'>
                    </div>
                    <div class='time_fields_counter'>
                        <small>End</small>
                        <input type='text' value={{tObject.end}}>
                    </div>
                </div>
            </div>
        </div>
    `
}) 


module.exports={
    loadTranscriptions
}

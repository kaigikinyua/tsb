var { SaveSystem } =require('./files.js');
var { getTranscription,getVideoSrc }=require('./transcription')
var configs={}
var darkMode=false

//ui tags
const saveDelta=document.getElementById('saveDelta')
const changeSave=document.getElementById('saveType')
const savePathDefault=document.getElementById('saveTypeDefault')
const selectedLocation=document.getElementById('selected_location')

setTimeout(()=>{
    configs=JSON.parse(loadSettings())
},500)
function saveTranscription(){
    var videoPath=getVideoSrc()
   if(videoPath!=undefined && videoPath!=null){
        var filePath=videoPath.split('.')[0]+'.srt'
        var srtFilePath=filePath.split('file://')[1]
        var data=getTranscription()
        var s=new SaveSystem(srtFilePath)
        if(data!=undefined && data.length>0){
            s.exportToSrtFile(data)
        }
    }else{
        console.log("Please ensure you have loaded a video")
    }
}


function loadSettings(){
    var s=new SaveSystem('./data/configs.json')
    var data=s.fetchData()
    configs=JSON.parse(data);
    var stylesheet=document.getElementById('theme')
    if(configs.settings.theme=="dark"){
        stylesheet.href='./static/css/themes/dark.css'
        darkMode=true
    }else{
        stylesheet.href='./static/css/themes/light.css'
    }
    if(configs.settings.saveLocation=='default'){
        selectedLocation.style.display='none'
    }
    return data;
}
function saveSettings(){
    var s=new SaveSystem('./data/configs.json')
    s.saveData(JSON.stringify(configs))
}
function changeTheme(){
    var stylesheet=document.getElementById('theme')
    if(darkMode==false){
        stylesheet.href="./static/css/themes/dark.css"
        configs.settings.theme="dark"
        darkMode=true
    }else{
        stylesheet.href='./static/css/themes/light.css'
        configs.settings.theme="light"
        darkMode=false
    }
    saveSettings()
}
saveDelta.onchange=()=>{
    var newDeltaValue=document.getElementById("saveDelta").value
    //converting to milli seconds
    newDeltaValue=newDeltaValue*1000
    configs.settings.saveDelta=newDeltaValue
    saveSettings()
}
changeSave.onchange=(e)=>{
    selectedLocation.style.display='block'
    if(e.target.checked){
        const dialog=require("electron").remote.dialog;
        dialog.showOpenDialog({ properties: ['openDirectory'] })
        .then(result=>{
            var p=document.getElementById('location_path')
            p.innerHTML=result.filePaths
            configs.settings.saveLocation=result.filePaths
            saveSettings()
            //display success message
        })
        .catch((err)=>{
            //display error message
            //log error to a log file
            console.log(err)
        })
    }
}
savePathDefault.onchange=(e)=>{
    if(e.target.checked){
        configs.settings.saveLocation='default'
        changeSave.checked=false
        selectedLocation.style.display='none'
        saveSettings()
        //display success mesage to user
    }
}

module.exports={
    changeTheme,
    configs
}
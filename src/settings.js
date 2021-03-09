var { SaveSystem } =require('./files.js');
var { getTranscription,getVideoSrc }=require('./transcription')
var configs={}
var darkMode=false
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
var saveDelta=document.getElementById('saveDelta')
var changeSave=document.getElementById('saveType')
var selectedLocation=document.getElementById('selected_location')

function loadSettings(){
    var s=new SaveSystem('./data/configs.json')
    var data=s.fetchData()
    configs=JSON.parse(data);
    var stylesheet=document.getElementById('theme')
    if(configs.settings[2].theme="dark"){
        stylesheet.href='./static/css/themes/dark.css'
        darkMode=true
    }else{
        stylesheet.href='./static/css/themes/light.css'
    }
    return data;
}
function saveSettings(){
    //console.log(JSON.stringify(configs))
    var s=new SaveSystem('./data/configs.json')
    s.saveData(JSON.stringify(configs))
}
function changeTheme(){
    var stylesheet=document.getElementById('theme')
    if(darkMode==false){
        stylesheet.href="./static/css/themes/dark.css"
        configs.settings[2].theme="dark"
        darkMode=true
    }else{
        stylesheet.href='./static/css/themes/light.css'
        configs.settings[2].theme="light"
        darkMode=false
    }
    saveSettings()
}
saveDelta.onchange=()=>{
    changeSaveDelta()
}
changeSave.onchange=(e)=>{
    if(e.target.value='media_location'){
        selectedLocation.style.display="none"
        changeDefaultSave()
    }
    else{
        //open file dialog and pic a DIRECTORY

    }
}
function changeSaveDelta(){
    console.log('Changing save delta')
}
function changeDefaultSave(){
    console.log('Changing default save')
}
function changeSaveRate(){
    console.log('changing save rate')
}

module.exports={
    changeTheme,
}

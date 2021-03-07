const fs=require('fs')
var { getTranscription }=require('./transcription')
var { getVideoSrc }=require('./transcription.js')
//console.log(convertToSrtTimeFormat(7200.000))
class SaveSystem{
    filepath
    constructor(filepath){
        this.filepath=filepath
        console.log(this.filepath)
    }
    fetchData(){
        var data=fs.readFileSync(this.filepath,'utf-8')
        return data
    }
    saveData(data){
        fs.writeFile(this.filepath, data, "utf-8", (error, data) => {
            if (error){
                console.error("error: " + error);
            }
        });
        //save important data to ./data/projects/projects.json
        //['path to original video','path to srt file']
        console.log("Saving data...")
        return true
    }
    exportToSrtFile(data){
        var exportDataString="";
        //console.log(data)
        for(var i=0;i<data.length;i++){
            //console.log(data[i].start)
            //console.log(data[i].end)
            exportDataString+=`${i}\n${data[i].start} --> ${data[i].end}\n${data[i].text}\n\n`
        }
        this.saveData(exportDataString)
        console.log(exportDataString)
    }
}

function saveConfigs(configs){
    // var filepath='./data/configs.json'
    // var s=new SaveSystem(filepath)
    // var data=s.fetchData()
    // console.log(data)
}
function getConfigs(){
    var filepath='./data/configs.json'
    var s=new SaveSystem(filepath)
    var data=s.fetchData()
    console.log(data)
}

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
setInterval(saveTranscription(),3000)
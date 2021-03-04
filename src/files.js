const fs=require('fs')
var { getTranscription }=require('./transcription')
var { video }=require('./transcription.js')
//console.log(convertToSrtTimeFormat(7200.000))
class SaveSystem{
    filepath
    constructor(filepath){
        this.filepath=filepath
        console.log(this.filepath)
    }
    fetchData(){
        return 'This is the data'
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
            exportDataString+=`${i}\n${data[i].start} ---> ${data[i].end}\n${data[i].text}\n`
        }
        this.saveData(exportDataString)
        console.log(exportDataString)
    }
}
function saveTranscription(){
   // if(video.pathToVideo!=undefined && video.pathToVideo!=null){
        var data=getTranscription()
        //change parameter of SaveSystem('path') to video.pathToVideo
        var s=new SaveSystem("./tests/file.srt")
        //s.saveData(JSON.stringify(data))
        if(data!=undefined && data.length>0){
            s.exportToSrtFile(data)
        }
    /*}else{
        console.log("Please ensure you have loaded a video")
    }*/
}
setInterval(saveTranscription(),3000)
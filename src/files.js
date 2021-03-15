const fs= require('fs')
var { Notification }=require('./notifications.js')

var SaveSystem=class SaveSystem{
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
        //check if file exists [true->create a new file and save ]:[false -> continue to save]
        fs.writeFile(this.filepath, data, "utf-8", (error, data) => {
            if (error){
                console.error("error: " + error);
                Logs.error(`Could not write to ${this.filepath} \n data:${data}`)
            }
        });
        return true
    }
    exportToSrtFile(data){
        var exportDataString="";
        for(var i=0;i<data.length;i++){
            exportDataString+=`${i}\n${data[i].start} --> ${data[i].end}\n${data[i].text}\n\n`
        }
        this.saveData(exportDataString)
    }
    //append data to existing file
}
var Logs=class Logs{
    static logPath="./data/logs/"
    static error(message){
        var date=new Date()
        filename=data.toDateString()
        var s=new SaveSystem(`${logPath}${filename}`)
        s.saveData(message.toString())
    }
}
//setInterval(saveTranscription(),3000)
module.exports={SaveSystem,Logs}
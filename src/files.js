const fs=require('fs')
var { getTranscription }=require('./transcription')
class SaveSystem{
    constructor(filepath){}
    fetchData(){
        return 'This is the data'
    }
    saveData(data){
        fs.writeFile("./tests/file.json", data, "utf-8", (error, data) => {
            if (error){
                console.error("error: " + error);
            }
        });
        console.log("Saving data...")
        return true
    }
}
function saveTranscription(){
    var data=getTranscription()
    var s=new SaveSystem(data)
    s.saveData(JSON.stringify(data))
}
setInterval(saveTranscription(),1000)
const { SaveSystem } =require('./files.js')
const { getTranscriptions }=require('./transcription')
var project={
    name:null,
    videoPath:null,
    tsPath:null,
    projectTranscriptions:getTranscriptions()
}
function getProjectDetails(){return project}
function setProjectDetails(newProjectDetails){ project=newProjectDetails}

function createProject(){
    var projectDetailsString=JSON.stringify(project)
    var s=new SaveSystem(`./data/projects/${project.name}.json`)
    s.saveData(`${projectDetailsString}\n`)
}

function loadProject(projectname){
    var s=new SaveSystem(`./data/projects/${projectname}`)
    var projectData=s.fetchData()
    console.log(projectData)
    //set current video path to videoElement attribute
    //load transcriptions to the global transcriptions
}

function deleteProject(projectname){
    //add delete file method to savesystem
}

module.exports={
    createProject,
    loadProject,
    deleteProject,
    getProjectDetails,
    setProjectDetails
}
const { SaveSystem } =require('./files.js')
const { getTranscriptions,setTfromSec }=require('./transcription')
var project={
    name:null,
    videoPath:null,
    tsPath:null,
    projectTranscriptions:null //getTranscriptions()
}
function getProjectDetails(){return project}
function setProjectDetails(newProjectDetails){ project=newProjectDetails}

function createProject(){
    var projectDetailsString=JSON.stringify(project)
    var s=new SaveSystem(`./data/projects/${project.name}.json`)
    s.saveData(`${projectDetailsString}\n`)
    var projectList=getProjects()
    projectList.push({"name":project.name,"date":new Date()})
    var pSave=new SaveSystem('./data/logs/project_list.json')
    pSave.saveData(JSON.stringify(projectList))
}

function getProjects(){
    var s=new SaveSystem('./data/logs/project_list.json')
    var projectList=s.fetchData()
    return JSON.parse(projectList)
}
function renderProjects(){
    var container=document.getElementById('project_list')
    container.innerHTML=''
    var projectList=getProjects()
    projectList.forEach(function(project,index){
        var projectContainer=document.createElement('div')
        projectContainer.classList.add('project')
        projectContainer.innerHTML=`
            <h3>${project.name}</h3>
            <div class='project_actions'>
                <button class="edit" onclick='loadProject('${index}')'><i class='fa fa-edit'></i></button>
                <button class="delete" onclick='deleteProject('${index}')'><i class='fa fa-trash'></i></button>
            </div>
        `
        container.appendChild(projectContainer)
    })
}

function loadProject(projectname){
    var s=new SaveSystem(`./data/projects/${projectname}`)
    var projectData=s.fetchData()
    console.log(projectData)
    //set current video path to videoElement attribute
    //load transcriptions to the global transcriptions
}

function deleteProject(projectNum){
    //add delete file method to savesystem
}


module.exports={
    createProject,
    loadProject,
    deleteProject,
    getProjectDetails,
    setProjectDetails,
    renderProjects,
}
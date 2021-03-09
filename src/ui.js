var { renderTranscription }=require('./preview.js')
var { renderProjects }=require('./projects.js')
function closeTab(){
    var tabs=document.querySelectorAll('section.tab')
    tabs.forEach(tab=>{
        tab.classList.remove('tab_show')
        tab.classList.add('tab_hidden')
    })
}
function openTab(tabID){
    closeTab()
    var tab=document.getElementById(tabID)
    tab.classList.remove('tab_hidden')
    tab.classList.add('tab_show')
}

//preview
function openPreview(){
    openTab('preview_window')
    renderTranscription()
}
function openProjectsTab(){
    openTab('projects_tab')
    renderProjects()
}
//settings
function openSettings(){
    openTab('settings')
}

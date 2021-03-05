var darkMode=false

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
}


//settings
function openSettings(){
    openTab('settings')
}

//theme
function changeTheme(){
    var stylesheet=document.getElementById('theme')
    if(darkMode==false){
        stylesheet.href="./static/css/themes/dark.css"
        darkMode=true
    }else{
        stylesheet.href='./static/css/themes/light.css'
        darkMode=false
    }
}

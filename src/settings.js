var saveDelta=document.getElementById('saveDelta')
var changeSave=document.getElementById('saveType')
var selectedLocation=document.getElementById('selected_location')
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


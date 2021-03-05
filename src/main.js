const { BrowserWindow,app,dialog }=require("electron");
const path=require("path")
const url=require('url')

function createWindow(){
    let win=new BrowserWindow(
            {
                icon:"./static/images/logo.png",
                width:800,height:600,
                webPreferences:{
                    nodeIntegration:true,
                    enableRemoteModule: true,
                }
            }
        )
    win.loadFile("tsbr.html")
    app.on('window-all-closed',()=>{
        if(process.platform!=='darwin'){
            app.quit()
        }
    })
}

function openDialog(){
    dialog.showOpenDialog(
        {
            properties:[
                'openFile',
                'multiSelections'
            ]
        }
    )
}


app.on('ready',createWindow)
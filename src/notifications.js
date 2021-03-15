class Notification{
    static error(message){ Notification.notificationElement(message,'e')}
    static warning(message){ Notification.notificationElement(message,'w') }
    static success(message){ Notification.notificationElement(message,'s')}
    static notificationElement(message,status){
        var notif_elem=document.getElementById('notification')
        notif_elem.innerHTML=`<p>${message}</p>`
        var notif_elmClass=''
        if(status=='e'){notif_elmClass='error'}
        else if(status=='w'){notif_elmClass='warning'}
        else if(status=='s'){notif_elmClass='success'}
        else{notif_elmClass='normal'}
        notif_elem.classList.add(notif_elmClass)
        setTimeout(()=>{
            var notif_elem=document.getElementById('notification')
            notif_elem.innerHTML=''
            notif_elem.classList.remove(notif_elmClass)
        },5000)
    }
}
module.exports={Notification}
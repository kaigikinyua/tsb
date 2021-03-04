const timeDeltas={
    processing:5,
}
var transCription=[]
function addTransCription({text,currentTime}){
    var start;
    if(currentTime>timeDeltas.processing){
        start=currentTime-timeDeltas.processing
    }else{
        start=currentTime-1
    }
    transCription.push(
        {
            "start":start,
            "end":currentTime,
            "text":text
        }
    )
    console.log(transCription)
}
module.exports={SaveSystem,timeDeltas,addTransCription}
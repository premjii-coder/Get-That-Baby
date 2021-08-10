img="";
object=[];
status='';
sound="";

function preload(){
    //img=loadImage('img.jpeg');\\
    sound=loadSound('baby.mp3');

}


 




function setup(){
    canvas=createCanvas(600,400);
    canvas.center()
    webcam=createCapture(VIDEO);
    webcam.size(600,400);
    webcam.hide();
    objectdetection=ml5.objectDetector('cocossd',model_loaded);
    document.getElementById('status').innerHTML="status = detecting objects";
}
function model_loaded(){
    console.log("model is loaded");
    status=true;
  
}
function gotresult(error,result){
if(error){
    console.log(error);

}
console.log(result);
object=result;
}
function draw(){
    image(webcam,0,0,600,400);
    
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
     
        objectdetection.detect(webcam,gotresult);
        for(i=0;i<object.length;i++){
         
            
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+"  "+percent+"%",object[i].x + 15,object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);

             
        if(object[i].label>"person"){
            document.getElementById('status').innerHTML="baby detected";
           console.log("STOP");
           song.play();
                    }
                    else{
                        document.getElementById('status').innerHTML="baby is not detected";
                        console.log("baby is not found");
                        song.play();
                    }
                  if(object[i].length==0){
                    document.getElementById('status').innerHTML="baby is not detected";
                    console.log("baby is not found");
                    song.play();
                  }  
        }
       




    }
   /*
    text("dog",45,75);
    noFill();
    stroke('#4287f5')
    rect(20,60,420,350)
    fill('#4287f5');
    noFill();
    text("cat",300,100);
    stroke('#4287f5');
    rect(300,90,250,300);*/
}
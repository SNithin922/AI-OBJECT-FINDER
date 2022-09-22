object_name = document.getElementById("input").value;
object = [];
function setup()
{
    canvas = createCanvas(360,320);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}
function start()
{
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    if(object[i].label == object_name)
    {
        variable_name_holds_webcamLiveView.stop();
        objectDetector.detect(gotResult);
        var synth = window.speechSynthesis;
          speak_data = objects[i].label;
          var utterthis = new SpeechSynthesisUtterance(speak_data);
          synth.speak(utterthis);
        document.getElementById("status").innerHTML = object_name+"Found";
    }
    else{
         document.getElementById("status").innerHTML = "Object Not Found"
    }
}
function modelLoaded()
{
    console.log("model loaded");
    status = true;
}
function draw()
{
    image(video,0,0,360,320);
    if(status !="")
    {
        objectDetector.detect(video,gotResult);
        for(i=0;i < object.length; i++)
        {
            document.getElementById("status").innerHTML = "Status : Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of object detected :" + object.length;
            r = random(255);
            g = random(255);
            b = random(255);
            fill("#ff0000");
            percent = floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%", object[i].x +15, object[i].y+15);
            noFill();
            stroke(r,g,b);
           
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function gotResult(error,results)
{
   if(error)
   {
       console.log(error);
   }
   console.log(results);
   object = results;
}
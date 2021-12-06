var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
var centerx = canvas.width/2;
var centery = canvas.height/2;

let colors = ["","red","blue","yellow","green","purple","orange","black","pink","","","","","","","",""]
var rechts;
var turns;//aantal halve cirkels van de spiraal
var droneCount;//aantal drones
var zoekRadius;//de zoek radius van de drones
var beginRadius;//de radius van de spiraal
var batteryLife;//het aantal meters dat een drone kan vliegen met een batterij


function init(){
  rechts = true;
  turns = parseInt(document.getElementById("TurnCount").value);
  droneCount = parseInt(document.getElementById("DroneCount").value);
  zoekRadius = parseInt(document.getElementById("SearchRadius").value);
  beginRadius = parseInt(document.getElementById("SearchRadius").value);
  batteryLife = parseInt(document.getElementById("BatteryLife").value);
}

function drawspiral(){
  init();
  context.clearRect(0,0, canvas.width, canvas.height);
  console.clear();
  var x = centerx;
  var y = centery;
  for (var spiralCount = 1; spiralCount <= droneCount; spiralCount++) {
    //reset vals
    var i = 0;
    var radius = beginRadius;
    context.beginPath();

    while (i < turns) {
      console.log("sc: ", spiralCount, "sr: ", radius, "cy: ", y, "br: ", beginRadius);
      if (rechts) {
        getCoord(x, y, radius, rechts);
        y = centery + zoekRadius;
        if (i == 0) {
          radius += beginRadius;
        }
        else{
          radius += ((zoekRadius/2)*droneCount);
        }
        i++;
        rechts = false;
      }
      else{
        getCoord(x, y, radius, rechts);
        y = centery - ((droneCount*(zoekRadius/2))-zoekRadius);
        if (i == 0) {
          radius += beginRadius;
        }
        else{
          radius += ((zoekRadius/2)*droneCount);
        }
        i++;
        rechts = true;
      }
    }
    y = centery - ((zoekRadius/2)*spiralCount);
    beginRadius = beginRadius + (zoekRadius/2);


    context.moveTo(centerx, centery+zoekRadius);
    context.strokeStyle = colors[spiralCount];
    context.closePath();
    context.stroke();
  }
}

function getCoord(dx, dy, locradius, rechts){
  var beginDeg;
  var endDeg;
  var spiraalCenterx = dx;
  var spiraalCentery = dy;
  if (rechts){
    beginDeg = 90;
    endDeg = 270;
  }
  else{
    beginDeg = 270;
    endDeg = 450;
  }
  while(beginDeg <= endDeg){
    //soscastoa
    dy = spiraalCentery + (locradius*Math.sin(beginDeg*(Math.PI/180)));
    dx = spiraalCenterx + (locradius*Math.cos(beginDeg*(Math.PI/180)));
    context.lineTo(dx,dy);
    console.log("deg: ", beginDeg, "x: ", dx, "y: ", dy);
    beginDeg++;
  }
}

function checkBattery(){

}

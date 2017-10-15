window.onload = setup;
var width, height, coordinates;

function setup() {
    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    sizeCanvas();
    setupControls();

    coordinates = getCoordinates("pizza", 10);

    window.setInterval(draw, 16.6);
}

function draw() {
  clearCanvas();
  for (i = 0; i < coordinates.length; i++) {
    var p = coordinates[i];
    c.fillStyle = randomColour();
    c.beginPath();
    c.arc(p.x, p.y, 3, 0, 2*Math.PI);
    c.fill();
  }
}

//Everything below here contains functions used above

function sizeCanvas() {
    height = window.innerHeight;
    width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
}

function setupControls(){
  textInput = document.getElementById("text");
  textInput.oninput = function(){
    coordinates = getCoordinates(textInput.value, 10);
  }
}

function clearCanvas(){
  c.clearRect(0, 0, width, height);
}

window.onresize = function() {
    sizeCanvas();
    draw();
};

function getCoordinates(text, step){
  var values = [];
  var data;
  c.font = "300px sans-serif";
  clearCanvas();
  c.fillText(text, 150,300);
  data = c.getImageData(0, 0, width, height).data;
  clearCanvas();
  for (i = 0; i < height; i+=step) {
      for (j = 4; j < width; j+=step) {
          if(data[i * width * 4 + j * 4+3] !=0)
          values.push({
            x: j,
            y: i
          });
      }
  }
  return values;
}

function randomColour() {
    var r = Math.floor(Math.random() * 150) + 105;
    var g = Math.floor(Math.random() * 150) + 105;
    var b = Math.floor(Math.random() * 150) + 105;
    return "rgb(" + r + "," + g + "," + b + ")";
}

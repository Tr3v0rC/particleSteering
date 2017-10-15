window.onload = setup;
var width, height, coordinates;

function setup() {
    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    sizeCanvas();

    coordinates = getCoordinates("pizza", 10);

    window.setInterval(draw, 16.6);
}

function draw() {
  for (i = 0; i < coordinates.length; i++) {
    var p = coordinates[i];
    c.beginPath();
    c.arc(p.x, p.y, 2, 0, 2*Math.PI);
    c.fill();

  }
}

function sizeCanvas() {
    height = window.innerHeight;
    width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
}

window.onresize = function() {
    sizeCanvas();
    draw();
};

function getCoordinates(text, step){
  var values = [];
  var data;
  c.font = "300px Arial";
  c.fillText(text, 150,300);
  data = c.getImageData(0, 0, width, height).data;
  c.clearRect(0, 0, width, height);
  for (i = 0; i < height; i+=step) {
      for (j = 4; j < width; j+=step) {
          var a = i * width * 4 + j * 4;
          if(data[a+3] !=0)
          values.push({
            x: j,
            y: i
          });
      }
  }
  return values;
}

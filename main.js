window.onload = setup;
var width, height;

function setup() {
    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    sizeCanvas();

    //draw();
    //window.setInterval(draw, 16.6);
}

function draw() {
  //Put main code / loop here
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

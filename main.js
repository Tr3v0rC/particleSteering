window.onload = setup;
var width, height, particles, text = "test";

function setup() {
    canvas = document.getElementById("canvas");
    c = canvas.getContext("2d");
    sizeCanvas();
    setupControls();
    generateParticles(text);
    window.setInterval(draw, 16.6);
}

function draw() {
    clearCanvas();
    for (i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.behaviors();
        p.update();
        p.show();
    }
}

function sizeCanvas() {
    height = window.innerHeight;
    width = window.innerWidth;
    canvas.height = height;
    canvas.width = width;
}

function setupControls() {
    textInput = document.getElementById("text");
    textInput.value = text;
    textInput.oninput = function() {
        text = textInput.value;
        generateParticles(text);
    }
    resetButton = document.getElementById("reset");
    resetButton.onclick = function() {
        generateParticles(text);
    }
}

function clearCanvas() {
    c.clearRect(0, 0, width, height);
}
window.onresize = function() {
    sizeCanvas();
    generateParticles(text);
    draw();
};

function getCoordinates(text, step) {
    var values = [];
    var data;
    c.font = "300px sans-serif";
    clearCanvas();
    c.fillText(text, 150, 300);
    data = c.getImageData(0, 0, width, height).data;
    clearCanvas();
    for (i = 0; i < height; i += step) {
        for (j = 4; j < width; j += step) {
            if (data[i * width * 4 + j * 4 + 3] != 0) values.push({
                x: j,
                y: i
            });
        }
    }
    return values;
}

function generateParticles(text) {
    particles = [];
    var values = getCoordinates(text, 10);
    for (i = 0; i < values.length; i++) {
        particles.push(new Particle(values[i], randomColour()));
    }
}

function randomColour() {
    var r = Math.floor(Math.random() * 150) + 105;
    var g = Math.floor(Math.random() * 150) + 105;
    var b = Math.floor(Math.random() * 150) + 105;
    return "rgb(" + r + "," + g + "," + b + ")";
}

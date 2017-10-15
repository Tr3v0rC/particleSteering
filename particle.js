
function Particle(p, c){
  this.target = {x: p.x, y: p.y};
  this.pos = {x: random(0, window.width), y: random(0, window.height)};
  this.vel = {x: random(-0.2, 0.2), y: random(-0.2, 0.2)};
  this.acc = {x: 0, y: 0};
  this.colour = c;
  this.size = 3;
  this.speed = 5;
  this.force = 0.4;
}

Particle.prototype.update = function(){
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;

  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;

  this.acc.x *= 0;
  this.acc.y *= 0;
}

Particle.prototype.show = function(){
  c.fillStyle = this.colour;
  c.beginPath();
  c.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);
  c.fill();
}

Particle.prototype.behaviors = function(){
  var arrive = this.arrive(this.target);
  this.applyForce(arrive);

  var flee = this.flee({x: mouseX, y: mouseY});
  this.applyForce(flee);
}

Particle.prototype.applyForce = function(f){
  this.acc.x += f.x;
  this.acc.y += f.y;
}

Particle.prototype.flee = function(target){
  var desired = {x: target.x - this.pos.x, y: target.y - this.pos.y};
  var d = Math.sqrt(desired.x*desired.x+desired.y*desired.y);
  if(d<50){
      desired.x *= -1;
      desired.y *= -1;
      max = map(d,0,50,0,this.speed);
      var speed = magnitude(desired, this.speed);
      var target =  {x: speed.x-this.vel.x, y: speed.y-this.vel.y}
      return {x: limit(target.x, this.force), y: limit(target.y, this.force)};
    } else {
      return {x:0,y:0};
    }
}

Particle.prototype.arrive = function(target){
  var s = {x: target.x - this.pos.x, y: target.y - this.pos.y};
  var d = Math.sqrt(s.x*s.x+s.y*s.y);
  var max = this.speed;
  if(d<100){
    max = map(d,0,100,0,this.speed);
  }
  s = magnitude(s, max);
  s =  {x: s.x-this.vel.x, y: s.y-this.vel.y}
  return {x: limit(s.x, this.force), y: limit(s.y, this.force)};
}


function add(a, b){
  var tx = a.x + b.x;
  var ty = a.y + b.y;
  return {tx, ty};
}
function random(a, b){
  return Math.random()*(b-a)+a;
}
function magnitude(val, max){
  var calc = Math.sqrt(val.x*val.x+val.y*val.y)
  return {x:(max/calc)*val.x, y:(max/calc)*val.y}
}
function limit(val, max){
  if(val < max)
    return val;
  else {
    return max;
  }
}
function map(val, a, b, c, d){
  return v = (val/b)*d
}

var canvas = document.getElementById("canvas");
mouseX = 0;
mouseY= 0;
canvas.onmousemove = function(e){
  mouseX = e.clientX;
  mouseY = e.clientY;
  console.log(mouseX + " "+ mouseY);
}

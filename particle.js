
function Particle(p, c){
  this.pos = {x: p.x, y: p.y};
  this.vel = {x: random(-0.2,0.2), y: random(-0.2,0.2)};
  this.acc = {x: random(-0.2,0.2), y: random(-0.2,0.2)};
  this.colour = c;
  this.size = 3;
}
Particle.prototype.update = function(){
  this.pos.x += this.vel.x;
  this.pos.y += this.vel.y;

  this.vel.x += this.acc.x;
  this.vel.y += this.acc.y;
}

Particle.prototype.show = function(){
  c.fillStyle = this.colour;
  c.beginPath();
  c.arc(this.pos.x, this.pos.y, this.size, 0, 2*Math.PI);
  c.fill();
}

function add(a, b){
  var tx = a.x + b.x;
  var ty = a.y + b.y;
  return {tx, ty};
}
function random(a, b){
  return Math.random()*(b-a)+a;
}

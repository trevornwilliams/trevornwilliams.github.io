let spirals = [];
let numSpirals = 20;  // Increased number of spirals
let ripples = [];
let lastRippleTime = 0;
let maxRetries = 100;  // Limit retries to avoid infinite loop

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  background(240);
  
  createSpirals();
}

function createSpirals() {
  spirals = [];
  
  for (let i = 0; i < numSpirals; i++) {
    let retries = 0;
    let x, y, radius;
    do {
      x = random(width);
      y = random(height);
      radius = random(width * 0.03, width * 0.08);  // Adjusted radius range
      retries++;
    } while (checkOverlap(x, y, radius) && retries < maxRetries);
    
    if (retries < maxRetries) {
      spirals.push({
        x: x,
        y: y,
        radius: radius,
        angle: 0,
        angleStep: random(0.05, 0.2),
        color: color(random(50, 200), random(50, 200), random(50, 200), 150)
      });
    }
  }
}

function checkOverlap(x, y, radius) {
  for (let spiral of spirals) {
    let d = dist(x, y, spiral.x, spiral.y);
    if (d < radius + spiral.radius) {
      return true;
    }
  }
  return false;
}

function draw() {
  background(240);
  
  // Add new ripple on mouse move
  if (mouseX !== pmouseX || mouseY !== pmouseY) {
    let timeNow = millis();
    if (timeNow - lastRippleTime > 50) {
      ripples.push({
        x: mouseX, 
        y: mouseY, 
        radius: 0, 
        maxRadius: random(150, 250),
        strength: random(1, 2)
      });
      lastRippleTime = timeNow;
    }
  }
  
  // Update and draw ripples
  for (let i = ripples.length - 1; i >= 0; i--) {
    let ripple = ripples[i];
    ripple.radius += 2;
    ripple.strength *= 0.98;
    
    if (ripple.radius > ripple.maxRadius || ripple.strength < 0.01) {
      ripples.splice(i, 1);
    }
  }
  
  for (let spiral of spirals) {
    let points = [];
    for (let i = 0; i < 150; i++) {
      let r = spiral.radius * (i / 150);
      let x = spiral.x + r * cos(spiral.angle + i * spiral.angleStep);
      let y = spiral.y + r * sin(spiral.angle + i * spiral.angleStep);
      
      // Apply ripple effect
      for (let ripple of ripples) {
        let d = dist(x, y, ripple.x, ripple.y);
        if (d < ripple.radius && d > ripple.radius - 10) {
          let angle = atan2(y - ripple.y, x - ripple.x);
          x += cos(angle) * ripple.strength * 5;
          y += sin(angle) * ripple.strength * 5;
        }
      }
      
      points.push({x, y});
    }
    
    // Draw multiple overlapping lines for pastel effect
    for (let j = 0; j < 5; j++) {
      beginShape();
      noFill();
      stroke(red(spiral.color), green(spiral.color), blue(spiral.color), 50);
      strokeWeight(1);
      for (let point of points) {
        let offsetX = random(-2, 2);
        let offsetY = random(-2, 2);
        curveVertex(point.x + offsetX, point.y + offsetY);
      }
      endShape();
    }
    
    spiral.angle += 0.02;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createSpirals();
}
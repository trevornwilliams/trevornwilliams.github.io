let theShader;
const vert = `
attribute vec3 aPosition;
attribute vec2 aTexCoord;
varying vec2 vTexCoord;
void main() {
  vTexCoord = aTexCoord;
  vec4 positionVec4 = vec4(aPosition, 1.0);
  gl_Position = positionVec4;
}
`;
const frag = `
precision mediump float;
varying vec2 vTexCoord;
uniform vec2 u_resolution;
uniform float u_time;
const vec3 paper = vec3(0.96, 0.92, 0.83);
const vec3 p0 = vec3(0.88, 0.51, 0.58);
const vec3 p1 = vec3(0.99, 0.95, 0.58);
const vec3 p2 = vec3(0.60, 0.78, 0.95);
const vec3 p3 = vec3(0.78, 0.82, 0.80);
const vec3 p4 = vec3(0.82, 0.87, 0.94);
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}
float fbm(vec2 uv) {
  float v = 0.0;
  float a = 0.5;
  for(int i = 0; i < 4; i++) {
    v += a * hash(uv);
    uv *= 2.0;
    a *= 0.5;
  }
  return v;
}
vec3 getColor(float t) {
  float idx = fract(t) * 5.0;
  float f = fract(idx);
  float seg = floor(idx);
  if (seg < 1.0) return mix(p0, p1, f);
  if (seg < 2.0) return mix(p1, p2, f);
  if (seg < 3.0) return mix(p2, p3, f);
  if (seg < 4.0) return mix(p3, p4, f);
  return mix(p4, p0, f);
}
void main() {
  vec2 uv = vTexCoord;
  
  // Important: p5.js WEBGL has 0,0 at center and y is inverted
  // Convert from 0-1 range to -1 to 1 range
  vec2 pos = uv * 2.0 - 1.0;  
  
  // Apply aspect ratio correction
  pos.x *= u_resolution.x / u_resolution.y;
  
  float dist = length(pos);
  float pulse = sin(dist * 10.0 - u_time * 3.0) * 0.5 + 0.5;
  float n = fbm(pos * 4.0 - u_time * 0.2);
  float band = fract(dist * 2.0 - u_time * 0.4 + n * 0.5);
  vec3 col = getColor(band);
  float grain = (hash(pos * 400.0 + u_time * 0.4) - 0.5) * 0.02;
  vec3 final = mix(paper, col, pulse) + grain;
  gl_FragColor = vec4(final, 1.0);
}
`;

function preload() {
  theShader = new p5.Shader(this.renderer, vert, frag);
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
}

function draw() {
  // Clear the background to ensure full canvas usage
  background(0);
  
  // Set shader and uniforms
  shader(theShader);
  theShader.setUniform('u_resolution', [width, height]);
  theShader.setUniform('u_time', millis() / 1000);
  
  // Draw a full-screen quad
  // Using beginShape() for maximum control
  beginShape();
  vertex(-1, -1, 0, 0, 0);
  vertex(1, -1, 0, 1, 0);
  vertex(1, 1, 0, 1, 1);
  vertex(-1, 1, 0, 0, 1);
  endShape(CLOSE);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
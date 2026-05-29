let trazos = [];
let cantTrazos = 13;
let opacidad = 95;
let escala = 0.3;        // tamaño inicial de los PNG
let escalaMin = 0.3;     //  techo mínimo (no pueden achicarse más de esto)
let escalaMax = 1.5;     //  techo máximo (no pueden agrandarse más de esto)
let pasoCambio = 0.05;   //  cuánto sube o baja la escala por cada tecla
let trazosEnPantalla = [];

function preload() {
  for (let i = 0; i < cantTrazos; i++) {
    let nombre = "data/trazo" + nf(i, 2) + ".png";
    trazos[i] = loadImage(nombre);
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  window.addEventListener('contextmenu', function(event) {
    event.preventDefault();
  });
  colorMode(HSB, 360, 100, 100, 100);
  background(255);
  frameRate(10);
  noLoop();
}

function dibujarTrazo(x, y) {
  let cual = int(random(cantTrazos));
  let colorH = random(0, 360);
  let anchoT = trazos[cual].width * escala;  //  usa la escala global
  let altoT = trazos[cual].height * escala;  //  usa la escala global

  trazosEnPantalla.push({
    cual: cual,
    x: x,
    y: y,
    colorH: colorH
  });

  tint(colorH, random(80, 100), 100, opacidad);
  image(trazos[cual], x, y, anchoT, altoT);
}

function redibujarTodo() {
  background(255);
  for (let i = 0; i < trazosEnPantalla.length; i++) {
    let t = trazosEnPantalla[i];
    let anchoT = trazos[t.cual].width * escala;   //  escala afecta solo el tamaño del PNG
    let altoT = trazos[t.cual].height * escala;   //  el canvas no se toca para nada
    tint(t.colorH, 90, 100, opacidad);
    image(trazos[t.cual], t.x, t.y, anchoT, altoT);
  }
}

function mousePressed() {
  // CLIC DERECHO: solo baja la opacidad 
  if (mouseButton === RIGHT) {
    opacidad = max(5, opacidad - 10);
    redibujarTodo();
    return;
  }

  // CLIC IZQUIERDO: agranda los PNG paso a paso
  if (mouseButton === LEFT) {
    escala = min(escalaMax, escala + pasoCambio); // sube pero no pasa de escalaMax
    redibujarTodo();
  }
}

function dibujarGrupo() {
  let cantidad = int(random(5, 15));
  for (let i = 0; i < cantidad; i++) {
    let x = random(width);
    let y = random(height);
    dibujarTrazo(x, y);
  }
}

function keyPressed() {
  // TECLA I: dibuja un cuadrado aleatorio 
  if (key === 'i' || key === 'I') {
    dibujarGrupo();
  }

  // BARRA ESPACIADORA: borra un cuadradro aleatorio 
  if (key === ' ') {
    if (trazosEnPantalla.length > 0) {
      let indiceAleatorio = int(random(trazosEnPantalla.length));
      trazosEnPantalla.splice(indiceAleatorio, 1);
      redibujarTodo();
    }
  }

  // TECLA R: achica 
  if (key === 'r' || key === 'R') {
    escala = max(escalaMin, escala - pasoCambio); // baja pero no pasa de escalaMin
    redibujarTodo();
  }
}



function draw() {
  // 
}


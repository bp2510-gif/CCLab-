let button1;
let button2;
let button3;
let button4;
let button5;
let smokes = [];
let counter = 0;

let showFortune = false;
let cardY = 600; // starting from below the screen
let fortuneMessage = "The stars are in your favor !";

let screen = 0;
let introImage;

function preload() {
  sound = loadSound("assets/Glitter.mp3");
  introImage = loadImage("assets/image.png");
}

function setup() {
  createCanvas(800, 500);
  button1 = new Button(200, 150, "This");
  button2 = new Button(400, 150, "is");
  button3 = new Button(500, 300, "!");
  button4 = new Button(300, 300, "fortune");
  button5 = new Button(600, 150, "your");
}

function mousePressed() {
  if (screen == 1) {
    sound.play();
  }
}

function draw() {
  if (screen == 0) {
    image(introImage, 0, 0, width, height);

    if (frameCount > 180) {
      screen = 1;
    }
  }
  if (screen == 1) {
    background("#E6ADFF");
    button1.display();
    button1.update();
    button2.display();
    button2.update();
    button3.display();
    button3.update();
    button4.display();
    button4.update();
    button5.display();
    button5.update();

    if (
      button1.popped &&
      button2.popped &&
      button3.popped &&
      button4.popped &&
      button5.popped
    ) {
      showFortune = true;
    }

    // Showing the fortune card here
    if (showFortune) {
      background("rgb(141,86,141)"); // darker background

      if (cardY > height / 2) {
        cardY -= 3;
      }

      drawFortune();
    }

    for (let i = 0; i < smokes.length; i++) {
      // here, were assigning smokes[i] to a
      // local variable - this is just for
      // ergonomic reasons - we could also
      // directly write smokes[i].display() etc
      let s = smokes[i];
      s.display();
      s.update();
    }

    // loop the array back to front for removing
    // unneeded elements
    for (let i = smokes.length - 1; i >= 0; i--) {
      let s = smokes[i];
      if (s.isDone == true) {
        smokes.splice(i, 1);
      }
    }
  }

  // console.log("Particles: " + smokes.length);
}

function drawFortune() {
  rectMode(CENTER);

  // card
  fill("rgb(247,246,223)");
  stroke(180, 150, 120);
  strokeWeight(4);
  rect(width / 2, cardY, 400, 150, 20);

  // title
  noStroke();
  fill("#B3A270");
  textAlign(CENTER, CENTER);
  textSize(18);
  textFont("Courier New");
  text("🌟A message from the past🌟", width / 2, cardY - 40);

  // message
  textSize(22);
  fill("rgb(58,7,58)");
  text(fortuneMessage, width / 2, cardY, 323, 100);
}

class Button {
  constructor(x, y, txt) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.size = 90;
    this.col = color(random(255), random(255), random(255));
    this.popped = false;
  }
  display() {
    if (this.popped == true) {
      textAlign(CENTER, CENTER);

      textFont("Courier New");
      textSize(24);
      fill(this.col);
      text(this.txt, this.x, this.y);
    } else {
      noStroke();
      fill(this.col);
      circle(this.x, this.y, this.size);
    }
  }
  update() {
    this.checkMouseCursor();

    // maybe we want to do other things here as
    // well in the future...
  }
  checkMouseCursor() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < this.size / 2) {
      console.log(this.size);
      console.log("counter:" + counter);

      if (this.size < 100) {
        this.size += 2;

        if (counter < 4) {
          counter = counter + 1;
          smokes.push(new Smoke(mouseX, mouseY));
        }
      }
    }
    if (this.size >= 100) {
      this.popped = true;
      counter = 0;
    }
  }
}

class Smoke {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.strength = 255;
    this.speedX = random(-3, 3);
    this.speedY = random(0.5, 1.5);
    this.isDone = false;
  }
  display() {
    fill(255, this.strength);
    noStroke();
    circle(this.x, this.y, 100);
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedX = this.speedX * 0.99;
    this.speedY = this.speedY * 0.99;
    if (this.strength > 0) {
      this.strength -= 1;
      // } else {
      // mark as done when fully transparent
      // this.isDone = true;
    }
  }
}

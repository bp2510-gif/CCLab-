let dancer;

function setup() {
  // no adjustments in the setup function needed...
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent("p5-canvas-container");

  // ...except to adjust the dancer's name on the next line:
  dancer = new AmyDancer(width / 2, height / 2);
}

function draw() {
  // you don't need to make any adjustments inside the draw loop
  background(0);
  //drawFloor(); // for reference only

  dancer.update();
  dancer.display();
}

// You only code inside this class.
// Start by giving the dancer your name, e.g. LeonDancer.
class AmyDancer {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.color = color(255);
    this.baseY = startY;
    this.bounce = 0;
    this.wind = 0;
    this.rightArm = 0;
    this.leftArm = 0;



    // add properties for your dancer here:

    //..
    //..
  }
  update() {
    // update properties here to achieve
    // your dancer's desired moves and behaviour
    // this.x = this.x + 1;
    // this.y = this.y - 1;

    this.bounce += 0.05;

    this.wind += 0.04;

    // whole flower moves up and down
    this.y = this.baseY + sin(this.bounce) * 20;

    // arms wave sideways
    this.rightArm = sin(this.bounce) * 0.8;
    this.leftArm = -sin(this.bounce) * 0.8;

    this.leaf = (this.wind) * 0.8;
    sin(this.bounce) * 0.4 + random(-0.1, 0.1);
  }
  display() {
    // the push and pop, along with the translate
    // places your whole dancer object at this.x and this.y.
    // you may change its position on line 19 to see the effect.
    push();
    translate(this.x, this.y);
    fill(this.color);
    rect(this.x, this.y, 200, 200);

    // ******** //
    // ⬇️ draw your dancer from here ⬇️
    //stem
    push();
    stroke("rgb(0,163,0)");
    strokeWeight(2);
    fill("green");
    rect(0, 50, 5, 50);

    pop();
    //leaf
    push();
    translate(0, 50);


    rotate(this.leaf);
    fill("rgb(88,195,88)");
    stroke("green");

    beginShape();
    curveVertex(0, 0);
    curveVertex(20, -10);
    curveVertex(50, 0);
    curveVertex(20, 15);
    curveVertex(0, 0);

    endShape(CLOSE);
    fill("green");
    strokeWeight(2);
    line(10, 0, 40, 2);
    line(10, -2, 20, -8);
    line(20, -1, 30, -6);
    line(10, 0, 30, 12);

    pop();
    //flower petalll
    push();

    stroke("rgb(169,84,179)");
    strokeWeight(3);
    fill("rgb(230,167,222)");
    circle(5, 20, 70);
    circle(5, -20, 70);
    circle(-20, 0, 70);
    circle(25, 0, 70);

    //  circle(30,15,60);
    // circle(-20,20,60);
    pop();
    //middle flower 
    push();
    stroke("#887A04");
    strokeWeight(3);
    fill("rgb(238,238,123)");
    circle(0, 0, 60);

    pop();
    //facee
    push();

    fill("rgb(31,26,26)");
    circle(16, 0, 8);

    circle(-16, 0, 8);

    ellipse(0, 14, 6, 3);

    pop();
    //arms 

    // right armm
    push();
    translate(25, 10);
    rotate(this.rightArm);

    stroke("rgba(252,105,161,0.53)");
    strokeWeight(5);
    line(0, 0, 30, 30);
    circle(30, 30, 10);

    pop();

    // left armmm
    push();
    translate(-20, 10);
    rotate(this.leftArm);

    stroke("rgba(250,95,141,0.53)");
    strokeWeight(5);
    line(0, 0, -30, 30);
    circle(-30, 30, 10);

    pop();

    // ⬆️ draw your dancer above ⬆️
    // ******** //

    // the next function draws a SQUARE and CROSS
    // to indicate the approximate size and the center point
    // of your dancer.
    // it is using "this" because this function, too,
    // is a part if your Dancer object.
    // comment it out or delete it eventually.
    this.drawReferenceShapes();

    pop();
  }
  drawReferenceShapes() {
    noFill();
    stroke(255, 0, 0);
    line(-5, 0, 5, 0);
    line(0, -5, 0, 5);
    stroke(255);
    rect(-100, -100, 200, 200);
    fill(255);
    stroke(0);
  }
}



/*
GOAL:
The goal is for you to write a class that produces a dancing being/creature/object/thing. In the next class, your dancer along with your peers' dancers will all dance in the same sketch that your instructor will put together. 

RULES:
For this to work you need to follow one rule: 
  - Only put relevant code into your dancer class; your dancer cannot depend on code outside of itself (like global variables or functions defined outside)
  - Your dancer must perform by means of the two essential methods: update and display. Don't add more methods that require to be called from outside (e.g. in the draw loop).
  - Your dancer will always be initialized receiving two arguments: 
    - startX (currently the horizontal center of the canvas)
    - startY (currently the vertical center of the canvas)
  beside these, please don't add more parameters into the constructor function 
  - lastly, to make sure our dancers will harmonize once on the same canvas, please don't make your dancer bigger than 200x200 pixels. 
*/
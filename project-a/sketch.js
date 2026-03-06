let speedY = 3;
let n = 120;
let bgR, bgG, bgB;
let brush;
let mouseReleased;

let creatureX;
let creatureY;
let creatureTargetX;
let creatureTargetY;

let whichToColor = 0;

function setup() {
    let canvas = createCanvas(800, 500);
    canvas.id("p5-canvas");
    canvas.parent("p5-canvas-container");
    colorMode(HSB);

    bgR = random(0, 255);
    bgG = random(0, 255);
    bgB = random(0, 255);
    brush = 40;
    //noCursor();

    creatureX = -200;
    creatureY = random(0, height);
    creatureTargetX = width / 2;
    creatureTargetY = height / 2;
}

function draw() {
    background(bgR, bgG, bgB);

    drawCreature(creatureX, creatureY);

    creatureX = lerp(creatureX, creatureTargetX, 0.01);
    creatureY = lerp(creatureY, creatureTargetY, 0.01);

    if (frameCount % 80 == 79) {
        creatureTargetX = random(width * 0.2, width * 0.8);
        creatureTargetY = random(height * 0.2, height * 0.8);
    }

    textSize(brush);
    text("🎨", 70, 450);
    if (mouseIsPressed == true) {
        colorMode(RGB);
        let c = get(mouseX, mouseY);
        bgR = hue(c);
        bgG = saturation(c);
        bgB = brightness(c);
        colorMode(HSB);
    }

    if (mouseY < 200) {
        brush = 70;
    } else if (mouseY < 400) {
        brush = 150;
    }
    textSize(brush);
    text("🖌️", mouseX, mouseY);
}

function drawCreature(cx, cy) {
    push();
    translate(cx, cy);

    drawPetalMembrane(0, 0);
    drawFurOnPetalMembrane(0, 0);

    // core circle
    fill("rgb(118,82,88)");
    stroke("rgb(64,37,42)");
    strokeWeight(3);
    circle(0, 0, 60);

    // long circle

    if (mouseIsPressed === true) {
        fill(0);
    } else {
        fill(255);
    }
    fill("#4CAF50");
    stroke("#18E5FF");
    let cellX = map(noise(frameCount * 0.01), 0, 1, -180, 180);
    let cellY = map(noise(frameCount * 0.005), 0, 1, -120, 120);
    ellipse(cellX, cellY, 50, 90);

    // triangle

    if (mouseIsPressed === true) {
        fill("rgb(169,73,190)");
    } else {
        fill("rgb(221,14,93)");
        stroke("rgb(255,162,0)");
        strokeWeight(1);
    }
    rect(-100, 40, 40, 50, map(sin(frameCount / 30 + 10), -1, 1, 0, 20));

    if (mouseIsPressed === true) {
        fill("brown");
    } else {
        fill("#233FDDEA");
        stroke("rgb(180,206,25)");
        strokeWeight(1);
    }
    triangle(
        map(sin(frameCount / 10), -1, 1, 10, 30) - 100,
        250 - 150,
        map(sin(frameCount / 20 + 2), -1, 1, 0, 40) + 0,
        150 - 250,
        265 - 300,
        80 - 250
    );

    // yellow circle
    fill("#FFEB3B");
    stroke("rgb(180,206,25)");
    strokeWeight(5);
    circle(cellX, cellY, 40);

    // square
    fill("rgb(236,0,160)");
    stroke("#FD1100");
    strokeWeight(4);
    rect(-150, -100, map(sin(frameCount / 40 + 1), -1, 1, 0, 50));

    // moving line triangle
    stroke("rgb(77,20,20)");
    fill("rgb(77,20,20)");
    triangle(-50, -100, -200, map(sin(frameCount / 40 + 2), -1, 1, 0, 50) - 120);

    // green triangle line
    stroke("rgb(138,225,42)");
    fill("rgb(63,230,60)");
    triangle(42, 150, -113, -123);

    // rectangle that moves

    if (mouseIsPressed === true) {
        fill("pink");
    } else {
        fill("rgb(253,255,96)");
        stroke("rgb(255,162,0)");
        strokeWeight(1);
    }
    rect(0, 0, 100, 50, map(sin(frameCount / 40 + 3), -1, 1, 0, 50));

    // circle within a circle
    fill("rgb(167,53,255)");
    strokeWeight(6);
    stroke("rgb(250,163,178)");
    circle(-150, 0, map(sin(frameCount / 40 + 4), -1, 1, 0, 50));

    // triangle
    fill("rgb(133,246,246)");
    stroke("rgb(133,246,246)");
    strokeWeight(1);
    triangle(
        map(sin(frameCount / 10), -1, 1, 10, 30),
        350 - 250,
        map(sin(frameCount / 40 + 2), -1, 1, 0, 50),
        350 - 250,
        100,
        300 - 250
    );

    // small circle
    fill("rgba(167,53,255,0.57)");
    strokeWeight(6);
    stroke("rgb(250,163,178)");
    circle(-150, 0, map(sin(frameCount / 40 + 4), -1, 1, 0, 20));

    // big pulsing circle
    fill("rgb(255,5,195)");
    strokeWeight(20);
    stroke("#FF980072");
    circle(100, -100, map(sin(frameCount / 20 + 4), -1, 1, 0, 70));

    // polygon
    fill("rgb(249,149,255))");
    strokeWeight(25);
    stroke("#00FF5EA5");

    push();
    translate(-100, 100);

    beginShape();

    let sides = 7.5;

    for (let i = 0; i < sides; i++) {
        let angle = map(i, 0, sides, 0, 360);

        let r = map(sin(frameCount / 16 + i), -1, 1, 20, 40);
        let x = cos(radians(angle)) * r;
        let y = sin(radians(angle)) * r;

        vertex(x, y);
    }

    endShape(CLOSE);

    pop();

    // small circle
    fill("rgba(255,5,195,0.59)");
    strokeWeight(7);
    stroke("#9C27B0");
    circle(20, 80, 10);

    pop();
}

function drawPetalMembrane(x, y) {
    let baseSize = 80;
    let petals = 6.5;
    let bump = 16;
    let petalSpeed = 6;
    // make the membrane move

    if (mouseIsPressed === true) {
        baseSize = 110; // expanding outward
        bump = 30; // petal bumps
        petalSpeed = 12; // wiggle faster
    }

    push();
    noFill();

    if (mouseY > 200) {
        brush = 70;
        baseSize = 110; // expanding outward
        bump = 30; // petal bumps
        petals = 4;
    }

    if (mouseIsPressed === true) {
        fill("#FFC107");
    } else {
        fill("rgba(255,255,255,0.55)");
        stroke("#E380EE");
    }

    strokeWeight(7);

    beginShape();
    for (let i = 0; i < n; i++) {
        let angle = map(i, 0, n, 0, 360);

        let petalWave = sin(radians(angle) * petals + frameCount / 20) * bump;
        let softWave = sin(frameCount / 10 + i / 6) * petalSpeed;

        let rad = baseSize + petalWave + softWave;

        let px = x + cos(radians(angle)) * rad * 2.2;
        let py = y + sin(radians(angle)) * rad * 1.9;

        curveVertex(px, py);
    }

    endShape(CLOSE);
    pop();
}

function drawFurOnPetalMembrane(x, y) {
    let baseSize = 97;
    let petals = 6;
    let bump = 18;
    let petalSpeed = 6;

    push();
    stroke(255);
    strokeWeight(2);

    for (let i = 0; i < n; i++) {
        let angle = map(i, 0, n, 0, 360);

        let petalWave = sin(radians(angle) * petals + frameCount / 20) * bump;
        let softWave = sin(frameCount / 10 + i / 5) * petalSpeed;

        let rad = baseSize + petalWave + softWave;

        let px = x + cos(radians(angle)) * rad * 2.2;
        let py = y + sin(radians(angle)) * rad * 1.9;

        let furLength = 6 + sin(frameCount / 12) * 4;

        let fx = px + cos(radians(angle)) * furLength;

        let fy = py + sin(radians(angle)) * furLength;

        line(px, py, fx, fy);
    }
    pop();
}

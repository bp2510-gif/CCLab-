let button1;
let button2;
let button3;
let button4;
let button5;
let smokes = [];
let counter = 0;

let showFortune = false;
let cardY = 600;
let fortuneMessage = "From small beginnings come great things!!";

let screen = 0;

let introImage;

let card1;

let card2;

let card3;

let card4;

let card5;

let submitMessage;

// GH: added (will be populated by MQTT mechanism)
let messages = ["", "", "", "", ""];

let nameInput;

let messageIndex = 0;

let send;

let transitionTimer = 0;

function preload() {
  sound = loadSound("assets/Glitter.mp3");

  sound1 = loadSound("assets/F.mp3");
  introImage = loadImage("assets/Group.png");

  card1 = loadImage("assets/card1.png");

  card2 = loadImage("assets/card2.png");

  card3 = loadImage("assets/card3.png");

  card4 = loadImage("assets/card4.png");

  card5 = loadImage("assets/card5.png");

  send = loadImage("assets/send.png");
}

function setup() {
  createCanvas(800, 500);

  setupMqtt();
  // mqttConnected();

  nameInput = createInput();
  nameInput.size(250, 100);
  nameInput.position(250, 250);
  nameInput.style("font-size", "18px");
  nameInput.style("font-family", "Courier New");
  nameInput.style("text-align", "center");
  nameInput.attribute("placeholder", "type your fortune!");
  nameInput.style("border", "0");
  nameInput.style("border-radius", "20px");
  nameInput.style("background", "rgba(212, 160, 212, 0.5)");
}

// function keyPressed() {
//   if (keyCode === ENTER) {
//     screen = 1;
//   }
// }

function mousePressed() {
  //enter button

  let d = dist(mouseX, mouseY, 550, 300);

  if (d < 100) {
    screen = 1;
    sound1.play();
  }

  if (
    mouseX > width / 2 - 140 &&
    mouseX < width / 2 + 140 &&
    mouseY > 405 &&
    mouseY < 455
  ) {
    // reset everything
    screen = 0;

    showFortune = false;
    cardY = 600;
    smokes = [];
    counter = 0;

    nameInput.show();
    nameInput.value("");

    button1.popped = false;
    button2.popped = false;
    button3.popped = false;
    button4.popped = false;
    button5.popped = false;
  }

  if (screen == 0) {
    sound.play();
    found1 = false;
    found2 = false;
    found3 = false;
    found4 = false;
    found5 = false;
  }

  // store the textssss

  let name = nameInput.value();

  if (name !== "") {
    messages.push(name);

    if (messages.length > 5) {
      messages.shift();
    }
    nameInput.value("");

    // pick a random index (0-4)
    // and store the new text for other people to retrieve
    // let randomIndex = floor(random(5));
    // shareMessageViaMqtt(randomIndex, name);

    // alternatively:

    for (let i = 0; i < 5; i++) {
      if (messages[i] != "") {
        shareMessageViaMqtt(i, messages[i]);
      }
    }
  }

  button1 = new Button(170, 150, messages[0], card1);
  button2 = new Button(370, 150, messages[1], card2);
  button3 = new Button(470, 300, messages[2], card3);
  button4 = new Button(270, 300, messages[3], card4);
  button5 = new Button(570, 150, messages[4], card5);
}

function draw() {
  background(216, 192, 216);

  if (screen == 0) {
    image(introImage, 0, 0, width, height);
    image(send, 462, 250, 180, 100);
  }

  if (screen == 1) {
    nameInput.hide();
    background("#120b1a");

    fill("rgb(244,198,244)");
    textSize(18);
    textFont("Courier New");
    text("Search 5 fortune cards left behind for the future...", 160, 50);

    // reveal the cards

    let d = dist(mouseX, mouseY, 400, 250);

    if (d < 100) {
      image(card1, 350, 170, 100, 160);
      fill("rgb(198,118,216)");
      circle(50, 40, 20);
      found1 = true;
      // console.log("1:"+found1);
    }
    let d2 = dist(mouseX, mouseY, 200, 100);

    if (d2 < 100) {
      image(card2, 150, 50, 100, 160);
      fill("rgb(198,118,216)");
      circle(70, 40, 20);
      circle(50, 40, 20);
      found2 = true;
      // console.log("2:"+found2);
    }
    let d3 = dist(mouseX, mouseY, 600, 300);

    if (d3 < 100) {
      image(card3, 550, 220, 100, 160);
      fill("rgb(198,118,216)");
      circle(90, 40, 20);
      circle(70, 40, 20);
      circle(50, 40, 20);
      found3 = true;
      // console.log("3:"+found3);
    }

    let d4 = dist(mouseX, mouseY, 250, 350);

    if (d4 < 100) {
      image(card4, 200, 270, 100, 160);
      fill("rgb(198,118,216)");
      circle(110, 40, 20);
      circle(90, 40, 20);
      circle(70, 40, 20);
      circle(50, 40, 20);
      found4 = true;
      // console.log("4:"+found4);
    }
    let d5 = dist(mouseX, mouseY, 700, 150);

    if (d5 < 100) {
      image(card5, 650, 70, 100, 160);
      fill("rgb(198,118,216)");
      circle(130, 40, 20);
      circle(110, 40, 20);
      circle(90, 40, 20);
      circle(70, 40, 20);
      circle(50, 40, 20);
      found5 = true;
    }

    // condiiton that makes it transition from screen
    // if (d< 100 && mouseIsPressed) {
    //   screen = 1.5;
    // }
    //candy:

    if (found1 && found2 && found3 && found4 && found5) {
      screen = 1.5;
      transitionTimer = 0;
    }

    fill("rgba(255,255,255,0.58)");
    noStroke();
    circle(mouseX, mouseY, 160);
  }

  if (screen == 1.5) {
    background("#582E5F");
    transitionTimer++;

    // reveal cards one by one (process note: intially i used framecount but that confuses the entire screen time so i use variables instead here)

    if (transitionTimer > 30) {
      image(card1, 170, 150, 90, 140);
    }

    if (transitionTimer > 60) {
      image(card2, 370, 150, 90, 140);
    }

    if (transitionTimer > 150) {
      image(card3, 470, 300, 90, 140);
    }

    if (transitionTimer > 120) {
      image(card4, 270, 300, 90, 140);
    }

    if (transitionTimer > 90) {
      image(card5, 570, 150, 90, 140);
    }

    if (transitionTimer > 180) {
      if (transitionTimer > 290) {
        screen = 2;
        sound1.stop();
      }
    }
  }

  if (screen == 2) {
    background("#EFCFFC");

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
    nameInput.hide();

    if (
      button1.popped &&
      button2.popped &&
      button3.popped &&
      button4.popped &&
      button5.popped &&
      frameCount > button5.popTime + 530
    ) {
      if (showFortune == false) {
        let availableMessages = messages.filter((messages) => messages !== "");

        // randomly pick the message form the tarot card?

        if (availableMessages.length > 0) {
          fortuneMessage = random(availableMessages);
        }
        showFortune = true;
      }
    }

    // Showing the fortune card here
    if (showFortune) {
      background("rgb(141,86,141)");

      if (cardY > height / 2) {
        cardY -= 3;
      }

      fill("rgb(245,220,255)");
      rect(width / 2, 430, 280, 50, 15);

      fill("purple");
      textAlign(CENTER, CENTER);
      textSize(16);
      textFont("Courier New");
      text("Click for another fortune", width / 2, 430);
      drawFortune();
    }
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

function drawFortune() {
  rectMode(CENTER);

  // card
  fill("rgb(247,246,223)");
  stroke(180, 150, 120);
  strokeWeight(4);
  rect(width / 2, cardY, 400, 150, 50);

  noStroke();
  fill("#BBA04E");
  textAlign(CENTER, CENTER);
  textSize(20);
  textFont("Courier New");
  text("🌟A message from the past🌟", width / 2, cardY - 40);

  // message fortune?
  textSize(22);
  textFont("Times New Roman");
  fill("rgb(58,7,58)");
  text(fortuneMessage, width / 2, cardY, 323, 100);
}

class Button {
  constructor(x, y, txt, cardname) {
    this.x = x;
    this.y = y;
    this.txt = txt;
    this.size = 90;
    this.col = color(random(255), random(255), random(255));
    this.popped = false;
    this.selected = false;
    this.cardChoice = cardname;
    this.popTime = 0;
  }
  display() {
    if (this.popped == true) {
      fill(255);
      rectMode(CENTER);
      rect(this.x, this.y, 170, 170, 15);

      textAlign(CENTER, CENTER);

      textFont("Times New Roman");
      textSize(20);
      fill(this.col);
      text(this.txt, this.x, this.y, 150);

      // if(this.size >5){
      //   this.size = this.size -5;
      // }
      // image(card1, this.x, this.y, this.size, this.size * 1.6);
    } else {
      // noStroke();
      // fill(this.col);
      // square(this.x, this.y, this.size);
      // this.size =90;

      image(this.cardChoice, this.x, this.y, this.size, 144);
    }
    // image(card1, this.x, this.y, this.size, this.size * 1.6);
  }
  update() {
    this.checkMouseCursor();

    // maybe we want to do other things here as
    // well in the future...
  }
  checkMouseCursor() {
    let d = dist(mouseX, mouseY, this.x, this.y);
    if (d < 80 && this.popped == false) {
      //console.log(this.size);
      //console.log("counter:" + counter);

      if (this.size > 2) {
        this.size -= 2;
      }
      if (counter < 10) {
        counter = counter + 1;
        smokes.push(new Smoke(mouseX, mouseY));
      }
    }
    if (this.size <= 2 && this.popped == false) {
      sound.play();
      this.popped = true;
      this.popTime = frameCount;
      counter = 0;
    }
  }
}

class Smoke {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.strength = 160;
    this.speedX = random(-8, 8);
    this.speedY = random(0.5, 1.5);
    this.isDone = false;
  }
  display() {
    fill(128, 0, 128, this.strength);
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
    } else {
      // mark as done when fully transparent
      this.isDone = true;
    }
  }
}

// GH: MQTT code starts here
// hopefully no need to modify below this one ;)

let mqttClient;

function setupMqtt() {
  mqttClient = mqtt.connect("wss://mqtt-dashboard.com:8884/mqtt");
  mqttClient.on("connect", mqttConnected);
  mqttClient.on("message", mqttMessage);
}

function mqttConnected() {
  console.log("Connected to MQTT");
  for (let i = 0; i < 5; i++) {
    mqttClient.subscribe("amy/message/" + i);
  }
}

function mqttMessage(topic, message) {
  message = message.toString(); // turns the message into a proper string
  let index = topic.slice(-1); // gets the last character
  index = int(index); // turns it into a number
  messages[index] = message;
  console.log("got messages", message);
}

function shareMessageViaMqtt(index, message) {
  if (mqttClient.connected == true) {
    mqttClient.publish("amy/message/" + index, message, { retain: true });
  } else {
    console.warn("MQTT is not connected, ignoring message to send");
  }
}

// // GH: test (remove)
// function keyPressed() {
//   let randomIndex = floor(random(5));
//   shareMessageViaMqtt(randomIndex, "test text?");
// }
//questions i have

// what conditions i can make to transition from screen 1.5 to 2 --> after they find all 5 cards

//Candy:add checking boolean variable and make them true one the card is found. I added in the code below already
let found1,
  found2,
  found3,
  found4,
  found5 = false;

// card one by one conditions

// card flipping part --> text box underneath so long texts does not get overlapped

//Candy: text() can accept a width value to set how wide you want it to be, and below is how you want to modify the code
//let str = "This is a long sentence that will automatically wrap to a new line when it reaches the max width.";
// text(str, 50, 50, 200); //  the last value means you want the max width = 200

//candy: for card fliping, I updated in the class button. to make each card height a static number and width a variable: gets smaller when the mouse is hovering it to fake the effect, you can adjust the number to make it faster the fliping. also you need to change the image displayMode to be center for it to look more natural.
//       if (this.size > 2) {
//         this.size -= 2;

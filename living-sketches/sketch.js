let scanned = [];
let flower;
let curFlower = 0;

let scanned1 = [];
let butterfly;
let curButterfly = 0;





function preload() {
  for (let i = 1; i <= 7; i++) {
    scanned.push(loadImage("20260323171422162_000" + i + ".jpg"));
  }

  for (let i = 1; i <= 3; i++) {
    scanned1.push(loadImage("20260323155755968_000" + i + ".jpg"));
  }


}





function setup() {
  createCanvas(800, 500);

  eraseBg(scanned, 10);
  flower = crop(scanned, 50, 30, 750, 780);

  eraseBg(scanned1, 10);
  butterfly = crop(scanned1, 200, 100, 360, 800);



}





function draw() {
  background(255);

  // examples: eye
  push();
  translate(width, 50);
  rotate(radians(90));
  image(
    flower[curFlower],
    0,
    0,
    flower[0].width * 0.75,
    flower[0].height * 0.75
  );
  pop();
  curFlower = floor((frameCount / 15) % flower.length);








  image(butterfly[curButterfly], mouseX, mouseY);

  curButterfly = (curButterfly + 1) % butterfly.length;

  curButterfly = floor((frameCount / 10) % butterfly.length);

}




// You shouldn't need to modify these helper functions:

function crop(imgs, x, y, w, h) {
  let cropped = [];
  for (let i = 0; i < imgs.length; i++) {
    cropped.push(imgs[i].get(x, y, w, h));
  }
  return cropped;
}

function eraseBg(imgs, threshold = 10) {
  for (let i = 0; i < imgs.length; i++) {
    let img = imgs[i];
    img.loadPixels();
    for (let j = 0; j < img.pixels.length; j += 4) {
      let d = 255 - img.pixels[j];
      d += 255 - img.pixels[j + 1];
      d += 255 - img.pixels[j + 2];
      if (d < threshold) {
        img.pixels[j + 3] = 0;
      }
    }
    img.updatePixels();
  }
  // this function uses the pixels array
  // we will cover this later in the semester - stay tuned
}

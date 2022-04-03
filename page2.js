let leafs = [];

let text0 = "Please click the leaf";
let text1 = "And both that morning equally lay";
let text2 = "In leaves no step had trodden back.";
let text3 = "Oh, I kept the first for another day!";
let text4 = "Yet knowing how way leads on to way,";
let text5 = "I doubted if I should ever come back.";
let text6 = "Please click the flower to continue.";

let clickCount = 0;

let changeText = true;
let textAlpha = 0;

let myfont;

let sound;

function preload() {
  //song = loadSound('/assets/bg1.mp3');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200,100,0);
  noStroke();
  bg = createGraphics(width, height);
  bg.background(255, 20);
  bg.noStroke();
  for (let i = 0; i < 300000; i++) {
    let x = random(width);
    let y = random(height);
    let s = noise(x * 0.01, y * 0.01) * 2;
    bg.fill(240, 50);
    bg.rect(x, y, s, s);
  }
  leafs[0] = new leaf();

  myfont = loadFont('DavidLibre-Medium.ttf');
  textFont(myfont);

  song.play();
}

function draw() {
  background(200,100,0);
  image(bg, 0, 0);
  if (leafs.length < 100 && random(100) > 96){
    leafs[leafs.length] = new leaf();
  }
  
  for(i = 0; i < leafs.length; i++){
    let click = false;
    leafs[i].update();
    leafs[i].show();
  }
  fill(255,textAlpha);
  if(changeText){
     if(textAlpha > 0) {
         textAlpha -= 3;
     }
     else {
         changeText = false;
         clickCount += 1;
         if(clickCount == 6){
            location.reload();
            location.href='page5.html';
         }
     }
  }
  else{
      if(textAlpha < 255){
        textAlpha += 3;
      }     
  }
  if(clickCount == 1){
      textSize(25);
      textAlign(CENTER);
      text(text0,width/2,height/2-20);
  }
  else if(clickCount == 2){
    textSize(25);
    textAlign(CENTER);
    text(text1,width/2,height/2-20);
    text(text2,width/2,height/2+20);
   }
   else if(clickCount == 3){
    textSize(25);
    textAlign(CENTER);
    text(text3,width/2,height/2-20);
    text(text4,width/2,height/2+20);
   }
   else if(clickCount == 4){
    textSize(25);
    textAlign(CENTER);
    text(text5,width/2,height/2-20);
   }
   else if(clickCount == 5){
    textSize(25);
    textAlign(CENTER);
    text(text6,width/2,height/2-20);
   }
}

function mousePressed(){
    for(i = 0; i < leafs.length; i++){
        if(leafs[i].check(mouseX,mouseY)){
            changeText = true;
        }
    }
}

class leaf {
  constructor() {
    this.x1 = random(0, 30);
    this.y1 = random(20, 60);
    this.x2 = random(30, 50);
    this.y2 = random(0, 20);
    this.x3 = random(50, 70);
    this.y3 = random(20, 50);
    this.x4 = random(30, 50);
    this.y4 = random(30, 80);
    this.ty = random(-20, -60);
    this.tx = random(width);
    this.r = random(100, 220);
    this.g = random(100, 200);
    this.b = random(0, 10);
		this.size = random(10, 20);
    this.speed = random(50,200) / 100;

    this.worldX = 0;
    this.worldY = 0;

    this.isDead = false;
    this.alpha = 255;

  }
  
  update() {
    this.ty += this.speed;
    if (this.ty > height + this.y4) {
      this.ty = random(-20, -50);
    }
    
  }
  
  show() {
      if(this.isDead){
          if(this.alpha > 0) this.alpha -= 5;
          else this.alpha = 0;
      }
      push();
    if(dist(mouseX,mouseY,this.worldX,this.worldY) < 20){
          fill(255,200,200,this.alpha);  
    }
    else{
      if(clickCount < 5)
        fill(this.r, this.g, this.b,this.alpha);
      else
        fill(200,255,80,this.alpha);
    }
    noStroke ();
    this.worldX  = this.tx;
    this.worldY = (this.ty + abs(cos(this.ty * 0.03) * 20));

    
    translate(this.worldX, this.worldY);
    rotate(sin(this.ty * 0.02));
    if(clickCount < 5)
    {
    push();
    scale(0.1);
    translate(-200,-300);
    triangle (250, 470, 0, 275, 200, 300);
    triangle (250, 470, 200, 300, 250, 0);
    triangle (250, 0, 300, 300, 250, 470);
    triangle (250, 470, 500, 275, 300, 300);
    triangle (70, 70, 170, 350, 230, 250);
    triangle (430, 70, 330, 350, 270, 250);
    stroke (216, 70, 25);
    line (250, 400, 0, 275);
    line (250, 400, 500, 275);
    line (250, 360, 70, 70);
    line (250, 360, 430, 70);
    pop();
    }

    else{
      push()
      ellipse(0,0,this.size,this.size)
      ellipseMode(CORNER)
      fill(80, 100, 255, this.alpha);	
      for(var i=0;i<16;i++){
          ellipse(this.size*0.3,-this.size*0.15,this.size,this.size*0.3);
          rotate(PI/8)
      }
      pop(); 
    }


    pop();
  }

  check(mx,my){
      if(dist(mx,my,this.worldX,this.worldY) < 20 && !this.isDead){
            this.isDead = true;
           
          return true;         
      }
      else
        return false;
  }
}

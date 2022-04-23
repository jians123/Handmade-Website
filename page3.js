let start = 0;

let fireflys = [];


let text0 = "Please click the firefly";
let text1 = "Then took the other, as just as fair,";
let text2 = "And having perhaps the better claim,";
let text3 = "Because it was grassy and wanted wear;";
let text4 = "Though as for that the passing there";
let text5 = "Had worn them really about the same,";
let text6 = "Please click the flower to continue.";

let clickCount = 0;
let changeText = true;
let textAlpha = 0;

let myfont;

let sound;
function preload() {
    //song = loadSound('/assets/bg2.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);

    for(let i = 0; i < 20; i++)
    {
        let f = new firefly();
        fireflys.push(f);
    }
textFont('Georgia');
    //myfont = loadFont('DavidLibre-Medium.ttf');
    //textFont(myfont);

   // song.play();
}

function draw() {
	background(0,30,0);
	xnoise = 0;
	ynoise = 0;
    randomSeed(10);
	for (let y = 0; y <= height; y += 16) {
	    ynoise += 0.1;
	    xnoise = 0;
	    for (let x = 0; x <= width; x += 16) {
	        xnoise += 0.01;
	        drawGrass(x, random(0,windowHeight), noise(xnoise, ynoise, start*0.01));
	    }
	}
    start += 1;
    fill(255);

      
      for(i = 0; i < fireflys.length; i++){
        let click = false;
        fireflys[i].update();
        fireflys[i].show();
      }

      fill(255,textAlpha);
  if(changeText){
     if(textAlpha > 0) {
         textAlpha -= 10;
     }
     else {
         changeText = false;
         clickCount += 1;
         if(clickCount == 6){
            location.reload();
            location.href='page6.html';
         }
     }
  }
  else{
      if(textAlpha < 255){
        textAlpha += 10;
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



function drawGrass(x, y, noiseFactor) {
	push();
	translate(x, y);
	rotate(-1.3+noiseFactor * radians(-180));
	stroke(77,random(100,200),30,random(50,255));
	strokeWeight(random(3));
	line(0, random(60), 0,random(60));
    line(1, random(60),1,random(60));
	pop();
}

function mousePressed(){
    for(i = 0; i < fireflys.length; i++){
        if(fireflys[i].check(mouseX,mouseY)){
            changeText = true;
        }
    }
}

class firefly {
    constructor() {
      this.ty = random(height);
      this.tx = random(width);
      this.r = random(120, 250);
      this.g = random(120, 250);
      this.b = random(10, 100);
          
      this.speedx = random(-1,1);
      this.speedy = random(-1,1);
    
    this.size = random(10,25);
    
  
      this.isDead = false;
      this.alpha = 255;
    }
    
    update() {
        this.tx += this.speedx;
        this.ty += this.speedy;

        if(frameCount % 30 == 0){
            randomSeed(frameCount+this.size);
            this.speedx = random(-1,1);
            this.speedy = random(-1,1);
        }
    }


    
    show() {
        if(this.isDead){
            if(this.alpha > 0) this.alpha -= 10;
            else this.alpha = 0;
        }
      push();
      if(dist(mouseX,mouseY,this.tx,this.ty) < 20){
          fill(255,200,200,this.alpha);
      }
      else{
          fill(this.r, this.g, this.b,this.alpha);
      }
      noStroke ();
      translate(this.tx, this.ty);
      if(clickCount < 5)
        ellipse(0,0,this.size,this.size);
      else{
        push()
        ellipse(0,0,this.size,this.size)
        ellipseMode(CORNER)
        fill(229, 75, 75, this.alpha);	
        for(var i=0;i<16;i++){
            ellipse(this.size*0.3,-this.size*0.15,this.size,this.size*0.3);
            rotate(PI/8)
        }
        pop(); 
      }
        

      pop();
    }
    
    edge(){
        if(this.tx > width) this.tx = 0;
        else if(this.tx < 0) this.tx = width;

        if(this.ty > height) this.ty = 0;
        else if(this.ty < 0) this.ty = height;
    }
    check(mx,my){
        if(dist(mx,my,this.tx,this.ty) < 20 && !this.isDead){
              this.isDead = true;
             
            return true;         
        }
        else
          return false;
    }
  }

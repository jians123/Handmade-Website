let bgImage;
let state = 0;

let alpha_left = 0;
let alpha_right = 0;



let sound;

function setup() {
    createCanvas(innerWidth, innerHeight);
}
  
function draw() {
    if(mouseX < width/2){
        state = 1;
    }else{
        state = 2;
    }

    if(state == 1){
        if(alpha_left < 100){
            alpha_left += 2;
        }
        if(alpha_right > 0){
            alpha_right -= 2;
        }
    }
    else if(state == 2){
        if(alpha_right < 100){
            alpha_right += 2;
        }
        if(alpha_left > 0){
            alpha_left -= 2;
        }
    }



    image(bgImage,0,0,width,height);
    noStroke();
    fill(255,100,0,alpha_left);
    rect(0,0,width/2,height);
    fill(255,alpha_left+100);
    
    fill(0,250,100,alpha_right);
    rect(width/2,0,width/2,height);
    fill(255,alpha_right+130);
}

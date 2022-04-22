let myfont;
let sound;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noiseDetail(8, 0.25);
	textFont('Georgia');
}

function mousePressed(){
	redraw();
}

function draw() {
    frameRate(0.5);
	noiseSeed(random(Number.MAX_VALUE));
	background(240);
	noFill();
	
	let theta0 = random(TWO_PI);
	for(let j = 0; j < 15; j++){
		background(208,127,20, 75);
		
		for(let i = 0; i < 20; i++){
			let h = random(map(j, 0, 5, 20, 50), map(j, 0, 5, 50, 150));
			let x = random(width);
			
			let y0 = 0.76*height + 10*j;
			let s = sin(theta0 + 0.01*x);
			let n = noise(0.01*x, j);
			let a = map(j, 0, 5, 80,20);
			let y = y0 + a*s*n;
			
			pine(x, y, h/2, h);			
		}
		
	}
}

function pine(x, y, w, h){
	let y0 = y - h;
	
	stroke(random(60,200), random(30,200), 0);
	noFill();
	
	strokeWeight(2);
	line(x, y, x, y - h);
	
	strokeWeight(0.5);
	let iter = random(3, 7);
	for(let i = y0; i < y; i += iter){
		let l = map(i, y0, y, 0, w);
		branch(x, i, l);
	}
	
}

function branch(x, y, l){
	for(let i = 0; i < 10; i++){
		let by = random(-1, 5);
		let bl = random(1);		
		bezier(x - bl*0.5*l, y + by, x - bl*0.25*l, y, 
					 x + bl*0.25*l, y, x + bl*0.5*l, y + by);
	}
}


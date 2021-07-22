var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score =0;
var particle;
var turn = 0;

var gameState = "PLAY";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {
     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }


    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }

    

    
}
 

function draw() {
  background("black");

  textSize(20)
  text("Score : "+score,20,30);
  textSize(25)
  text("500",24,524);
  text("500",100,524); 
  text("500",176,524);
  text("500",256,524);
  text("100",336,524);
  text("100",415,524);
  text("100",495,524);
  text("200",575,524);
  text("200",655,524);
  text("200",735,524);

  Engine.update(engine);
 
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
     
   }
  
   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

   if(particle!=null){
     particle.display();
     if(particle.body.position.y>=765){
       
        if(particle.body.position.x<300){
          score = score + 500;
          //particle =  null;
          if(turn>=5) gameState = "END";
        }
        if(particle.body.position.x>301 && particle.body.position.x<550){
          score = score + 100;
          //particle =  null;
          if(turn>=5) gameState = "END";
        }
        if(particle.body.position.x>551 && particle.body.position.x<900){
          score = score + 200;
          //particle =  null;
          if(turn>=5) gameState = "END";
        }
          particle = null;

     }
   }


   if(gameState === "END"){
     push();
     textSize(40);
     textStyle(BOLD);
     text("GAME OVER",300,250);
     pop();
   }

}

function mousePressed(){
  if(gameState !== "END"){
    turn++;
    particle = new Particle(mouseX,10,10);
  }
}
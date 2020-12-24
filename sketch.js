var mario, marioImg;
var bg,ground,groundimg;
var pipesimg,gameoverimg,restartImg;
var pipesGroup
var PLAY =1;
var END = 0;
var gameState = PLAY;
var score = 5;
var count = 0;
var brickcount;

function preload(){
  bg = loadImage("bg.png");
  groundimg = loadImage("ground2.png");
  marioImg = loadAnimation("mario00.png","mario01.png","mario02.png","mario03.png");
  
  //pipesimg =loadImage("brick.png");
  
  gameoverimg = loadImage("gameOver.png");
  restartImg = loadImage("restart.png");
  
  
  mario_deadimg = loadAnimation("collided.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  
  brickimg = loadImage("brick.png");
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  bg = loadImage("bg.png");

}

function setup(){
  createCanvas(1200, 400);
  mario = createSprite(50,335);
  mario.addAnimation("running",marioImg);
  mario.addAnimation("mario_dead",mario_deadimg);
  mario.scale =1.5;
  
  ground = createSprite(600,377,1200,10);
  ground.addImage("ground",groundimg);
  ground.x = ground.width/2;
  
  invisibleground = createSprite(600,345,1200,10);
  invisibleground.visible = false;
  
  gameOver = createSprite(400,150);
  gameOver.addImage("gameover",gameoverimg);
  gameOver.scale = 0.5;

  restart = createSprite(500,40);
  restart.addImage("restart",restartImg);
  restart.scale =0.15;

  gameOver.visible = false;
  restart.visible = false;

  
  obstaclesGroup = new Group();
  brickGroup = new Group();
}

function draw(){
  background(bg);
  
  fill("black");
	textSize(35);
	textFont("monospace");
	text(" x ",70,60)
	text(score,120,60);
  
  textSize(35);
	text("SCORE:"+Math.round(count),320,60);
	/*text(brickcount,250,60);
	text(" x ",200,60);*/
  
 if(gameState === PLAY){
    ground.velocityX = -7;
		count= count +0.1;
    if(ground.x<0){
      ground.x = ground.width/2;
    }
  console.log(mario.y);
    if(keyDown("UP_ARROW") && mario.y>325){ 
      mario.velocityY = -20;
      jumpSound.play();
    }
   
  mario.velocityY = mario.velocityY + 1;
    
  mario.collide(invisibleground);
    
  
   spawnObstacles();
   spawnBricks();
    
    
  if(obstaclesGroup.isTouching(mario)){
			score=score-1;
			count = count-5;
      gameState = END;
    dieSound.play();
    }
   
   for(var j =0; j<brickGroup.length;j++){
			if(brickGroup.isTouching(mario)){
				brickGroup.get(j).destroy();
				brickcount =brickcount +1 ;
			}
		}
  }
    
   if(gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
 
    brickGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);

    brickGroup.setLifetimeEach(-1);
    mario.velocityY = 0;
    mario.changeAnimation("mario_dead",mario_deadimg);
    gameOver.visible = true;
    restart.visible = true; 
    }
      
    if(gameState === END && score>0){
		reset();
		
    }
    if(score===0){
		gameState = END;   
    }
      
    if(mousePressedOver(restart)){
	 reset();
	 count = 0;
	 score = 5;
     brickcount = 0;
	 brickGroup.destroyEach();
    }
    
  drawSprites();
  }


  
    
 function reset(){
  gameState = PLAY;

  obstaclesGroup.destroyEach();
  brickGroup.destroyEach();
  gameOver.visible = false;
  restart.visible = false;
	
  mario.changeAnimation("running",marioImg);
	
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,315,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(7);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);             
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 1;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnBricks(){
	if(frameCount%200 === 0){
		for(var i=0 ; i<5 ;i++){
			brick = createSprite(1200+i*20,200 ,10,10);
			brick.addImage("brick",brickimg);
			brick.velocityX = -4;
			brick.lifetime = 1000;
			brickGroup.add(brick);
		}
	}
}

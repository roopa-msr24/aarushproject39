var player,playerImg;
var coin ,coinImage, obstacle, obstacleImage;
var scoresGroup, obstacleGroup;
var ground,backgroundImg;
var score = 0;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var gameOver,gameOverImg;

function preload(){
  
 
  coinImage = loadImage("coin.png");
  obstacleImage = loadImage("obstacle.png");
  playerImg = loadImage("run_kid.png")
  backgroundImg = loadImage("jungle.jpg")
  gameOverImg = loadImage("gameOver.jpg")
  
 
}



function setup() {
  
  player = createSprite(100,300);
  player.addImage(playerImg);
  player.scale = 0.2;
  //player.setCollider('rectangle',0,0,200,200)
  //player.debug=flase
  
  ground = createSprite(1000,360,1400,20);
  ground.velocityX = -6;

  gameOver = createSprite(670,290);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 1;
  gameOver.visible = false;
  
 
  scoresGroup = createGroup();
  obstacleGroup = createGroup();

  
  
  
  
}


function draw() {
  createCanvas(1340,580);
  background(backgroundImg);

  stroke("black");
  textSize(20);
  fill("black");
  text("Score: " + score,160,50)

  
  player.collide(ground);


  

  if (gameState===PLAY){
    if(player.isTouching(scoresGroup)){
      score = score + 1 ;
      }

      if(keyDown("space") && player.y >= 270){
        player.velocityY = -20;
      }
      
      player.velocityY = player.velocityY + 1;

      if(player.isTouching(scoresGroup)){
        scoresGroup.destroyEach();
      }

      
      
    

      scores();
      obstacles();

      if(player.isTouching(obstacleGroup)){
        gameState = END;
        
      }
      
  }else if(gameState === END){
   
    gameOver.visible = true;

    ground.velocityX = 0;
    //scoresGroup.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    scoresGroup.setVelocityXEach(0);

    obstacleGroup.setLifetimeEach(-1);
    scoresGroup.setLifetimeEach(-1);

  }
  
  if(ground.width/2){
    ground.x = 650;
  }
  
 
  drawSprites();
}

function scores(){
 if(frameCount % 200 === 0){
   coin = createSprite(1300,Math.round(random(120,200)));
   coin.addImage(coinImage);
      coin.scale = 0.3;
   coin.velocityX = -6;
   coin.lifetime = 220;
   
   scoresGroup.add(coin);
 }
  
}

function obstacles(){
  if(frameCount % 80 === 0){
    obstacle = createSprite(1300,310);
    obstacle.addImage(obstacleImage);
    obstacle.setCollider('rectangle',0,0,200,200)
    obstacle.debug=false
    obstacle.scale = 0.2;
    obstacle.velocityX = -8;
    obstacle.lifetime = 170;
    
    obstacleGroup.add(obstacle);
  }
  
}




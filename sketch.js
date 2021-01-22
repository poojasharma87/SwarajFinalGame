
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
bgImg=loadImage("bgImage.jpg");
	playerDead=loadAnimation("Dead__000.png","Dead__001.png","Dead__002.png","Dead__003.png","Dead__004.png","Dead__005.png","Dead__006.png","Dead__007.png","Dead__008.png","Dead__009.png");
	playerIdle=loadAnimation("Idle__000.png","Idle__001.png","Idle__002.png","Idle__003.png","Idle__004.png","Idle__005.png","Idle__006.png","Idle__007.png","Idle__008.png","Idle__009.png");
	playerJump=loadAnimation("Jump__000.png","Jump__001.png","Jump__002.png","Jump__003.png","Jump__004.png","Jump__005.png","Jump__006.png","Jump__007.png","Jump__008.png","Jump__009.png");
	playerRun=loadAnimation("Run__000.png","Run__001.png","Run__002.png","Run__003.png","Run__004.png","Run__005.png","Run__006.png","Run__007.png","Run__008.png","Run__009.png");
	playerSlide=loadAnimation("Slide__000.png","Slide__001.png","Slide__002.png","Slide__003.png","Slide__004.png","Slide__005.png","Slide__006.png","Slide__007.png","Slide__008.png","Slide__009.png");
	monsterImg=loadImage("Attack3.png");
	coinImg=loadAnimation("Gold_1.png","Gold_2.png","Gold_3.png","Gold_4.png","Gold_5.png","Gold_6.png","Gold_7.png","Gold_8.png","Gold_9.png","Gold_10.png","Gold_11.png","Gold_12.png","Gold_13.png","Gold_14.png","Gold_15.png","Gold_16.png","Gold_17.png","Gold_18.png","Gold_19.png","Gold_20.png","Gold_21.png","Gold_22.png","Gold_23.png","Gold_24.png","Gold_25.png","Gold_26.png","Gold_27.png","Gold_28.png","Gold_29.png","Gold_30.png")


	

}

function setup() {
	createCanvas(800, 400);


	engine = Engine.create();
	world = engine.world;

  backgr=createSprite(0,0,1600,400);
  backgr.addImage(bgImg);
  backgr.scale=4;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",playerRun);
  player.scale = 0.2;
  
  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  CoinGroup = new Group();
  monsterGroup = new Group();
  
  score = 0;
	Engine.run(engine);
  
}


function draw() {
	background(255);
  
    
	if(ground.x<0) {
	  ground.x=ground.width/2;
	}
	if(backgr.x<100){
	  backgr.x=backgr.width/2;
	}
	
	  if(CoinGroup.isTouching(player)){
		CoinGroup.destroyEach();
	  score = score + 2;
	  }
	  switch(score){
		  case 10: player.scale=0.12;
				  break;
		  case 20: player.scale=0.14;
				  break;
		  case 30: player.scale=0.16;
				  break;
		  case 40: player.scale=0.18;
				  break;
		  default: break;
	  }
	
	  if(keyDown("space") ) {
		player.velocityY = -12;
	  }
	  player.velocityY = player.velocityY + 0.8;
	
	  player.collide(ground);
	  spawnCoins();
	  spawnMonsters();
   
	  if(monsterGroup.isTouching(player)){ 
		  player.scale=0.08;
	   // score=score-2;
	  }
	
	drawSprites();
	
	stroke("white");
	textSize(20);
	fill("white");
	text("Score: "+ score, 500,50);
 
}

function spawnCoins() {
	//write code here to spawn the food
	if (frameCount % 80 === 0) {
	  var coin = createSprite(600,250,40,10);
	  coin.y = random(120,200);    
	  coin.addAnimation("coinmoving",coinImg);
	  coin.scale = 0.05;
	  coin.velocityX = -5;
	   //assign lifetime to the variable
	  coin.lifetime = 300;
	  player.depth = coin.depth + 1;
	  
	  //add each banana to the group
	  CoinGroup.add(coin);
	}
  }
  
  function spawnMonsters() {
	if(frameCount % 300 === 0) {
	  var monster = createSprite(800,350,10,40);
	  monster.velocityX = -6;
	  monster.addAnimation("obstacle",monsterImg);
	  
	  //assign scale and lifetime to the obstacle     
	  monster.scale = 0.2;
	  monster.lifetime = 300;
	  
	  //add each obstacle to the group
	  monsterGroup.add(monster);
	}
  }


const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground, bridge;
var leftWall, rightWall;
var jointPoint;
var jointLink;
var rabit,rabit1,eatrabit,eatrabit2,eatrabit3,eatrabit4,eatrabit5;
var breakButton;
var backgroundImage;

var stones = [];
var collided = false;
function preload() {
  rabit1 = loadImage("./assets/rabit.png");
  eatrabit = loadImage("./assets/eat_0.png");
  eatrabit2 = loadImage("./assets/eat_1.png");
  eatrabit3 = loadImage("./assets/eat_2.png");
  eatrabit4 = loadImage("./assets/eat_3.png");
  eatrabit5 = loadImage("./assets/eat_4.png");


  backgroundImage = loadImage("./assets/background.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  engine = Engine.create();
  world = engine.world;
  frameRate(80);

  ground = new Base(0, height - 10, width * 2, 20);
  leftWall = new Base(100, height - 300, 200, height / 2 + 100);
  rightWall = new Base(width - 100, height - 300, 200, height / 2 + 100);

  bridge = new Bridge(30, { x: 50, y: height / 2 - 140 });
  jointPoint = new Base(width - 250, height / 2 - 100, 40, 20);

  Matter.Composite.add(bridge.body, jointPoint);
  jointLink = new Link(bridge, jointPoint);

  for (var i = 0; i <= 8; i++) {
    var x = random(width / 2 - 200, width / 2 + 300);
    var y = random(-100, 100);
    var stone = new Stone(x, y, 80, 80);
    stones.push(stone);
  }

  rabit = createSprite(width / 2, height - 100, 50, 50);
  rabit.addAnimation("eat", eatrabit,eatrabit2,eatrabit3,eatrabit4,eatrabit5);
  rabit.addImage("null", rabit1)

  rabit.scale = 0.1;
  rabit.velocityX = 10;

  breakButton = createButton("");
  breakButton.position(width - 200, height / 2 - 50);
  breakButton.class("breakbutton");
  breakButton.mousePressed(handleButtonPress);
}

function draw() {
  background(backgroundImage);
  Engine.update(engine);

  bridge.show();

  for (var stone of stones) {
    stone.show();
    var pos = stone.body.position;
    
    var distance = dist(rabit.position.x, rabit.position.y, pos.x, pos.y);
   

    if (distance <= 50) {
      rabit.velocityX = 0;
      Matter.Body.setVelocity(stone.body, { x: 10, y: -10 });
      rabit.changeImage("null");
      collided = true;
    }

    
  }

  if (rabit.position.x >= width - 300 && !collided) {
    rabit.velocityX = -10;
  }

  if (rabit.position.x <= 300 && !collided) {
    rabit.velocityX = 10;
  }

  drawSprites();
}

function handleButtonPress() {
  jointLink.dettach();
  setTimeout(() => {
    bridge.break();
  }, 1500);
}

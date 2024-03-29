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
var rope,fruit,ground, rope1, rope2;
var fruit_con;
var fruit_con_2;
var fruit_con_3;

var bg_img;
var food;
var rabbit;

var button,blower;
var bunny;
var blink,eat,sad;
var mute_btn;

var fr,rope2;

var bk_song;
var cut_sound;
var sad_sound;
var eating_sound;
var air;

var btn1, btn2
var canW, canH
function preload()
{
  bg_img = loadImage('background.png');
  food = loadImage('melon.png');
  rabbit = loadImage('Rabbit-01.png');

  bk_song = loadSound('sound1.mp3');
  sad_sound = loadSound("sad.wav")
  cut_sound = loadSound('rope_cut.mp3');
  eating_sound = loadSound('eating_sound.mp3');
  air = loadSound('air.wav');

  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png");
  eat = loadAnimation("eat_0.png" , "eat_1.png","eat_2.png","eat_3.png","eat_4.png");
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png");
  
  blink.playing = true;
  eat.playing = true;
  sad.playing = true;
  sad.looping= false;
  eat.looping = false; 
}

function setup() {
  /* added code to scale */
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent); 
  // var isMobile = navigator.userAgent
  console.log(isMobile)
  console.log(displayWidth)
  console.log(windowWidth)
  if(isMobile){
     

    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    
    createCanvas(windowWidth, windowHeight);
  }
  
 
  /* scale ends */
 
  frameRate(80);

  bk_song.play();
  bk_song.setVolume(0.5);

  engine = Engine.create();
  world = engine.world;
  
  button = createImg('cut_btn.png');
  button.position(20,30);
  button.size(50,50);
  button.mouseClicked(drop);

  // btn1
  btn1 = createImg('cut_btn.png');
  btn1.position(330,30);
  btn1.size(50,50);
  btn1.mouseClicked(drop1);

  // btn2
  btn2 = createImg('cut_btn.png');
  btn2.position(360,225);
  btn2.size(50,50);
  btn2.mouseClicked(drop2);

  mute_btn = createImg('mute.png');
  mute_btn.position(width- 150,20);
  mute_btn.size(50,50);
  mute_btn.mouseClicked(mute);
  
  // ropes

  rope = new Rope(10, {x: 40, y: 40})
  rope1 = new Rope(8, {x: 330, y: 50})
  rope2 = new Rope(3, {x: 360, y: 230})
  
  ground = new Ground(width/2,height -10,width,20);

  blink.frameDelay = 20;
  eat.frameDelay = 20;

  bunny = createSprite(300,height - 80,100,100);
  bunny.scale = 0.2;

  bunny.addAnimation('blinking',blink);
  bunny.addAnimation('eating',eat);
  bunny.addAnimation('crying',sad);
  bunny.changeAnimation('blinking');
  
  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con_2 = new Link(rope1,fruit);
  fruit_con_3 = new Link(rope2,fruit);



  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(255);
  image(bg_img,0,0,width+80,height);
  // image(bg_img, 0, 0)
  console.log(window)
  push();
  imageMode(CENTER);
  if(fruit!=null){
    image(food,fruit.position.x,fruit.position.y,70,70);
  }
  pop();

  rope1.show();
  rope.show();
  rope2.show()
  Engine.update(engine);
  ground.show();

  drawSprites();

  if(collide(fruit,bunny)==true)
  {
    bunny.changeAnimation('eating');
    eating_sound.play();
  }


  if(fruit!=null && fruit.position.y>=650)
  {
    bunny.changeAnimation('crying');
    bk_song.stop();
    sad_sound.play();
    fruit=null;
     
   }
   
}

function drop()
{
  cut_sound.play();
  rope.break();
  fruit_con.detach();
  fruit_con = null; 
}

function drop1(){
  cut_sound.play();
  rope1.break();
  fruit_con_2.detach();
  fruit_con_2 = null; 
}

function drop2(){
  cut_sound.play();
  rope2.break();
  fruit_con_3.detach();
  fruit_con_3 = null; 
}

function collide(body,sprite)
{
  if(body!=null)
        {
         var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y);
          if(d<=80)
            {
              World.remove(engine.world,fruit);
               fruit = null;
               return true; 
            }
            else{
              return false;
            }
         }
}


function mute()
{
  if(bk_song.isPlaying())
     {
      bk_song.stop();
     }
     else{
      bk_song.play();
     }
}



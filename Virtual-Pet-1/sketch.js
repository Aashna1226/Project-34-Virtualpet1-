var canvas, dog;
var dogImg, happyDogImg, foodS, foodStock;
var database;

function preload()
{
  dogImg = loadImage("../images/dogImg.png");
  happyDogImg = loadImage("../images/dogImg1.png");
}

function setup() {
  database = firebase.database();

  createCanvas(720, 770);
  dog = createSprite(370, 410, 10, 5);
  dog.addImage(dogImg);

  foodStock=database.ref('FOOD');
  foodStock.on("value", readStock);
}


function draw() {  
  background(46, 139, 87);

  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }

  drawSprites();
  textSize(20);
  fill(255);
  stroke(5);
  text("Note: Press UP_ARROW Key to feed Drago Milk!", 20, 30);

}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1;
  }
  database.ref('/').update({
    FOOD:x
  })
}

//creating the variables
var dog,sadDog,happyDog, database,foodS,foodStock,fedTime,lastFed,feed,addFood,foodObj;
var back;
function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
//back = loadImage("background.jpg")
}

function setup() {
  database=firebase.database();
  createCanvas(1000,500);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.2;
  
  feed=createButton("Feed your dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Milk");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(rgb(46,139,87));
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
 
  textSize(15);
  fill("white");
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }
 
   text("Imaportant Note:Press Up_Arrow key to feed the Milk and food to the dog.",300,80);
   text("name of you dog: Your choice",300,100);
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
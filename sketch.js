var dog,database,happy,happyDog,foodStock,foods;
var feed,addFood
var fedTime,lastFed
var foodObj

function preload() {
    happydog=loadImage("happydog.png")
    img=loadImage("Dog.png")
}

function setup(){
    database=firebase.database()
    
    createCanvas(1000,500);

    foodObj=new Food()

    dog = createSprite(250,250,10,10);
    dog.addImage(img)
    dog.scale=0.3

    feed=createButton("Feed the dog")
    feed.position(700,95)
    feed.mousePressed(feedDog)

    addFood=createButton("add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)

    foodStock=database.ref('food')
    foodStock.on("value",readStock)
}

function draw(){
    background(46,139,87);

    fedTime=database.ref('FeedTime')
    fedTime.on("value",function (data) {
        lastFed=data.val()
    })

    fill(255)
    textSize(20)
    if (lastFed>=12) {
        text("Last Feed : "+lastFed % 12+ " PM",350,30)
    }
    else if (lastFed==0) {
        text("Last Feed : 12 AM",350,30)
    } 
    else{
        text("Last Feed : "+lastFed+ " AM",350,30)
    }

    foodObj.display()
    drawSprites();
 }

 function readStock(data) {
     foods=data.val()
     foodObj.updateFoodStock(foods)
 }
 function feedDog(){
     dog.addImage(happyDog)
     foodObj.updateFoodStock(foodObj.getFoodStock()-1)
     database.ref('/').update({
         food:foodObj.getFoodStock(),
         Feedtime:hour()
     })
    }
 function addFoods() {
     foods++
     database.ref('/').update({
         food:foods
     })
 }

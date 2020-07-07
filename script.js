
var stage;
var background;
var foreground;
var time = 0;
var bcolor = "SteelBlue";
var incolor = "LightSkyBlue";
var title = "Welcome.";
var font = "Ubuntu";
var tabtext = ["games", "about", "projects"];
var tablinks = ["https://anuke.itch.io/", "/about", "/projects"];
var shadow;

function init() {
    stage = new createjs.Stage("canvas");

    stage.enableMouseOver();
    stage.mouseMoveOutside = true;
    
    createjs.Ticker.addEventListener("tick", handleTick);
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.setFPS(40);

    window.addEventListener('resize', resize, false);

    resize();

    var w = stage.canvas.width/2;
    var h = stage.canvas.height/2;

    background = new createjs.Shape();
    stage.addChild(background);
    
    background.cache(0, 0, w*2, h*2);
    background.update();
    
    stage.update();
}

function newShape(red, green, blue, updateFunction){
    const shape = new createjs.Shape();

    shape.r = red;
    shape.g = green;
    shape.b = blue;

    shape.modColor = function(){
        return createjs.Graphics.getRGB( 
        parseInt(shape.r), 
        parseInt(shape.g), 
        parseInt(shape.b), 
        1);
    }

    shape.fill = function(){
        shape.graphics.beginFill(shape.modColor());
    }

    shape.update = updateFunction;

    return shape;
}

function handleTick() {
    time ++;

    background.update();

    stage.update();
}

function resize() { 
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;
}


var stage;
var background;
var foreground;
var time = 0;
var bcolor = "SteelBlue";
var incolor = "LightSkyBlue";
var title = "Hey";
var font = "Ubuntu";
var tabtext = ["GAMES", "SOFTWARE", "ABOUT"];
var tablinks = ["https://anumba.itch.io/", "/about", "/software"];
var sides;

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
    

    background.update = function(){
        var tsize = 100;
        var xscl = 1.73/2.02;
        var maxx = stage.canvas.width/(tsize*(xscl))+3;
        var maxy = stage.canvas.height/tsize;

        background.graphics.clear();

        for(var x = 0; x < maxx; x ++){
            for(var y = -1; y < maxy; y ++){
                background.graphics.beginFill(
                     createjs.Graphics.getHSL(
                         (1.2+x/maxx/2 + y/maxy/2)*120 + Math.sin(time/20 + x/10 + y/20)*8,
                         50+x/maxx*50, 
                         20+(y/maxy)*25
                         ));

                background.graphics.drawPolyStar(-50+x*(tsize*xscl) + ((y%2 == 0 && x%2==0) || (y%2 == 1 && x%2==1) ? 0 : -xscl*tsize), y*tsize*1.5 + (x % 2 == 0 ? tsize : 0), tsize, 3, 0, x%2 == 0 ? -180/6 : 180/6);
            }   
        }

        background.updateCache();
    }
    
    background.cache(0, 0, w*2, h*2);
    background.update();
    
    var offset = 50;
    
    foreground = new createjs.Shape();
    stage.addChild(foreground);
    foreground.graphics.beginFill(incolor);
    foreground.graphics.drawPolyStar(w, h-offset, 210, 3, 0, 180/6);
    foreground.cache(0, 0, w*2, h*2);
    
    var titletext = new createjs.Text(title, "bold 34px " + font, "#FFF8DC");
    titletext.x = w;
    titletext.y = h*0.07;
    titletext.textAlign = "center";

    stage.addChild(titletext);
    
    sides = newShape(255, 255, 255, function(){
        var edgespacing = 300;
        var edgerad = 250;

        edgespacing = h*2/Math.floor(Math.sin(times)/edgespacing);

        sides.graphics.beginFill(incolor);

        for(var i = 0; i < h*2/edgespacing+1; i ++){
            sides.graphics.drawPolyStar(w+100, i*edgespacing-h, edgerad, 6, 0, 180/6-90);
            sides.graphics.drawPolyStar(-100-w, +i*edgespacing-h, edgerad, 6, 0, 180/6+90);
        }
    });
    
    sides.x = w;
    sides.y = h;

    stage.addChild(sides);
    
        sides.update();

    sides.cache(-w, -h, w*2, h*2);

    center = newShape(135, 206, 250, function(){
        center.graphics.clear();

        center.fill();

        center.graphics.drawPolyStar(0, 0, 50, 3, 0, 180/6);
    });

    center.x = w;
    center.y = h-offset;
    center.rotation = 180;

    center.update();

    stage.addChild(center);
    
    stage.update();
}

function tween(shape, doloop){
    const t = createjs.Tween.get(shape, {loop: doloop == true});
    if(shape.update != undefined)
        t.addEventListener('change', shape.update);
    return t;
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

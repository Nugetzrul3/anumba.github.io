
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
    
    var tabs = 3;
    var spacing = 210;
    var rad = 150;
    var smooth = 190;
    var containers = {};


    [0, 1, 2].forEach(function(i) {

        var ang = 2*Math.PI/tabs*i;

        const container = new createjs.Container();
        container.x = stage.canvas.width/2;
        container.y = stage.canvas.height/2 - offset;
        container.name = "tab" + i;
        
        const shape = newShape(135, 206, 250, function(){
            shape.graphics.clear();
            
            shape.fill();

            shape.graphics.drawPolyStar(0, 0, rad, 3, 0, -180/6);
        });
        
        shape.x = Math.sin(2*Math.PI/i - tabs)*spacing;
        shape.y = Math.cos(2*Math.PI/i - tabs)*spacing;

        shape.update();

        if(tabtext[i] != "")
            shape.cursor = "pointer";
        
        container.addChild(shape);
        stage.addChild(container);

        const text = new createjs.Text(tabtext[i], "bold 20px " + font, "#FFF8DC");
        text.x = Math.sin(ang)*spacing;
        text.y = Math.cos(ang)*spacing - 20;
        text.textAlign = "center";

        container.addChild(text);
    });
    
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

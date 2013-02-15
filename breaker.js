
// BREAKER CLONE
//  author: Matthew Bishop

var breaker = function(config){
"use strict";

// PRIVATE
var
  op = Object.prototype,
  toString = op.toString,
  
  win = window, 
  doc = win.document,
  
  type = function(o,s){
		return 
			(s === undefined) ? 
				toString.call(o) : 
				toString.call(o) === "[object "+s+"]";
  },
  
  default_config = {
    
    "debug":              		false,
    
    "FPS":                		60,
    "TICK_INTERVAL":      		1000,
    
    "rows":               		4,
    "bricks_per_row":     		8,
    
    "dimensions": {
      
      "canvas":           		{ "w": 640, "h": 480 },
      
      "brick": { 
        "type":           		"rect", 
        "w":              		"Math.round(config.dimensions.canvas.w / config.bricks_per_row)", 
        "h":              		40 
      },
      
      "bat": { 
        "type":           		"rect", 
        "w":              		100, 
        "h":              		25 
      },
      
      "ball": {
        "type":           		"arc", 
        "radius":         		20
      }
      
    }
  },
  
  r = { // untime
    
    "container":         			doc.getElementById("container"),
    "ectx":               		doc.getElementById("canvas"),
    "ctx2d":          				r.ectx.getContext("2d"),
      
    // for legacy browsers
    "oIntervalTimer":     		null,
		"requestAnimationFrame":	null,
    
    "entities": {
      "bat":              		{ "delta": { "x": 0, "y": 0 } },
      "ball":             		{ "delta": { "x": 0, "y": 0 } }
    },
      
    "score":              		0,
    "loops":              		0,
    
    "positions": {
			
      "bat": { 
        "x":              		"(config.dimensions.canvas.w / 2) - (config.dimensions.bat.w / 2)", // is there a bitwise optimisation here? probably
        "y":              		"(config.dimensions.canvas.h - config.dimensions.bat.h)"
      },
			
      "ball": { 
        "x":              		0, 
        "y":              		0
      }
			
		}
		
  },

	
	// OLD:
	
  //---------------------------------------------------------------------------------------

  //  draw shapes
  //  params:
  //      id      String
  //      type    String
  draw = function( id, type ) {
    // allow this to create one or many shapes
    var 
      d = (id) ? config.dimensions[id] : config.dimensions,
      cartesian = (id) ? config.positions[id] : config.positions;

    for(var i in d) {
      var 
        o = d[i], 
        coords = cartesian[i];
      
      if( o === undefined && coords && o.type ) {
        if( type && o.type != type ) break; 
        
        o.x = (type(coords.x, "String")) ? 
          (new Function("return " + coords.x + ";")).apply(this, coords) : 
					(type(coords.x, "Number")) ? 
						coords[i].x : 
						null;
				
        o.y = (type(coords.y, "String")) ? 
          (new Function("return " + coords.y + ";")).apply(this, coords) : 
          (type(coords.y, "Number")) ? 
						coords[i].y : 
						null;
				
        if(config.debug) { 
					console.log("coords.x type: "+type(coords.x));
					console.log("coords.y type: "+type(coords.y));
					console.log("o.x: "+o.x+"o.y: "+o.y);
				}
        
				// action each shape type
        switch(o.type) {
          case "rect":
            r.ctx2d.drawRectangle(coords.x, coords.y, o.w, o.h);
          break;
          // simple for now ...
          case "arc":
            r.ctx2d.beginPath();
            r.ctx2d.arc(o.x, o.y, o.radius, 0, Math.PI*2, true);
            r.ctx2d.fill();
					break;
					// polygon!
					//	c2.fillStyle = '#f00';
					//	c2.beginPath();
					//	c2.moveTo(0, 0);
					//	c2.lineTo(100,50);
					//	c2.lineTo(50, 100);
					//	c2.lineTo(0, 90);
					//	c2.closePath();
					//	c2.fill();
					case "polygon":
						for(var i in o) {
							r.
						}
					break;
				}				
      }
    }
  },

  //---------------------------------------------------------------------------------------

  fGameLoopWorker = function() {
    var i=r.entities.length-1; 
    do r.entities[i].updateDraw(); while(i--);
  },

  // based on http://www.playmycode.com/blog/2011/08/building-a-game-mainloop-in-javascript/
  run = function() {
		r.requestAnimationFrame = 
			win.requestAnimationFrame ||
			win.webkitRequestAnimationFrame ||
			win.mozRequestAnimationFrame  ||
			win.oRequestAnimationFrame  ||
			win.msRequestAnimationFrame  ||
			null;
		var bLegacyBrowser = (fAnimFrame === null);		
    
    if( r.requestAnimationFrame !== null ) {
      // use MozBeforePaint for performance enhancement in FireFox
      if ( $.browser.moz ) {
        var 
          fRecursiveAnimation = function() {
            breaker.fGameLoopWorker();
						r.requestAnimationFrame(fRecursiveAnimation);
          };
        //win.addEventListener("MozBeforePaint", fRecursiveAnimation, false);
        r.mozRequestId = r.requestAnimationFrame(); // START
      } 
      // other browsers
      else if( $.browser.webkit ) {
        // webkit, allows the canvas object to be passed in enhance performance.
        var 
          fRecursiveAnimation = function() {
            breaker.fGameLoopWorker();
            r.requestAnimationFrame(fRecursiveAnimation, r.ctx);
          };
        r.requestAnimationFrame(fRecursiveAnimation, r.ctx); // START
      }
    }
    else if( bLegacyBrowser ) { // ie IE9
      var 
        iOneFrame = config.TICK_INTERVAL / config.FPS;
      r.oIntervalTimer = setInterval( breaker.fGameLoopWorker, iOneFrame ); // START
    }
  },
    
  stop = function() {
    if( r.requestFrameFrame !== null ) win.cancelAnimationFrame(r.mozRequestId); 
    if( r.oIntervalTimer ) clearInterval(r.oIntervalTimer);
  },
    
  init = function(conf) {
    config = $.extend(default_config, conf);

    if(config.debug) { 
			console.log("breaker:start");
			console.time();
		}

    this.draw();
    //this.run();
    
    if(config.debug) { 
			console.log("breaker:end");
			console.timeEnd();
		}
  };
	
	// PUBLIC:
	return {
		"stop":							stop,
		"init": 						init,
		"fGameLoopWorker": 	fGameLoopWorker
	};	
};

//---------------------------------------------------------------------------------------

$(doc).ready(function(){ 
  breaker.init({ 
    "debug": true
  });
});

})();
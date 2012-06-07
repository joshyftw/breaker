
// simple self contained breakout!
(function(breaker){
  var
    w = window,
    
    op = Object.prototype,
    toString = op.toString,
  
    ctx = $("CANVAS#breaker")[0],
    context = ctx.getContext("2d"),
    
    // default configuration
    conf = {
      "rows": 4,
      "bricks_per_row": 8,
      
      // TODO later this could be the css values populated, enabling the object to be self contained, without CSS
      "padding": { // TODO or is a margin???
        "bottom": 10 
      },
      
      "dimensions": {
        "canvas": {
          "w": 640, 
          "h": 480 
        },
        "brick": { 
          "type":"rect", 
          "w": "conf.dimensions.canvas.w / conf.bricks_per_row", 
          "h": 40 
        }
        /*,
        "bat": {
          "type":"rect", 
          "w": 100, 
          "h": 25 
        },
        "ball": {
          "type":"arc", 
          "radius": 20
        }
        */
      },
      
      "positions": {
        "bat": { 
          "x": "(conf.dimensions.canvas.w / 2) - (conf.dimensions.bat.w / 2)", 
          "y": "(conf.dimensions.canvas.h - conf.dimensions.bat.h - conf.padding.bottom)"
        },
        "ball": { 
          "x":0, 
          "y":0 
        }
      }
      
    // end conf
    },
    
    runtime = {
      "deltas": { 
        "bat": { 
          "x": 0, 
          "y": 0 
        },
        "ball": {
          "x": 0,
          "y": 0
        }
      },
      
      "score": 0
      
    // end runtime
    };
	
  //---------------------------------------------------------------------------------------
  // METHODS:
  
  //  create one or many objects:
  //  params:
  //    id  String
  breaker.draw = function(id){
    var 
      d = (id) ? conf.dimensions[id] : conf.dimensions,
      cart = (id) ? conf.positions[id] : conf.positions;//esian
    for(var i in d) {
      var 
        o = d[i], 
        coord = cart[i];
      if( o.type ) {
        // allow us to calculate positions at runtime, set to the functions result
        o.x = (toString.call(coord.x) != "[object String]") ? (new Function("return " + coord.x))() : coord[id].x, 
        o.y = (toString.call(coord.y) != "[object String]") ? (new Function("return " + coord.y))() : coord[id].y;
        console.log(o.x);
        console.log(o.y);
        switch(o.type) {
          case "rect":
            context.drawRectangle( o.x, o.y, o.w, o.h );
          break;
          // simple for now ...
          case "arc":
            context.beginPath();
            context.arc(o.x, o.y, o.radius, 0, Math.PI*2, true);
            context.fill();
          break;
        }
      }
    }
  };
  
  //---------------------------------------------------------------------------------------
  
  // STARTUP
	draw();

  $(breaker);
  
// expose to window for external calls
})(window.breaker = window.breaker || {});
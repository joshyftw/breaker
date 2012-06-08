
// BREAKER CLONE
//  author: Matthew Bishop

window.breaker = new function(){};

(function(b){

  //private
  var
    op = Object.prototype,
    toString = op.toString,
    
    runtime = {
      
      "deltas": { 
        "bat": { 
          "x": 0, "y": 0 
        },
        "ball": {
          "x": 0, "y": 0
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
  b.draw = function( id ){
    var 
      d = (id) ? b.conf.dimensions[id] : b.conf.dimensions,
      cartesian = (id) ? b.conf.positions[id] : b.conf.positions;
      
    for(var i in d) {
      var 
        o = d[i], 
        coord = cartesian[i];
      if( o.type ) {
      
        // allow us to calculate positions at runtime, set to the functions result
        o.x = (toString.call(coord.x) != "[object String]") ? (new Function("return " + coord.x + ";"))() : coord[id].x, 
        o.y = (toString.call(coord.y) != "[object String]") ? (new Function("return " + coord.y + ";"))() : coord[id].y;
        if( b.debug ) console.log( toString.call(coord.x) );
        if( b.debug ) console.log( toString.call(coord.y) );
        if( b.debug ) console.log( o.x );
        if( b.debug ) console.log( o.y );
        
        switch(o.type) {
          case "rect":
            b.context.drawRectangle( coord.x, coord.y, o.w, o.h );
          break;
          // simple for now ...
          case "arc":
            b.context.beginPath();
            b.context.arc(o.x, o.y, o.radius, 0, Math.PI*2, true);
            b.context.fill();
          break;
        }
      }
    }
  };
  
  b.animate = function() {
  };
  
  //---------------------------------------------------------------------------------------
  // STARTUP
  
  b.__init__ = function( conf ){
    this.conf = conf;
    this.debug = conf.debug;
  
    if(this.debug) console.log("breaker:start");
    
    this.ctx = $("DIV.breaker CANVAS")[0],
    this.context = ctx.getContext("2d");
      
    this.draw();
    
    if(this.debug) console.log("breaker:end");
  };
  
})( window.breaker.prototype );

$.ready(function(){
  breaker.__init__(breaker_default_conf);
});

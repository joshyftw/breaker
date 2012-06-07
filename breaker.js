
// simple self contained breakout!
(function( b ){

  var
    op = Object.prototype,
    toString = op.toString;
	
  //---------------------------------------------------------------------------------------
  // METHODS:
  
  //  create one or many objects:
  //  params:
  //    id  String
  b.draw = function( id ){
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
  
  b.__init__ = function( conf ){
    b.conf = conf;
    b.debug = conf.debug;
  
    if(b.debug) console.log("breaker:start");
    
    b.ctx = $("CANVAS#breaker")[0],
    b.context = ctx.getContext("2d");
      
    b.draw();
    
    if(b.debug) console.log("breaker:end");
  };
  
})(window.breaker = {});

$.ready(function(){
  b.init(breaker_default_conf);
});

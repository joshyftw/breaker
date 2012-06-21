
var l = {

    makeArray: function(o){
        var a=[];
        for(var i in o) 
        if(hasOwn.call(o,i)) 
          a.push(o[i]);
        return a;
    }
    
};

// BREAKER CLONE
//  author: Matthew Bishop

var breaker = (function(){

    //private
    var
        op = Object.prototype,
        toString = op.toString;

    return {
    
        "runtime": {
            
            "entities": {
                "bat": { "delta": { "x": 0, "y": 0 } },
                "ball": { "delta": { "x": 0, "y": 0 } }
            },
            
            "score": 0,
            
            "loops": 0
            
        // end runtime
        },

        //---------------------------------------------------------------------------------------

        //  draw shapes
        //  params:
        //      id        String
        //      type    String
        draw: function( id, type ){
            // allow this to create one or many shapes
            var 
                d = (id) ? this.conf.dimensions[id] : this.conf.dimensions,
                cartesian = (id) ? this.conf.positions[id] : this.conf.positions;
  
            for(var i in d) {
                var 
                    o = d[i], 
                    coords = cartesian[i];
                
                if( o && coords && o.type ) {
                    if( type && o.type != type ) break; 
                    
                    // allow us to calculate positions at runtime, set to the functions result
                    o.x = ( toString.call(coords.x) != "[object String]") ? (new Function("return " + coords.x + ";") ).apply(this, coords) : coords[i].x//,
                    /*
                    o.y = ( toString.call(coords.y) != "[object String]") ? (new Function("return " + coords.y + ";") ).apply(this, coords) : coords[i].y;

                    if( this.debug ) console.log( toString.call(coords.x) );
                    if( this.debug ) console.log( toString.call(coords.y) );
                    if( this.debug ) console.log( o.x );
                    if( this.debug ) console.log( o.y );

                    switch(o.type) {
                        case "rect":
                            this.context.drawRectangle( coords.x, coords.y, o.w, o.h );
                        break;
                        // simple for now ...
                        case "arc":
                            this.context.beginPath();
                            this.context.arc(o.x, o.y, o.radius, 0, Math.PI*2, true);
                            this.context.fill();
                        break;
                    }
                    */
                }
            }
        },

        // update & draw
        gameLoop: function() {
            var l = this.entities.length;
            for( var i = 0;i < l; i++ ) {
                this.entities[i].updateDraw();
            }
        },

        //---------------------------------------------------------------------------------------

        // based on http://www.playmycode.com/blog/2011/08/building-a-game-mainloop-in-javascript/
        run: function() {
            var 
                animFrame = 
                    window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame  ||
                    window.oRequestAnimationFrame  ||
                    window.msRequestAnimationFrame  ||
                    null ;
            
            if( animFrame ) {
                // use MozBeforePaint for performance enhancement in FireFox
                if ( $.browser.mozilla ) {
                    
                    var recursiveAnimation = function() {
                        breaker.gameLoop();
                        animFrame();
                    };
                    window.addEventListener("MozBeforePaint", recursiveAnim, false);
                    
                } 
                // other browsers
                else {
                    // webkit, allows the canvas object to be passed in enhance performance.
                    var recursiveAnimation = function() {
                        breaker.gameLoop();
                        animFrame(recursiveAnimation, this.runtime.ctx);
                    };
                    
                }
            }
            else if( animFrame === null ) {
                var ONE_FRAME = this.conf.TICK_INTERVAL / this.conf.FPS;
                setInterval( breaker.gameLoop, this.runtime.ONE_FRAME );
                //clearInterval(this.oTimer);
            }
            
            //this.runtime.requestId = window.requestAnimationFrame;
            //window.cancelAnimationFrame(this.runtime.requestId);
            //this.runtime.requestId = null;
            
            return function() {
                
            }
            
        },
        
        stop: function() {
        },
        
        main: function(conf) {
            this.conf = conf;
            this.debug = conf.debug;

            if(this.debug) console.log("breaker:start");

            this.ctx = $("DIV.breaker CANVAS")[0],
            this.context = this.ctx.getContext("2d");

            this.draw();
            //this.run();
            
            if(this.debug) console.log("breaker:end");
        }
        
    };	

})();

//---------------------------------------------------------------------------------------

$(document).ready(function(){
  breaker.main(breaker_default_conf);
});

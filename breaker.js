
var breaker = (function(){
	var 
    c = $('#canvas')[0],
    context = c.getContext('2d'),
    
    "dimensions" = {
      "canvas" : { "w": 640, "h": 480 },
      "brick" : { "w": 200, "h": 40 }, 
      "bat": { "w": 100, "h": 25 }
    },
    
    "positions" = {
      "bat": { "x": , "y": }
    },
    
    "deltas" = { 
      "bat": { x: 0, y: 0 }
    };
	
	return {
		
	};
	
})();

$.ready(breaker);
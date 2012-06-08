var breaker_default_conf = {

  "debug": true,

  "rows": 4,
  "bricks_per_row": 8,

  // TODO later this could be the css values populated, enabling the object to be self contained, without CSS
  "padding": {
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
};
// TODO 
// - create new world when reaching a bound...
// - create more create world modes

var World = {
  size: {
    x: 500,
    y: 500
  },
  tilesize: 20,
  worldArray: [],
  bottomLayer: null,
  create: function(x,y, seed){
    console.log("creating world");
    if(x && y){
      World.size.x = x;
      World.size.y = y;
    }

    if(!seed){
      seed = 'justgoscha';
      console.log("Map seed is: "+seed);
    }

    this.worldArray = new Array(this.size.x*this.size.y);
    var random = new Alea(seed);
    var simplex = new SimplexNoise(random);
    
    var randStretchX = random()*100;
    var randStretchY = random()*100;

    for(var y=0; y<World.size.y; y++){
      for(var x=0; x<World.size.x; x++){
        var v=0;
        for(var fr = 1; fr<10; fr++){
          v = v + Math.abs((simplex.noise2D(x*(fr*fr)/(200-randStretchX), y*(fr*fr)/(200-randStretchY)))/(fr*fr));
        }
        //v = Math.sin(x/(300-random()/200)+v)-Math.cos(y/(300-random()/200)+v);
        v = Math.floor((v)*15);
        if (v<0)
          v=0;
        if (v>14)
          v=14;
        this.worldArray[x+(y*World.size.x)] = v
        // Math.floor(((v/1.2)+2)*10);
        // Math.min.apply(null,World.worldArray) 
        // find min max then normalize
      }
    }
    this.drawMinimap();

    var csv =  this.generateCSV();
    game.load.tilemap('level', null, csv, Phaser.Tilemap.CSV);

    var map = game.add.tilemap('level', World.tilesize, World.tilesize);
    map.addTilesetImage('tiles');
    //  Create our layer
    layer = map.createLayer(0);

    //  Resize the world
    layer.resizeWorld();

    this.bottomLayer = layer;
    // map collisions
    map.setCollisionBetween(12, 14);
    //map.setCollisionBetween(1399, 1400);

    //create world 
    // game.world.setBounds(0, 0, World.size.x*World.tilesize, World.size.y*World.tilesize);
    //game.world.setBounds(0, 0, World.size.x, World.size.y);

  },
  generateCSV: function(){
    var csv = "";
    for(var i=0;i<World.size.y;i++){
      for(var j = 0; j<World.size.x-1; j++){
        csv = csv+this.worldArray[j + i*World.size.x] + ",";
      }
      csv = csv+ this.worldArray[World.size.x-1 + i*World.size.x] + "\n";
    }
    // console.log("GENERATED CSV:");
    // console.log(csv);
    return csv;
  },
  drawMinimap: function(){
    var canvas = document.getElementById('minimap'),
        ctx = canvas.getContext('2d'),
        imgdata = ctx.getImageData(0, 0, canvas.width, canvas.height),
        data = imgdata.data;

    for (var i = this.worldArray.length - 1; i >= 0; i--) {
      var v = this.worldArray[i]/15
      data[(i) * 4 + 0] = v * 255;
      data[(i) * 4 + 1] = v * 255;
      data[(i) * 4 + 2] = v * 255;
      data[(i) * 4 + 3] = 255;
    };

    ctx.putImageData(imgdata, 0, 0);
  }
};

//@ sourceURL=world/world.js
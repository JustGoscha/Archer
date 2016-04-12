var UI = {
  gameUi: {
    group: null,
    create: function(game){
      this.group = new Phaser.Group(game);
      UI.forceMeter.create(this.group);
      UI.arrowCounter.create();
      UI.fps.create();
    }
  },
  update : function(){
    if(Gameplay.isDrawing){
      var time = game.time.elapsedSince(Gameplay.startDraw);
      var strength = time/1000;
      if(strength > 1) 
        strength = 1
      UI.forceMeter.update(Player.sprite, strength);
    }
    UI.fps.update();
  },
  forceMeter: {
    meter: {}, // the sprite
    create: function(group){
      this.meter = new Phaser.Graphics(game,0,0);
      this.meter.beginFill(0x8F343B, 1);
      group.add(this.meter);
    },
    update: function(player, ratio){
      this.meter.clear();
      this.meter.beginFill(0x8F343B, 1);
      var maxWidth = 30;
      var x = player.body.center.x - maxWidth/2;
      var y = player.body.center.y + 20;
      this.meter.drawRect(x,y,maxWidth*ratio,5);
    },
    delete: function(){
      this.meter.clear();
    },
    destroy: function(){

    }
  },
  arrowCounter: {
    element: null,
    update: function(){
      this.element.innerHTML = "Arrows: " + Player.arrowNum;
    },
    create: function(){
      var div = document.createElement('div');
      div.style.width = '200px';
      div.style.position = 'absolute';
      div.style.textAlign = 'left';
      div.style.font = 'MedievalSharp';
      div.style.color = 'rgba(255,230,220,1)';
      div.style.textShadow = '0 2px rgba(50,0,100,0.7)';
      div.style.fontSize = '24px';
      div.style.pointerEvents = 'none';
      div.style.padding = '20px';
      div.style.left = game.canvas.clientLeft;
      div.style.top = game.canvas.clientTop;
      div.innerHTML = "Arrows: " + Player.arrowNum;
      this.element = div;
      document.body.appendChild(div);
    }
  },
  fps: {
    element: null,
    update: function(){
      this.element.innerHTML = "fps: " + game.time.fps;
    },
    create: function(){
      game.time.advancedTiming = true;
      var div = document.createElement('div');
      div.style.width = '200px';
      div.style.position = 'absolute';
      div.style.textAlign = 'right';
      div.style.font = 'MedievalSharp';
      div.style.color = 'rgba(255,230,220,1)';
      div.style.textShadow = '0 2px rgba(50,0,100,0.7)';
      div.style.fontSize = '18px';
      div.style.pointerEvents = 'none';
      div.style.padding = '20px';
      div.style.left = game.canvas.clientLeft+game.canvas.clientWidth;
      div.style.top = game.canvas.clientTop;
      div.innerHTML = "fps: " + game.time.fps;
      this.element = div;
      document.body.appendChild(div);
    }    
  }
};

//@ sourceURL=ui/ui.js
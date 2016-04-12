// TODO
// - mouse camera move
// - sneak
// - focus mode
// - optimal release time (for arrow)
// - more arrow damage on speed
// 
// - wind to influence arow
// - movement to should influence arrow
// - sight cone

var Player = {
  arrowNum: 100,
  baseSpeed: 400,
  extra: 300,
  drawDuration: 1000,
  drag: 200,
  stopAt: 350,
  sprite: null,
  create: function(){
    var playerSprite = game.add.sprite(game.world.centerX,game.world.centerY,'player');
    playerSprite.scale.x = 0.5;
    playerSprite.scale.y = 0.5;
    playerSprite.speed = 520;
    this.sprite = playerSprite;
    return this;
  }
};

var CameraControl = {
  LOOK_AROUND: 0,
  PLAYER: 1,
  mode: 1,
  initCamera: function(){
    game.camera.follow(Player.sprite);
  },
  updateCamera: function(){
    if(this.mode == this.LOOK_AROUND){
      var centerPoint = Phaser.Point.centroid([Player.sprite.body.center, new Phaser.Point(game.input.mousePointer.worldX, game.input.mousePointer.worldY)]);
      centerPoint.x =centerPoint.x -game.width/2
      centerPoint.y =centerPoint.y -game.height/2
      game.camera.setPosition(centerPoint.x, centerPoint.y);
    }
      
  },
  toggleCameraMode: function(){
    console.log("TOGGLE CAMERA MODE")
    if(CameraControl.mode == CameraControl.LOOK_AROUND){
      CameraControl.mode = CameraControl.PLAYER;
      game.camera.follow(Player.sprite);
    }else{
      game.camera.unfollow();
      CameraControl.mode = CameraControl.LOOK_AROUND;
    }
  }
}


var Gameplay = {};
Gameplay.draw = function(event) {
  if(Player.arrowNum>0){
    console.log("Start drawing...");
    Gameplay.isDrawing = true;
    Gameplay.startDraw = event.timeDown;
  }
};

Gameplay.release = function(event){
  if(Gameplay.isDrawing){
    console.log("Release after: " + (event.timeUp - event.timeDown)/1000 + "s" );

    // reduce arrow of player
    Player.arrowNum--;
    UI.arrowCounter.update();

    Gameplay.isDrawing = false;
    UI.forceMeter.delete();

    var target = {
      x: event.worldX,
      y: event.worldY
    };
    // angle between release point and player
    var angle = game.math.angleBetweenPoints(Player.sprite.body.center, target);

    console.log("Click target position: "+target.x+", "+target.y);
    console.log("Player position: "+Player.sprite.body.center.x+", "+Player.sprite.body.center.y);

    var arrow = game.add.sprite(Player.sprite.body.center.x, Player.sprite.body.center.y, 'arrow');
    Arrows.group.add(arrow);
    //console.log("Add to arrow group.")


    var elapsed = game.time.elapsedSince(event.timeDown);

    arrow.rotation = Math.PI/2 + angle;
      // arrow.scale.x = 2;
      // arrow.scale.y = 2;
    var p = Player;
    var str = elapsed/p.drawDuration;
    if(str>1){
      str = 1;
    }
    var arrowSpeed = p.baseSpeed + p.extra * str;
    
    game.physics.enable(arrow, Phaser.Physics.ARCADE);
    console.log("ANGLE: " + angle);
    // var xSpeed = -arrowSpeed*Math.sin(angle);
    // var ySpeed = -arrowSpeed*Math.cos(angle);

    console.log(game.physics.arcade.velocityFromRotation(angle, arrowSpeed, arrow.body.velocity));
    var xDrag = Math.abs(Player.drag*Math.cos(angle));
    var yDrag = Math.abs(Player.drag*Math.sin(angle));

    // arrow.body.velocity.setTo(xSpeed,ySpeed);
    arrow.body.drag.setTo(xDrag,yDrag);
    arrow.body.collideWorldBounds = true;
    arrow.body.setSize(1, 1,0,0);


    var startPoint = {
      x: Player.sprite.body.center.x,
      y: Player.sprite.body.center.y
    };

    arrow.startPoint = startPoint;
  }
};

var Arrows = {
  group: null,
  lying: null,
  create: function(){
    this.self = this;
    this.group = new Phaser.Group(game);
    this.lying = new Phaser.Group(game);
  },
  checkArrows: function(){
    this.group.forEach(function(arrow){
      if(arrow){
        if(arrow.body.velocity.getMagnitude()<Player.stopAt){
          arrow.body.velocity.x = 0;
          arrow.body.velocity.y = 0;
          arrow.body.setSize(30, 30,-15,-15);

          console.log("Add lying group");
          Arrows.lying.add(arrow);
        }
      }
    });
  },
  onPlayerCollide: function(player, arrow){
    console.log("Player collided with arrow");


    arrow.kill()
    //Arrows.group.remove(arrow, true);
    Player.arrowNum++;
    UI.arrowCounter.update();

  },
  onEnemyCollide: function(arrow,enemy){
    // var enemy = new Phaser.Sprite();
    arrow.body.velocity.x = 0;
    arrow.body.velocity.y = 0;
    enemy.rotation = Math.PI/2;
    enemy.body.drag.setTo(300,300);
    Enemies.group.remove(enemy);
    Enemies.deadGroup.add(enemy);

  }
};


//@ sourceURL=gameplay/player-gameplay.js
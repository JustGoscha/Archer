function MainGame() {}
MainGame.prototype = {
  preload: function() {
    //
  },
  create: function() {
    game.stage.backgroundColor = '#cdc345';

    game.scale.startFullScreen(false);
    // create world 
    World.create();

    // create game UI°
    UI.gameUi.create(game);

    game.physics.startSystem(Phaser.Physics.ARCADE);

    Arrows.create();
    Enemies.create();

    Enemies.group.z = 0;
    Enemies.deadGroup.z = 0;
    Arrows.group.z = 1;
    // UI.gameUi.group.z = 3;
    game.world.sort('z', Phaser.Group.SORT_DESCENDING);

    // create player
    Player.create();


    game.physics.enable(Player.sprite);
    Player.sprite.body.collideWorldBounds = true;

    // game.camera.follow(Player.sprite, Phaser.Camera.FOLLOW_TOPDOWN);

    CameraControl.initCamera();
    BasicGame.control.startGameControls();



  },
  update: function() {
    PlayerMovement.updateMovement(Player.sprite);
        
    // check collisions
    game.physics.arcade.collide(Arrows.group, Enemies.group, Arrows.onEnemyCollide);
    // game.physics.arcade.collide(Player.sprite, Enemies.group);
    // game.physics.arcade.collide(Enemies.group, Enemies.group);
    game.physics.arcade.collide(Player.sprite, Arrows.lying, Arrows.onPlayerCollide);

    // collide with world
    game.physics.arcade.collide(Arrows.group, World.bottomLayer);
    game.physics.arcade.collide(Player.sprite, World.bottomLayer);
    game.physics.arcade.collide(Enemies.group, World.bottomLayer);


    // display the force meter for bow drawing
    UI.update();

    // check arrows if they need to stop
    Arrows.checkArrows();

    // update enemy AI and such
    Enemies.update();

    CameraControl.updateCamera();
  },  
  render: function() {
    // Arrows.lying.forEachExists(function(arrow){
    //   game.debug.body(arrow);
    // }, Arrows)

    // Enemies.group.forEachExists(function(entity){
    //   game.debug.body(entity);
    // }, Enemies)
    
  }
}


//@ sourceURL=states/maingame.js
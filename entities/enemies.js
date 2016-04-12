// TODO
// - create enmies in right position (e.g. not in a mountain)
// - create enemy behaviors
//  - attacking
//  - strolling around
//  - sight cone
// - create Animals

var Enemies = {
  group: null,
  deadGroup: null,
  random: function(){},
  create: function(){
    this.group = new Phaser.Group(game);
    this.deadGroup = new Phaser.Group(game);
    console.log("creating enemies");
    var enemyNum = 100; 
    var maxOffset = 200; // :2
    var halfOffset = 100;
    var lastPosition = new Phaser.Point();

    var random = new Alea('enemy');
    this.random = random;
    for (var i = 0; i < enemyNum; i++) {
      var position = new Phaser.Point();
      if(i==0 || this.random()<0.8){
         position = this.randomPosition();
      } else {
        var offset = new Phaser.Point(this.random()*maxOffset-halfOffset, this.random()*maxOffset-halfOffset);
        position = new Phaser.Point(lastPosition.x+offset.x,lastPosition.y + offset.y);
      }


      lastPosition.copyFrom(position);
      var enemy = this.createEnemy(position);
      Enemies.group.add(enemy);

    }

    console.log("enemies created");
  },
  update: function(){
    // update AI of all enemies

    Enemies.group.forEach(function(enemy){
      enemy.ai.update(enemy); 
    }, this, true);

    
  },
  createEnemy: function(point){
    var enemy = game.add.sprite(point.x,point.y,'dog');
    enemy.ai = AI.dog.createAI();

    game.physics.enable(enemy);
    enemy.body.collideWorldBounds = true;
    enemy.body.mass = 70;
    enemy.anchor.set(0.5);
    enemy.animations.add('walk');
    // enemy.scale.y = 0.5;
    // enemy.scale.x = 0.5;

    return enemy;
  },
  randomPosition: function () {
    var x = this.random() * World.size.x * World.tilesize;
    var y = this.random() * World.size.y * World.tilesize;
    var position = new Phaser.Point(x, y);
    return position;
  }
};


//@ sourceURL=entities/enemies.js
BasicGame.control = {
  up: game.input.keyboard.addKey(Phaser.Keyboard.W),
  down: game.input.keyboard.addKey(Phaser.Keyboard.S),
  left: game.input.keyboard.addKey(Phaser.Keyboard.A),
  right: game.input.keyboard.addKey(Phaser.Keyboard.D),
  space: game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR),
  shift: game.input.keyboard.addKey(Phaser.Keyboard.SHIFT),
  ctrl: game.input.keyboard.addKey(Phaser.Keyboard.CONTROL),

  startGameControls: function(){
    // draw/release mechanic
    game.input.onDown.add(Gameplay.draw, this);
    game.input.onUp.add(Gameplay.release, this);

    BasicGame.control.shift.onDown.add(CameraControl.toggleCameraMode);
  }
};

//@ sourceURL=utils/controls.js
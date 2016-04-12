function MainMenu() {}
MainMenu.prototype = {
	preload: function() {
		//
	},
	create: function() {
		//
		this.ui.createUI();
		BasicGame.control.space.onDown.add(startGame);

	  function startGame(){
	    console.log("PRESSED SPACE");
	    game.state.start('maingame');
	  }

	},
	update: function() {
		// 
	},
	render: function() {
		//
	},
	ui: {
		createUI: function(){
			var ui = new Phaser.Group(game);
			var buttonWidth = 200;
			var buttonHeight = 40;

			var style = { font: "50px MedievalSharp", fill: "#FFCA32", align: "center"};
      var titleText = new Phaser.Text(game, (game.width-155)/2, 50, "Archer", style);
      titleText.setShadow(0, 3, 'rgba(200,100,120,0.8)', 0);

      var startButton = new Phaser.Graphics(game,0,0);
      startButton.lineStyle(3,0xFFCA32,0.9);
      startButton.beginFill(0x2F2121,1);
      startButton.drawRect((game.width-buttonWidth)/2, 300, buttonWidth, buttonHeight);

			var style2 = { font: "30px MedievalSharp", fill: "#FFCA32", align: "center"};
      var buttonText = new Phaser.Text(game, (game.width-150)/2, 305, "Hit Space", style2);

      ui.add(titleText);
      ui.add(startButton);
      ui.add(buttonText);


		}
	}
}

//@ sourceURL=states/mainmenu.js
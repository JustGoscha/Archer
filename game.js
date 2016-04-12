var game = new Phaser.Game(700, 700, Phaser.CANVAS, 'game');

setTimeout(function() {
	window.BasicGame = {
		start: function(){

			function Boot() {};
			Boot.prototype = {
			  preload: function() {
			    // load preloader assets
			    this.game.load.script('preloader', 'states/preloader.js');
			  },
			  create: function() {
			    // setup game environment
			    // scale, input etc..
			 		this.game.state.add('preload', Preload);
			    this.game.state.start('preload');
			  }
			};

			game.state.add('boot', Boot);
			game.state.start('boot');
		}
	}
	window.BasicGame.start()
}, 1000);


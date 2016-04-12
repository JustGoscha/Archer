function Preload() {}
Preload.prototype = {
	preload: function(){
		// load all the other states
		this.game.load.script('mainmenu', 'states/mainmenu.js');
		this.game.load.script('game', 'states/maingame.js');
		this.game.load.script('world', 'world/world.js');
		this.game.load.script('controls', 'utils/controls.js');
		this.game.load.script('playermovement', 'utils/playermovement.js');
		this.game.load.script('enemies', 'entities/enemies.js');
		this.game.load.script('ai', 'ai/ai.js');
		this.game.load.script('ui', 'ui/ui.js');
		this.game.load.script('player-gameplay', 'gameplay/player-gameplay.js');

		// art assets
		this.game.load.image('enemy','assets/sprite/enemy.png');
		this.game.load.image('player','assets/sprite/archer.png');
		this.game.load.image('arrow','assets/sprite/arrow.png');

		// sprites/atlas
		this.game.load.atlasJSONHash('dog', 'assets/sprite/dogwalk.png', 'assets/sprite/dogwalk.json');

		// tiles
		this.game.load.image('tiles','assets/tiles/tiles2.png');


		// load all other assets
	},
	create: function(){
		// maybe do some preloading animation 
		this.game.state.add('mainmenu', MainMenu);
		this.game.state.add('maingame', MainGame);

		this.game.state.start('mainmenu');
	}
};

//@ sourceURL=states/preloader.js
var AI = {
	dog: {
		// creates new AI to attach to this dog
		update: function(dog){
			// do action for current state
			AI.dog.states[dog.ai.state](dog);
		},
		states: {
			strolling: function(dog) {
				// start walking in random direction
				//dog.body.velocity.
				if(dog.ai.meta.behavior == "waiting"){
					if (game.time.now - dog.ai.meta.start > dog.ai.meta.time){
						dog.ai.meta.start = game.time.now;
						dog.ai.meta.behavior = "walking";
						dog.ai.meta.time = 15000 * Math.random()+5000;

						// start walking
						var speed = 80;
						var random = new Alea(Math.random());
						var randomDirection = Math.random() * 2 * Math.PI;
						dog.body.drag.setTo(0, 0);
						var randomSpeed = speed * Math.random()+20;
						game.physics.arcade.velocityFromRotation(randomDirection, randomSpeed, dog.body.velocity);
						// enemy.animations.add('walk');
						dog.animations.play('walk', randomSpeed/10, true);
						if (dog.body.velocity.x < 0){

							dog.scale.x = 1;
							// dog.body.scale.x = 1;
						} else {
							dog.scale.x = -1;
							// dog.body.scale.x = -1;

						}
						// enemy.animations.play('walk', 100/randomSpeed, true);
					}
				} else {

					// stop walking after random time
					if (game.time.now - dog.ai.meta.start > dog.ai.meta.time){
						dog.ai.meta.start = game.time.now;
						dog.ai.meta.behavior = "waiting";
						dog.ai.meta.time = 4000 * Math.random() + 1000;
						dog.animations.stop('walk',6);
						dog.body.drag.setTo(600, 600);
					}
				}


			},
			attacking: function(dog){

			}
		},
		createAI: function(){

			// behaviors for dog... ?
				// strolling around...
				// hunting

			var update = function(){

			}
			var createdAI = {
				update: AI.dog.update,
				state: 'strolling',
				meta: {
					behavior: 'waiting',
					time: '1000',
					start: game.time.now
				} // meta data for current state
			};

			return createdAI;
		}
	}
}
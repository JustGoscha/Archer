var PlayerMovement = {
	updateMovement: function(player){
		var control = BasicGame.control;

	  if(control.down.isDown &&
	    !control.up.isDown &&
	    !control.left.isDown &&
	    !control.right.isDown){
	    player.body.velocity.y = player.speed;
	    player.body.velocity.x=0;
	  }else if(!control.down.isDown &&
	    control.up.isDown &&
	    !control.left.isDown &&
	    !control.right.isDown){
	    player.body.velocity.y = -player.speed;
	    player.body.velocity.x=0;
	  }else if(!control.down.isDown &&
	    !control.up.isDown &&
	    control.left.isDown &&
	    !control.right.isDown){
	    player.body.velocity.x = -player.speed;
	    player.body.velocity.y = 0;
	  }else if(!control.down.isDown &&
	    !control.up.isDown &&
	    !control.left.isDown &&
	    control.right.isDown){
	    player.body.velocity.x = player.speed;
	    player.body.velocity.y = 0;
	  }else if(control.down.isDown &&
	    !control.up.isDown &&
	    control.left.isDown &&
	    !control.right.isDown){
	    player.body.velocity.y = .7071067811865475*player.speed;
	    player.body.velocity.x = -.7071067811865475*player.speed;
	  }else if(control.down.isDown &&
	    !control.up.isDown &&
	    !control.left.isDown &&
	    control.right.isDown){
	    player.body.velocity.y = player.speed*.7071067811865475;
	    player.body.velocity.x = player.speed*.7071067811865475;
	  }else if(!control.down.isDown &&
	    control.up.isDown &&
	    control.left.isDown &&
	    !control.right.isDown){
	    player.body.velocity.x = -player.speed*.7071067811865475;
	    player.body.velocity.y = -player.speed*.7071067811865475;
	  }else if(!control.down.isDown &&
	    control.up.isDown &&
	    !control.left.isDown &&
	    control.right.isDown){
	    player.body.velocity.x = player.speed*.7071067811865475;
	    player.body.velocity.y = -player.speed*.7071067811865475;
	  }else{
	    player.body.velocity.x = 0;
	    player.body.velocity.y = 0;
	  }
	}
}

//@ sourceURL=utils/playermovement.js
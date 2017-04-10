basicGame.prototype = { 
    preload: function(){
        game.load.image("bg","img/scenes-lava.png");
        game.load.image("star","img/star.png");
        game.load.image("diamond","img/diamond.png");
        game.load.image("platform","img/platform.png");
        game.load.image("tapButton","img/btn.png");
        game.load.spritesheet("dude","img/dude.png",32,48);
        game.load.spritesheet("naruto","img/naruto2.png",41,110);
        game.load.spritesheet("btn-jump","img/btn-up.png",100,100);
    },
    create: function(){
        game.world.setBounds(0,0,bounds,0);

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,"bg");
        platform = game.add.sprite(0,580,"platform");
        platform.scale.x = 100;

        player2 = game.add.sprite(300,200,"naruto");
        btnJump = game.add.button(50,400,"btn-jump",gameProcess.lundagNaruto);
        btnLeft = game.add.button(0,0,"tapButton",gameProcess.goLeft);
        btnLeft.scale.x = 8;
        btnLeft.scale.y = 12;
        btnRight = game.add.button(w/2,0,"tapButton",gameProcess.goRight);
        btnRight.scale.x = 8;
        btnRight.scale.y = 12;

        player2.animations.add('walk-right',[4,5,6,7],10,true); 
        player2.animations.add('walk-left',[8,9,10,11],10,true);

        keyboard = game.input.keyboard.createCursorKeys();

        diamond = game.add.group();
        diamond.enableBody = true;

        star = game.add.group();
        star.enableBody = true;

        gameProcess.createDiamond(100);
        gameProcess.createStar(100);

        game.physics.arcade.enable(player2);
        game.physics.arcade.enable(diamond);
        game.physics.arcade.enable(star);
        game.physics.arcade.enable(platform);
        platform.body.immovable = true;
        player2.body.collideWorldBounds = true;
        player2.scale.x = 2;
        player2.scale.y = 2;

        player2.body.gravity.y = 1000;

        scoreText = game.add.text(50,50,"SCORE: 0",{fill:"gray"});
        bestText = game.add.text(50,100,"BEST: "+gameProcess.getBest(),{fill:"gray"});
        gameText = game.add.text(w/2-100,h/2,"");

        game.camera.follow(player2,Phaser.Camera.FOLLOW_TOPDOWN);

        scoreText.fixedToCamera = true;
        bestText.fixedToCamera = true;
        gameText.fixedToCamera = true;
        btnJump.fixedToCamera = true;
    },
    update: function(){
        game.physics.arcade.collide(player2, platform);
        game.physics.arcade.collide(diamond, platform);
        game.physics.arcade.overlap(player2,diamond,gameProcess.killDiamond);
        game.physics.arcade.overlap(player2,star,gameProcess.killStar);
        if(keyboard.left.isDown){
            player2.animations.play('walk-left');
            player2.body.velocity.x = -300;
        }
        else if(keyboard.right.isDown){
            player2.animations.play('walk-right');
            player2.body.velocity.x = 300;
        }
        else{
            player2.body.velocity.x = 0;
            player2.animations.stop();
        }

        if(keyboard.up.isDown){
            player2.body.velocity.y = -200;
        }
    }
}

game.state.add("playgame",basicGame,true);

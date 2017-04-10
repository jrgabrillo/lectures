basicGame.prototype = {
    preload: function(){
        game.load.image("bg","img/sky.png");
        game.load.image("bg1","img/bg.png");
        game.load.image("star","img/star.png");
        game.load.image("diamond","img/diamond.png");
        game.load.image("platform","img/platform.png");
        game.load.spritesheet("bg-images","img/scenes-lava.png",1024,600);
        game.load.spritesheet("naruto","img/naruto2.png",41,112);
        game.load.spritesheet("btnJump","img/btn-green.png",200,100);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,"bg");
        player = game.add.sprite(600,0,"naruto");
        player.animations.add('walk-right',[4,5,6,7],7,true);
        player.animations.add('walk-left',[8,9,10,11],7,true);

        keyboard = game.input.keyboard.createCursorKeys();

        btn = game.add.button(0,400,"btnJump",process.lundagNaruto);

        process.createDiamonds(2000);
        process.createStars(2500);
        process.timer(60,1000);

        diamond = game.add.group();
        diamond.enableBody = true;

        platform = game.add.group();
        platform.enableBody = true;

        platforms = platform.create(0,580,"platform");
        platforms.body.immovable = true;
        platforms.scale.x = 2;

        star = game.add.group();
        star.enableBody = true;

        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;
        player.body.gravity.y = 10000;

        scoreText = game.add.text(w-200,50,"Score: 0",{fill:"magenta"});
        bestText = game.add.text(w-200,100,"Best: "+process.getData()   ,{fill:"magenta"});
        timeText = game.add.text(100,50,"Time: 10",{fill:"yellow"});
        gameOverText = game.add.text((w/2)-100,300,"");
    },
    update: function(){
        game.physics.arcade.collide(diamond,platform);
        game.physics.arcade.collide(player,platform);
        game.physics.arcade.overlap(player,diamond,process.killNaruto);
        game.physics.arcade.overlap(player,star,process.killStar);

        if(keyboard.left.isDown){
            // x++;
            player.animations.play("walk-left");
            player.body.velocity.x = -200;
            // bg.frame = 0;
        }
        else if(keyboard.right.isDown){
            // x--;
            // bg.frame = 1;
            player.animations.play("walk-right");
            player.body.velocity.x = 200;
        }
        else if(keyboard.up.isDown){
            player.body.velocity.y = -200;
            player.animations.play("walk-right");
        }
        else if(keyboard.down.isDown){
            player.body.velocity.y = 200;
            player.animations.play("walk-right");
        }    
        else{
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            player.animations.stop();
        }
    }
}

game.state.add("gameplay",basicGame,true);

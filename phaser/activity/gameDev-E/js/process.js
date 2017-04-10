basicGame.prototype = {
    init:function(){

    },
    preload: function(){
        game.load.image("star","img/star.png");
        game.load.image("bg","img/sky.png");
        game.load.image("platform","img/platform.png");
        game.load.image("button","img/platform.png");
        game.load.image("diamond","img/diamond.png");
        game.load.image("bg-images","img/scenes-lava.png");
        game.load.spritesheet("naruto","img/naruto2.png",41,112);
        game.load.spritesheet("explode","img/explode.png",128,128);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,"bg-images");
        platform = game.add.sprite(0,h/2,"platform");
        platform.scale.x = 500;

        button = game.add.sprite(100,450,"button");

        button.scale.x = 0.5;
        button.scale.y = 3;

        player = game.add.sprite(600,0,"naruto");
        game.world.setBounds(0,0,bounds,0);

        player.animations.add('walk-right',[4,5,6,7],7,true);
        player.animations.add('walk-left',[8,9,10,11],7,true);

        keyboard = game.input.keyboard.createCursorKeys();

        game.input.addPointer();

        game.physics.arcade.enable(player);

        game.physics.arcade.enable(platform);

        platform.body.immovable = true;

        shineDiamond = game.add.group();
        shineDiamond.enableBody = true;

        star = game.add.group();
        star.enableBody = true;

        panagGalaw.createDiamonds(100);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.bounce.y = 0.2
        player.scale.y = 1.5;

        life = game.add.text(550,50,'Score: 0',{fill:"yellow"});
        bestScoreText = game.add.text(550,100,'Best: '+panagGalaw.getScore(),{fill:"white"});
        gameOverText = game.add.text((w/2)-100,h/2,'',{fill:"white"});

        game.camera.follow(player,Phaser.Camera.FOLLOW_TOPUP);
    },
    update: function(){
        if(player.body.position.x >= 4000){
            console.log("extend");
            game.world.setBounds(0,0,bounds*2,0);
        }
        else if(player.body.position.x >= 9000){
            console.log("extend");
            game.world.setBounds(0,0,bounds*3,0);
        }
        game.physics.arcade.collide(player,platform);
        game.physics.arcade.overlap(player,shineDiamond,panagGalaw.collectDiamonds);
        game.physics.arcade.overlap(player,star,panagGalaw.collectStars);
        game.physics.arcade.overlap(platform,shineDiamond,panagGalaw.explodeDiamond);

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
        else{
            player.body.velocity.x = 0;
            player.animations.stop();
        }

        if(keyboard.up.isDown/* && player.body.touching.down*/){
            player.body.velocity.y = -200;
        }
    }
}
game.state.add("Play",basicGame,true);
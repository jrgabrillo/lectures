mambobola.prototype = {
    init:function(){

    },
    preload: function(){
        game.load.image('platform','img/platform.png');
        game.load.image('sky','img/sky.png');
        game.load.image('star','img/star.png');
        game.load.image('diamond','img/diamond.png');
        game.load.image('bg','img/scenes-lava.png');
        game.load.spritesheet('naruto','img/naruto2.png',40,112);
        game.load.spritesheet('btn','img/btn-up.png',100,100);
        game.load.spritesheet('btn-play','img/btn-green.png',200,100);
    }, 
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,"bg");
        game.world.setBounds(0,0,boundsRight,0);

        player = game.add.sprite(w/2,(h/2)+50,"naruto");

        player.animations.add("walk-right",[4,5,6,7],10,true);
        player.animations.add("walk-left",[8,9,10,11],10,true);

        game.physics.arcade.enable(player);
        player.body.collideWorldBounds = true;

        diamond = game.add.group();
        diamond.enableBody = true;

        star = game.add.group();
        star.enableBody = true;

        platform = game.add.group();
        platform.enableBody = true;
        platforms = platform.create(0,470,"platform");
        platforms.scale.x = 50;
        platforms.body.immovable = true;

        proseso.createDiamonds(500);
        proseso.createStars(800);

        proseso.time(1000,duration);

        player.body.bounce.y = 0.5;
        player.body.gravity.y = 10000;
        keyboard = game.input.keyboard.createCursorKeys();
        scoreText = game.add.text(600,50,"SCORE: 0",{fill:'white'});
        bestText = game.add.text(600,100,"HI: "+proseso.retrieve(),{fill:'white'});
        lifeText = game.add.text(100,50,"LIFE: 3",{fill:'red'});
        timeText = game.add.text(100,100,"TIME: "+duration,{fill:'red'});
        gameOverText = game.add.text(w/2-100,h/2,"",{fill:'white'});

        game.camera.follow(player,Phaser.Camera.FOLLOW_TOPDOWN);

        scoreText.fixedToCamera = true;
        gameOverText.fixedToCamera = true;
        bestText.fixedToCamera = true;
        lifeText.fixedToCamera = true;
        timeText.fixedToCamera = true;

        button_Lundag = game.add.button(100,400,"btn",proseso.palundaginSiNaruto);
        button_Galaw = game.add.button((w/2)-100,(h/2)-50,"btn-play",proseso.playGame);
    }, 
    update: function(){
        game.physics.arcade.collide(platform, diamond);
        game.physics.arcade.collide(platform, star);
        game.physics.arcade.collide(player, platform);
        game.physics.arcade.overlap(player,diamond,proseso.killDiamond);
        game.physics.arcade.overlap(player,star,proseso.killStar);

        if(keyboard.left.isDown){
            player.body.velocity.x = -500;
            player.animations.play('walk-left');
        }
        else if(keyboard.right.isDown){
            player.body.velocity.x = 500;
            player.animations.play('walk-right');
        }
        else if(keyboard.down.isDown){
            player.body.velocity.y = 50;
        }
        else{
            player.body.velocity.y = 0;
            player.body.velocity.x = 0;
            player.animations.stop();
        }

        if(keyboard.up.isDown&& player.body.touching.down){
            player.body.velocity.y = -10000;
        }
    }
}
game.state.add("Game",mambobola,true);

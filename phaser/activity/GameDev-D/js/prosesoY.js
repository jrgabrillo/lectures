basicGame.prototype = {
    preload: function(){
        game.load.image("platform","img/platform.png");
        game.load.image("diamond","img/diamond.png");
        game.load.image('sky','img/sky.png');
        game.load.image('star','img/star.png');
        game.load.image('bg','img/scenes-lava.png');
        game.load.image('image1','img/diamond.png');
        game.load.image('naruto1','img/naruto-tayo.png');
        game.load.image('ledge','img/platform.png');
        game.load.spritesheet("bg-images","img/scenes-lava.png",1024,600);
        game.load.spritesheet('narutoHiga','img/naruto-higa.png',115,41);
        game.load.spritesheet('naruto','img/naruto-tayo.png',41,111);
        game.load.spritesheet('btn-lundag','img/btn-up.png',100,100);
        game.load.spritesheet('btn-Ikap','img/btn-green.png',200,100);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,"bg");
        platform = game.add.sprite(0,580,"platform");
        platform.scale.x = 500;

        game.world.setBounds(0,0,bounds,0);

        player = game.add.sprite(600,0,"naruto");
        buttonLundag = game.add.button(50,400,"btn-lundag",process.talonNaruto);

        buttonIkap = game.add.button(w/2-100,h/2-50,"btn-Ikap",process.PlayPause);

        player.animations.add('walk-right',[4,5,6,7],7,true);
        player.animations.add('walk-left',[8,9,10,11],7,true);

        keyboard = game.input.keyboard.createCursorKeys();

        game.physics.arcade.enable(player);
        game.physics.arcade.enable(platform);

        platform.body.immovable = true;

        diamond = game.add.group();
        diamond.enableBody = true;

        star = game.add.group();
        star.enableBody = true;
        process.createDiamonds(200);
        process.createStars(200);
        process.countdownTimer();

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.bounce.y = 0.2
        player.scale.y = 1.5;

        game.camera.follow(player,Phaser.Camera.FOLLOW_TOPDOWN);
        life = game.add.text(w/2-100,h/2,"",{fill:'red'});
        life.fixedToCamera = true;
        score = game.add.text(100,50,"Score: 0",{fill:'#fff'});
        score.fixedToCamera = true;
        hi = game.add.text(100,100,"HI: "+process.getScore(),{fill:'blue'});
        hi.fixedToCamera = true;

        textTime = game.add.text(100,150,"Oras na: "+time,{fill:'blue'});
        textTime.fixedToCamera = true;


        buttonLundag.fixedToCamera = true;
        buttonIkap.fixedToCamera = true;
    },
    update: function(){
        game.physics.arcade.collide(diamond,platform);
        game.physics.arcade.collide(player,platform);
        game.physics.arcade.overlap(player,diamond,process.collectDiamonds);
        game.physics.arcade.overlap(player,star,process.collectStars);

        if(keyboard.left.isDown){
            player.animations.play("walk-left");
            player.body.velocity.x = -speed;
        }
        else if(keyboard.right.isDown){
            player.animations.play("walk-right");
            player.body.velocity.x = speed;
        }
        else{
            player.body.velocity.x = 0;
            player.animations.stop();
        }

        if(keyboard.up.isDown && player.body.touching.down){
            player.body.velocity.y = -speed;
        }
    }
};

game.state.add("play",basicGame,true);

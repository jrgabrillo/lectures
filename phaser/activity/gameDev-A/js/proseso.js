var w = 800, h = 600;
var a = 0;
var bounds = 10000;
var player, keyboard, explode;
var diamond, star, shineDiamond, shineDiamonds, platform, star, stars, life, gameOverText, bestScoreText, button;

var game = new Phaser.Game(w, h, Phaser.CANVAS, '');

var basicGame = function(){
}

basicGame.prototype = {
    preload: function(){
        game.load.image("star","img/star.png");
        game.load.image("bg","img/sky.png");
        game.load.image("platform","img/platform.png");
        game.load.image("diamond","img/diamond.png");
        game.load.image("bg-images","img/scenes-lava.png");
        game.load.spritesheet("naruto","img/naruto2.png",41,112);
        game.load.spritesheet("explode","img/explode.png",128,128);
        game.load.spritesheet("button","img/btn-up.png",100,100);
    },
    create: function(){
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.add.sprite(0,0,"bg-images");
        platform = game.add.sprite(0,h/2,"platform");
        platform.scale.x = 500;

        button = game.add.button(100,450,"button",process.lundagNaruto);
        player = game.add.sprite(600,0,"naruto");
        game.world.setBounds(0,0,bounds,0);

        player.animations.add('walk-right',[4,5,6,7],7,true);
        player.animations.add('walk-left',[8,9,10,11],7,true);

        keyboard = game.input.keyboard.createCursorKeys();

        game.physics.arcade.enable(player);
        game.physics.arcade.enable(platform);

        platform.body.immovable = true;

        shineDiamond = game.add.group();
        shineDiamond.enableBody = true;

        star = game.add.group();
        star.enableBody = true;

        process.createDiamonds(100);
        process.createStars(500);

        player.body.collideWorldBounds = true;
        player.body.gravity.y = 1000;
        player.body.bounce.y = 0.2
        player.scale.y = 1.5;

        life = game.add.text(550,50,'Score: 0',{fill:"yellow"});
        bestScoreText = game.add.text(550,100,'Best: '+process.getScore(),{fill:"white"});
        gameOverText = game.add.text((w/2)-100,h/2,'',{fill:"white"});

        game.camera.follow(player,Phaser.Camera.FOLLOW_TOPUP);
        life.fixedToCamera = true;
        bestScoreText.fixedToCamera = true;
        gameOverText.fixedToCamera = true;
        button.fixedToCamera = true;
    },
    update: function(){
        game.physics.arcade.collide(player,platform);
        game.physics.arcade.overlap(player,shineDiamond,process.collectDiamonds);
        game.physics.arcade.overlap(player,star,process.collectStars);
        game.physics.arcade.overlap(platform,shineDiamond,process.explodeDiamond);

        if(keyboard.left.isDown){
            player.animations.play("walk-left");
            player.body.velocity.x = -200;
        }
        else if(keyboard.right.isDown){
            player.animations.play("walk-right");
            player.body.velocity.x = 200;
        }
        else{
            player.body.velocity.x = 0;
            player.animations.stop();
        }

        if(keyboard.up.isDown){
            player.body.velocity.y = -200;
        }
    }
};

game.state.add("gameplay",basicGame,true);

var process = function(){
    "use strict";
    return {
        collectDiamonds:function(player,shineDiamond){
            a = a + 5;
            shineDiamond.kill();
            if(process.getScore()<=a){
                process.saveScore(a);
                bestScoreText.text = "Best: "+a;
            }

            life.text = "Score: "+a;
        },
        collectStars:function(player,star){
            player.kill();
            gameOverText.text = "GAME OVER";
            game._paused = true;
        },
        createDiamonds:function(time){
            setInterval(function(){
                var size = Math.random();
                var shineDiamonds = shineDiamond.create(Math.random()*bounds,-100,'diamond');
                shineDiamonds.body.gravity.y = 100;
                shineDiamonds.body.bounce.y = 0.1;

                shineDiamonds.scale.x = size*2;
                shineDiamonds.scale.y = size*2;
            },time)
        },
        createStars:function(time){
            setInterval(function(){
                var size = Math.random();
                var stars = star.create(Math.random()*bounds,-100,'star');
                stars.body.gravity.y = 100;
                stars.body.bounce.y = 0.1;

                stars.scale.x = size*2;
                stars.scale.y = size*2;
            },time)
        },
        saveScore:function(Score){
            localStorage.setItem("gameScore",Score);
        },
        getScore:function(){
            return (localStorage.getItem("gameScore") == null || localStorage.getItem("gameScore") == "")?0:localStorage.getItem("gameScore");
        },
        explodeDiamond:function(platform,shineDiamond){
            shineDiamond.kill();
            explode = game.add.sprite((shineDiamond.position.x-64),(shineDiamond.position.y-64),"explode");
            explode.animations.add('explosion',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],10,false);
            explode.animations.play('explosion');
            setTimeout(function(){
                explode.animations.stop();
                explode.kill();
            },200)
        },
        lundagNaruto:function(){
            button.frame = 1;
            if(player.body.touching.down){
                player.body.velocity.y = -200;
            }

            setTimeout(function(){
                button.frame = 0;
            },100)
        }
    }
}();

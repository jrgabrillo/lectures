var panagGalaw = function(){
    "use strict";
    return {
        collectDiamonds:function(player,shineDiamond){
            a = a + 5;
            shineDiamond.kill();
            if(panagGalaw.getScore()<=a){
                panagGalaw.saveScore(a);
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
                // shineDiamonds.body.collideWorldBounds = true;
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
                // shineDiamonds.body.collideWorldBounds = true;
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
            },200);
        }
    }
}();
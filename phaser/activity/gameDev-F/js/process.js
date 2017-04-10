var proseso = function(){
    "use strict";
    return {
        killDiamond:function(player,diamond){
            score = score + 10;
            scoreText.text = "SCORE: "+score;
            diamond.kill();
            if(proseso.retrieve()<=score){
                proseso.saveScore(score);        
            }
        },
        killStar:function(player,star){
            life--;
            lifeText.text = "LIFE: "+life;
            if(life>0){
                star.kill();
            }
            else{
                proseso.killNaruto();   
            }
        },
        killNaruto:function(player,diamond){
            gameOverText.text = "GAME OVER";
            game._paused = true;
            // player.kill();
        },
        createStars:function(time){
            setInterval(function(){
                var size = Math.random();
                stars = star.create(Math.random()*boundsRight,-100,"star");
                stars.body.gravity.y = 100;
                stars.scale.x = size*2;
                stars.scale.y = size*2;
                // stars.body.collideWorldBounds = true;
                stars.body.bounce.y = 0.7;
            },time)
        },
        createPlatform:function(time){
                var size = Math.random();
                platforms = platform.create(Math.random()*boundsRight,-100,"star");
                platforms.body.gravity.y = 100;
                platforms.scale.x = size*2;
                platforms.scale.y = size*2;
                platforms.body.bounce.y = 0.7;
        },
        createDiamonds:function(time){
            setInterval(function(){
                var size = Math.random();
                diamonds = diamond.create(Math.random()*boundsRight,-100,"diamond");
                diamonds.body.gravity.y = 100;
                diamonds.scale.x = size*2;
                diamonds.scale.y = size*2;
                // diamonds.body.collideWorldBounds = true;
                diamonds.body.bounce.y = 0.7;
            },time)
        },
        time:function(time,duration){
            setInterval(function(){
                if(duration<=0){
                    proseso.killNaruto();
                }
                else{
                    if(lifeText._text != "LIFE: 0"){
                        duration--;
                    }
                    timeText.text = "TIME: "+duration;            
                }
            },time);
        },
        saveScore:function(score){
            localStorage.setItem("saveScore",score);
        },  
        retrieve:function(){
            var data = localStorage.getItem("saveScore");
            if(data == null || data == ""){
                data = 0;
            }
            return data;
        },
        palundaginSiNaruto:function(){
            player.body.velocity.y = -10000;

            button_Lundag.frame = 1;

            setTimeout(function(){
                button_Lundag.frame = 0;

            },100);
        },
        playGame:function(){
            button_Galaw.frame = 1;
            // game._paused = true;
            // proseso.create();
            setTimeout(function(){
                button_Galaw.frame = 0;
            },100);

            setTimeout(function(){
                // game._paused = false;
            },3000);
        }
    }
}();

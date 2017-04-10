var gameProcess = function(){
    "use strict";
    return {
        createDiamond:function(time){
            setInterval(function(){
                var size = Math.random();
                diamonds = diamond.create(Math.random()*bounds,-100,"diamond");
                diamonds.body.gravity.y = 1000;
                diamonds.scale.x = size*5;
                diamonds.scale.y = size*5;
                diamonds.body.bounce.y = 0.5;        
            },time)
        },
        createStar:function(time){
            setInterval(function(){
                var size = Math.random();
                stars = star.create(Math.random()*bounds,-100,"star");
                stars.body.gravity.y = 1000;
                stars.scale.x = size*5;
                stars.scale.y = size*5;
                stars.body.bounce.y = 0.5;        
            },time)
        },
        timer:function(countDown,time){
            setInterval(function(){
                if(countDown<0){
                    timeText.text = "TIME: 0";
                    gameText.text = "GAME OVER";
                }
                else{
                    countDown--;
                    timeText.text = "TIME: "+countDown;
                }

            },time);
        },
        killDiamond:function(player,diamond){
            score = score - 1;
            scoreText.text = "SCORE: "+score;
            diamond.kill();
            if(gameProcess.getBest()<=score){
                gameProcess.saveBest(score);  
                bestText.text = "BEST: "+score;      
            }
            if(score<0){
                gameText.text = "GAME OVER";
            }
            else{
                gameText.text = "";
            }
        },
        killStar:function(player,star){
            score = score - 2;
            scoreText.text = "SCORE: "+score;
            star.kill();
            gameText.text = "GAME OVER";
            game._paused = true;
        },
        saveBest:function(value){
            localStorage.setItem("gameStorage",value);
        },
        getBest:function(){
            return ((localStorage.getItem("gameStorage") == null) || (localStorage.getItem("gameStorage") == ""))?0:localStorage.getItem("gameStorage");
        },
        lundagNaruto:function(){
            player2.body.velocity.y = -200; 
            btnJump.frame = 1;

            setTimeout(function(){
                btnJump.frame = 0;
            },100);
        },
        goRight:function(){
                player2.animations.play('walk-right');
                player2.body.velocity.x = 300;

        },
        goLeft:function(){
                player2.animations.play('walk-left');
                player2.body.velocity.x = -300;
        }
    }
}();

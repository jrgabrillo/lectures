var process = function(){
    "use strict";
    return {
        collectDiamonds:function(player,diamonds){
            x = x+5;
            score.text = "Score: "+x;
            diamonds.kill();

            if(process.getScore()<=x){
                process.saveScore(x);
                hi.text = "HI: "+x;
            }
        },
        collectStars:function(player,star){
            star.kill();
            life.text = "BREAK NA TAYO!!! \nAYOKO NA!!!";
            game._paused = true;
        },
        createDiamonds:function(time){
            setInterval(function(){
                var size = Math.random();
                var diamonds = diamond.create(Math.random()*bounds,-100,'diamond');
                diamonds.body.gravity.y = 1000;
                diamonds.body.bounce.y = 0.6;

                diamonds.scale.x = size*2;
                diamonds.scale.y = size*2;
            },time)
        },
        createStars:function(time){
            setInterval(function(){
                var size = Math.random();
                var stars = star.create(Math.random()*bounds,-100,'star');
                stars.body.gravity.y = 800;
                stars.body.bounce.y = 0.2;

                stars.scale.x = size*2;
                stars.scale.y = size*2;
            },time)
        },
        saveScore:function(score){
            localStorage.setItem("gameData",score);
        },
        getScore:function(){
            return (localStorage.getItem("gameData") == null || localStorage.getItem("gameData") == "")?0:localStorage.getItem("gameData");
        },
        talonNaruto:function(){


            console.log("xx");

            // window.close();

            console.log(game);


            buttonLundag.frame = 1;
            if(player.body.touching.down){
                player.body.velocity.y = -speed;        
            }

            setTimeout(function(){
                buttonLundag.frame = 0;
            },100)
        },
        PlayPause:function(){
            buttonIkap.frame = 1;
            game._paused = true;

            setTimeout(function(){
                buttonIkap.frame = 0;
            },100);

            setTimeout(function(){
                game._paused = false;
            },3000);
        },
        countdownTimer:function(){
            setInterval(function(){
                time = time - 1;
                textTime.text = "Time na: "+time;
            },1000);
        }

    }
}();
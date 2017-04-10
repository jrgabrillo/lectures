var process = function(){
    "use strict";
    return {
        createDiamonds:function(time){
            setInterval(function(){
                diamonds = diamond.create(Math.random()*w,-100,"diamond");
                diamonds.body.gravity.y = 1000;
                var scale = Math.random();
                diamonds.scale.y = scale*2;
                diamonds.scale.x = scale*2;

                // diamonds.body.bounce.y = 0.2;
                // diamonds.body.collideWorldBounds = true;
            },time);
        },

        createStars:function(time){
            setInterval(function(){
                stars = star.create(Math.random()*w,-100,"star");
                stars.body.gravity.y = 1000;
                var scale = Math.random();
                stars.scale.y = scale*2;
                stars.scale.x = scale*2;

                // stars.body.bounce.y = 0.2;
                // stars.body.collideWorldBounds = true;
            },time);
        },

        killNaruto:function(player,diamond){
            score = score + 5;
            diamond.kill();

            if(process.getData()<=score){
                process.saveData(score);
                bestText.text = "Best: "+score;
                console.log("x");
            }
            else{
                console.log("x");
            }
            scoreText.text = "Score: "+score;
        },

        killStar:function(player,star){
            star.kill();
            game._paused = true;
            gameOverText.text = "Tapos Na.\nHi: "+process.getData()+"\nScores: "+score;
        },

        timer:function(initTime,microsec){
            setInterval(function(){
                initTime--;
                if(initTime>=0){        
                    timeText.text = "Time: "+initTime;
                }
                else{
                    game._paused = true;
                    gameOverText.text = "Tapos Na.\nHi: "+process.getData()+"\nScores: "+score;
                }
            },microsec);
        },
        saveData:function(score){
            localStorage.setItem("gameData",score);
        },

        getData:function(){
            return (localStorage.getItem("gameData") == null || localStorage.getItem("gameData") == "")?0:localStorage.getItem("gameData");
        },
        lundagNaruto:function(){
            setTimeout(function(){
                btn.frame = 0;
                game._paused = false;
            },3000);

            game._paused = true;
        }
    }
}();


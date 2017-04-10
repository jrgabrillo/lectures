var w = 800,h = 600;
var player, keyboard, diamond, diamonds, star, stars, platform, platforms, score = 0, scoreText, gameOverText, lifeText, life = 3, time, timeText, bestText, button_Lundag, button_Galaw;
var game = new Phaser.Game(w, h, Phaser.CANVAS, '');

var boundsRight = 12000;
var duration = 30;

var mambobola = function(){}
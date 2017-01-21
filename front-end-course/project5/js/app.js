'use strict';
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // reset to 0 the enemy from the start of the road
    if (this.x >= ctx.canvas.clientWidth) {
        this.x = 0;
    }

    // check if the player colids with the enemy
    this.checkColision();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkColision = function() {
    if (player.y + 130 >= this.y + 90 && player.x + 25 <= this.x + 90 &&
        player.y + 75 <= this.y + 135 && player.x + 75 >= this.x + 10) {
        console.log('Player collided with the enemy');
        player.reset();
        score = 0; // loses all points
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.initX = x;
    this.initY = y;
    this.speed = speed;

    // all avaliable sprites for the player
    this.chars = ['images/char-boy.png', 'images/char-cat-girl.png',
                  'images/char-horn-girl.png', 'images/char-pink-girl.png',
                  'images/char-princess-girl.png'];
    Resources.load(this.chars); // load the sprites
    this.currentImg = 0; // set the first sprite to "char-boy"

    this.sprite = this.chars[this.currentImg]; // apply the first sprite
    this.reset();
};

Player.prototype.update = function() {
    // prevent player to get out of the screen
    if (this.x > ctx.canvas.clientWidth - 90) {
        this.x = ctx.canvas.clientWidth - 90;
    }

    // player doesn't run out of the screen
    if (this.x < 0) {
        this.x = 0;
    }

    // player doesn't run out of the screen
    if (this.y > ctx.canvas.clientHeight - 170) {
        this.y = ctx.canvas.clientHeight - 170;
    }

    // check if player is on water and add +1 to score
    if (this.y <= 0) {
        score++;
        this.reset();
    }
};

// draw the player image and score text
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    displayScore(score);
};

// handle the inputs keys for player movement
Player.prototype.handleInput = function(key) {
    if (key == 'left') {
        this.x -= this.speed * 10;
    } else if (key == 'right') {
        this.x += this.speed * 10;
    } else if (key == 'up') {
        this.y -= this.speed * 10;
    } else if (key == 'down') {
        this.y += this.speed * 10;
    } else if (key == 'ctrl') {
        this.changeChar();
    }
    // console.log('Key pressed is: ' + key);
};

// reset for the inital location of the player
Player.prototype.reset = function() {
    this.x = this.initX;
    this.y = this.initY;
};

Player.prototype.changeChar = function() {
    if (this.currentImg + 1 < this.chars.length) {
        this.currentImg++;
    } else {
        this.currentImg = 0;
    }
    this.sprite = this.chars[this.currentImg];
};

// needs a <div id="score"></div> on the HTML for display
var displayScore = function(score) {
    var scoreHTML = document.getElementById('score');
    scoreHTML.innerHTML = "Player score: " + score;
};

// helper function for get an integer random number
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(200, 400, 1.5);
var allEnemies = [];
var score = 0;
for (var i = 0; i < 4; i++) {
    var enemy = new Enemy(getRandomInt(50, 230), getRandomInt(50, 230), getRandomInt(100, 300));
    allEnemies.push(enemy);
}

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        17: 'ctrl'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

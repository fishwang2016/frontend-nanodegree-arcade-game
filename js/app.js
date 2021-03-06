// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = -100;
    this.y = Math.floor(Math.random() * (4 - 1)) * 83 + 60;
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.random() * 2 + 1;
    this.center_x = this.x + 101 / 2.0;
    this.center_y = (this.y + 171 - 83 / 2.0);


};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x < 550) {
        this.x = this.x + this.speed * (dt + 1); //how to imput dt?
    } else { // resent enemy
        this.x = -100;
        this.y = Math.floor(Math.random() * (4 - 1)) * 83 + 60;
        this.speed = Math.random() * 3 + 1;
    }

    this.center_x = this.x + 101 / 2.0;
    this.center_y = this.y + 171 - 83 / 2.0;
    // console.log(player.center_y);

    var x_distance = Math.abs(this.center_x - player.center_x) <= 90;
    var y_distance = Math.abs(this.center_y - player.center_y) < 41.5;
    if (x_distance && y_distance) {
        player.x = 200;
        player.y = 400;
        lives = lives - 1;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 200;
    this.y = 400;
    this.center_x = this.x + 101 / 2.0;
    this.center_y = (this.y + 171 - 83 / 2.0);
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(keycode) {

    if (keycode === "left" && this.x > -2) {
        this.x = this.x - 101;
    } else if (keycode === "right" && this.x < 402) {
        this.x = this.x + 101;
    } else if (keycode === "up" && this.y > -15) {
        this.y = this.y - 83;
        if (this.y < 0) {
            ctx.strokeText("Good Job!", 210, 100);
            this.x = 200;
            this.y = 400;
            score = score + 100;
            if ((score % 500) === 0) {
                lives = lives + 1;
                levels = levels + 1;
            }
        }
    } else if (keycode === "down" && this.y < 400) {
        this.y = this.y + 83;
    }

};

Player.prototype.render = function() {

    this.center_x = this.x + 101 / 2.0;
    this.center_y = (this.y + 171 - 83 / 2.0);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.strokeStyle = "#FFEB3B";
    ctx.strokeText("SCORE: " + score, 10, 80);
    ctx.strokeText("LIVES: " + lives, 420, 80);
    ctx.strokeText("LEVELS: " + levels, 220, 80);


};

Player.prototype.handleInput = function(keycode) {
    this.update(keycode);
    // console.log(keycode);

};
var score = 0;
var lives = 10;
var levels = 1;

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var player = new Player();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
    // console.log(e.keyCode);
});
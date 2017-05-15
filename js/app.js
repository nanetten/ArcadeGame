var scr = 0; // Score value
var squareWidth = 101,
    squareHeight = 83;
// Simple function to determine the speed
function movX(speed) {
    var avg = 100;
    return avg * speed;
}
// Draws the score
function score() {
    ctx.font = "Bold 35px 'Ravi Prakash', cursive";
    ctx.fillStyle = '#5dbc25';
    ctx.fillText("Score: " + scr, 195, 30);
    console.log("yes");
}

var Character = function(x, y, imgUrl){
  this.x = x;
  this.y = y;
  this.sprite = imgUrl
}
// Enemy
var Enemy = function(x, y, speed) {
    var imgUrl = "images/enemy-bug.png";
    Character.call(this, x, y, imgUrl);
    this.move = movX(speed);
};
Enemy.prototype.constructor = Enemy;
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (dt < 0.5) { // Fix for rare bug that happens when you are in other tabs
        this.x += this.move * dt;
    }
    if (this.x > 505) { // Resets enemy position when its out of boundary
        this.x = -250;
    }
    if (player.x < this.x + 55 // Collision detection
        &&
        player.x + 55 > this.x &&
        player.y < this.y + 55 &&
        player.y + 55 > this.y) {
      player.reset();
    }
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Player
var Player = function(x, y) {
    var imgUrl = 'images/char-boy.png';
    Character.call(this, x, y, imgUrl);
};
Player.prototype.reset = function() {
    this.x = squareWidth*2;
    this.y = squareHeight*4.5;
};
Player.prototype.update = function(dt) {
    if (this.y < 0) { // Reset player position when it reaches the water
        this.reset();
        scr += 1; // Score value update
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    switch (keys) {
        case 'left':
            if (this.x > 0) {
                this.x -= squareWidth;
            }
            break;
        case 'up':
            this.y -= squareHeight;
            break;
        case 'right':
            if (this.x < 404) {
                this.x += squareWidth;
            }
            break;
        case 'down':
            if (this.y < 373.5) {
                this.y += squareHeight;
            }
            break;
    }
};
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var position1 = squareHeight/2;
var position2 = squareHeight*1.5;
var position3= squareHeight*2.5;
var allEnemies = [new Enemy(squareWidth*1, position1, 3.5), new Enemy(squareWidth*2.5, position1, 3.5), new Enemy(squareWidth*4, position1, 3.5), new Enemy(squareWidth*1, position2, 3), new Enemy(squareWidth*2, position2, 3),
  new Enemy(squareWidth*3, position2, 3), new Enemy(0, position3, 5)];
var player = new Player(squareWidth*2, squareHeight*4.5);
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
});

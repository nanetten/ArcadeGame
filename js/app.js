var scr = 0; // Score value
// Simple function to determine the speed
function movX(speed) {
    var avg = 75;
    return avg * speed;
}

// Set Player to initial coordinates
function reset() {
    player.x = 202;
    player.y = 384.75;
}
// Draws the score
function score() {
    ctx.font = "Bold 35px 'Ravi Prakash', cursive";
    ctx.fillStyle = '#5dbc25';
    ctx.fillText("Score: " + scr, 195, 30);
}

// Enemy
var Enemy = function(xpos, ypos, speed) {
    this.sprite = 'images/enemy-bug.png';
    this.x = xpos;
    this.y = ypos;
    this.move = movX(speed);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    if (dt < 1) { // Fix for rare bug that happens when you are in other tabs
        this.x += this.move * dt;
    }
    if (this.x > 505) { // Resets enemy position when its out of boundary
        this.x = -100;
    }

    if (player.x < this.x + 55 // Collision detection
        &&
        player.x + 55 > this.x &&
        player.y < this.y + 55 &&
        player.y + 55 > this.y) {
        reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 384.75;
};

Player.prototype.update = function(dt) {
    if (this.y < 0) { // Reset player position when it reaches the water
        reset();
        scr += 1 // Score value update
    }
    // Set player position to previous position whenever it tries to get out boundaries
    if (this.x < 0) {
        this.x = this.x + 101;
    }
    if (this.x > 404) {
        this.x = this.x - 101;
    }
    if (this.y >= 470.25) {
        this.y = this.y - 85.5;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keys) {
    var mY = 85.5; // Player movement through x coordinates
    var mX = 101; // Player movement through y coordinates
    switch (keys) {
        case 'left':
            this.x -= mX;
            break;
        case 'up':
            this.y -= mY;
            break;
        case 'right':
            this.x += mX;
            break;
        case 'down':
            this.y += mY;
            break;
    }
};

// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy(0, 42.75, 3), new Enemy(150, 42.75, 3), new Enemy(300, 42.75, 3), new Enemy(0, 128.25, 6),
    new Enemy(0, 213.75, 1), new Enemy(150, 213.75, 1), new Enemy(300, 213.75, 1)
];
var player = new Player;

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

function randomRanges(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var lastRandom = [];

// function getY() {
//     if (lastRandom.length == 3) {
//         lastRandom.length = 0;
//     }
//     do {
//         var random = randomRanges(0, 2);
//     }
//     while (lastRandom.includes(random));
//     lastRandom.push(random);
//     if (random == 0) {
//         return 42.75 * ((Math.pow(2, random)));
//     } else {
//         return 42.75 * (1 + (Math.pow(2, random)));
//     }
// }


function movX(speed) {
    var avg = 100;
    return avg * speed;
}
function reset() {
    player.x = 202;
    player.y = 384.75;
}


// ENEMIES

var Enemy = function(xpos, ypos, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = xpos;

    this.y = ypos;
    this.move = movX(speed);
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.move * dt;
    console.log(this.x)
    if (this.x >= 505) {
        this.x = -100;
    }

    if (player.x < this.x + 40
      && player.x  + 40 > this.x
      && player.y < this.y + 85.5
      && player.y + 85.5 > this.y) {
        reset();
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
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 384.75;
};
// var score = 0;
Player.prototype.update = function(dt) {
    if (this.y < 42.75) {
        reset();
        // score += 1
        // console.log(score);
    }
    if (this.x < 0){
      this.x = this.x + 101;
    }
    if (this.x > 404){
        this.x = this.x - 101;
    }
    if (this.y >= 470.25){
        this.y = this.y - 85.5;
    }
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.handleInput = function(keys) {
    var mY = 85.5;
    var mX = 101;
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
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(0, 42.75, 3.5), new Enemy(150, 42.75, 3.5), new Enemy(-150,42.75,3.5), new Enemy(0, 128.25,2),  new Enemy(-350, 128.25,2),
  new Enemy(0, 213.75,1.5), new Enemy(150, 213.75,1.5), new Enemy(300, 213.75,1.5)];
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

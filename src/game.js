const Maze = require('./maze');
const Sprite = require('./sprite');

class Game {

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.newGame = false;

        // adding starting ladder location to this
        this.maze = new Maze(this.ctx);
        // console.log(this.maze.last[1], this.maze.last[0]);
        const playerImage = new Image();
        playerImage.src = "../sprite_sheets/indianajones_whip.png";
        this.player = new Sprite({
            ctx: this.ctx,
            width: 32,
            height: 48,
            speed: 2,
            image: playerImage,
            hWalls: this.maze.hWallsHash,
            vWalls: this.maze.vWallsHash,
            dx: 27,
            dy: 23
        });

        const clownImage = new Image();
        clownImage.src = "../sprite_sheets/clown.png";
        this.clown = new Sprite({
            ctx: this.ctx,
            width: 48,
            height: 64,
            speed: 1,
            image: clownImage,
            dx: 19,
            dy: 1
        });

        this.keys = {};
        this.count = 0;

        window.addEventListener('keydown', e => {
            this.keys[e.keyCode] = true;
        });

        window.addEventListener('keyup', e => {
            this.keys[e.keyCode] = false;
        });

        window.requestAnimationFrame(this.animate.bind(this));

        window.setTimeout(this.rotate.bind(this), 3000);
    }

    rotate() {
        let p = Math.PI/2;
        let rad = [-2*p, -p, p, 2*p][Math.floor(Math.random()*4)];
        this.player.targetRad = rad;
        this.clown.targetRad = rad;
        this.maze.targetRad = rad;
        window.setTimeout(this.rotate.bind(this), 10000);
    }

    animate() {
        this.count++;
        this.ctx.clearRect(0,0,778,778);
        // this.ctx.fillRect(this.maze.last[1] - 45 + 25, 40, this.maze.last[0] - 45 + 25, 40);
        this.player.move(this.keys);
        this.maze.drawMaze();
        this.player.render();
        if (this.count > 100) {
            this.clown.clownMove(this.maze.correctPath);
            this.clown.render();
            if (this.clown.collide(this.player.dx, this.player.width, this.player.dy, this.player.height)) {
                console.log('YOURE DEAD');
            } else if (this.player.collide(this.maze.last[1]-45+25, 40, this.maze.last[0]-45+25, 40)){
                // console.log(this.maze.last[1]-50, this.maze.last[0]-50);
                console.log('You made it');
                this.newGame = true;
            }
        }
        if (this.newGame) {
            this.newGame = false;
            this.maze = new Maze(this.ctx);
            this.player.reset({hWalls: this.maze.hWallsHash, vWalls: this.maze.vWallsHash});
            this.clown.reset({});
        }
        window.requestAnimationFrame(this.animate.bind(this));
    }
}


module.exports = Game;
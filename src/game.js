const Maze = require('./maze');
const Sprite = require('./sprite');

class Game {

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.maze = new Maze(this.ctx);

        const playerImage = new Image();
        playerImage.src = "../sprite_sheets/indianajones_whip.png";
        this.player = new Sprite({
            ctx: this.ctx,
            width: 32,
            height: 48,
            image: playerImage,
            hWalls: this.maze.hWallsHash,
            vWalls: this.maze.vWallsHash
        });

        this.keys = {};

        window.addEventListener('keydown', e => {
            this.keys[e.keyCode] = true;
        });

        window.addEventListener('keyup', e => {
            this.keys[e.keyCode] = false;
        });

        window.requestAnimationFrame(this.animate.bind(this));

        window.setTimeout(this.rotate.bind(this), 3000)
    }

    rotate() {
        let p = Math.PI/2;
        let rad = [-2*p, -p, p, 2*p][Math.floor(Math.random()*4)];
        this.player.targetRad = rad;
        this.maze.targetRad = rad;
        window.setTimeout(this.rotate.bind(this), 10000);
    }

    animate() {
        this.ctx.clearRect(0,0,550,550);
        this.player.update(this.keys);
        this.maze.drawMaze();
        this.player.render();
        window.requestAnimationFrame(this.animate.bind(this));
    }
}


module.exports = Game;
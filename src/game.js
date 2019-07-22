const Maze = require('./maze');
const Sprite = require('./sprite');

class Game {

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.newGame = false;
        this.level = 200;



        let rotationSpeed = 800 - 50 * (this.level - 1);
        rotationSpeed = rotationSpeed < 60 ? 60 : rotationSpeed;
        // adding starting ladder location to this
        this.maze = new Maze(this.ctx, rotationSpeed);
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
            dy: 23,
            rotationSpeed
        });

        let clownSpeed = 1 + (this.level - 1) / 10;
        clownSpeed = clownSpeed > 2.5 ? 2.5 : clownSpeed;

        const clownImage = new Image();
        clownImage.src = "../sprite_sheets/clown.png";
        this.clown = new Sprite({
            ctx: this.ctx,
            width: 48,
            height: 64,
            speed: clownSpeed,
            image: clownImage,
            dx: 19,
            dy: 1,
            rotationSpeed
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

        let rotateTiming = 5000 - 400 * (this.level - 1);
        rotateTiming = rotateTiming < 500 ? 500 : rotateTiming;
        this.rotateTimeout = window.setTimeout(this.rotate.bind(this), rotateTiming);

    }

    rotate() {
        let p = Math.PI/2;
        let rad = [-2*p, -p, p, 2*p][Math.floor(Math.random()*4)];
        this.player.targetRad = rad;
        this.clown.targetRad = rad;
        this.maze.targetRad = rad;
        clearTimeout(this.rotateTimeout);
        let rotateTiming = 7000 - 500 * (this.level - 1);
        rotateTiming = rotateTiming < 250 ? 250 + Math.floor(1000 * Math.random()) : rotateTiming + Math.floor(2000 * Math.random());
        this.rotateTimeout = window.setTimeout(this.rotate.bind(this), rotateTiming);
    }

    animate() {
        window.requestAnimationFrame(this.animate.bind(this));
        this.count++;
        this.ctx.clearRect(0,0,778,778);
        this.player.move(this.keys);
        this.maze.drawMaze();
        this.player.render();
        let delay = 150 - 10 * (this.level - 1);
        delay = delay < 30 ? 30 : delay;
        if (this.count > delay) {
            this.clown.clownMove(this.maze.correctPath);
            this.clown.render();
            if (this.clown.collide(this.player.dx, this.player.width, this.player.dy, this.player.height)) {
                console.log(`You made it to level ${this.level}`);
            } else if (this.player.collide(this.maze.last[1]-45+25, 40, this.maze.last[0]-45+25, 30)){
                this.newGame = true;
            }
        }
        if (this.newGame) {
            this.newGame = false;
            this.level++;
            this.count = 0;
            let rotationSpeed = 800 - 50 * (this.level - 1);
            rotationSpeed  = rotationSpeed < 60 ? 60 : rotationSpeed;
            this.maze = new Maze(this.ctx, rotationSpeed);
            this.player.reset({ hWalls: this.maze.hWallsHash, vWalls: this.maze.vWallsHash, rotationSpeed });
            let clownSpeed = 1 + (this.level - 1) / 10;
            clownSpeed = clownSpeed > 2.5 ? 2.5 : clownSpeed;
            this.clown.reset({ clownSpeed, rotationSpeed });
            clearTimeout(this.rotateTimeout);
            this.rotateTimeout = window.setTimeout(this.rotate.bind(this), 5000 - 400 * (this.level - 1));
        }
        // window.requestAnimationFrame(this.animate.bind(this));
    }
}


module.exports = Game;
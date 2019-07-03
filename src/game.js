const Maze = require('./maze');
const Sprite = require('./sprite');

class Game {

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.maze = new Maze(this.ctx);

        const playerImage = new Image();
        playerImage.src = "../sprite_sheets/indianajones_whip.png";
        // playerImage.width = 128;
        // playerImage.height = 192;
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
            // console.log(e.keyCode)
            // this.player.move(e.keyCode);
            this.keys[e.keyCode] = true;
        })

        window.addEventListener('keyup', e => {
            // console.log(e.keyCode)
            // this.player.move(e.keyCode);
            this.keys[e.keyCode] = false;
        })
        // this.drawMaze();
        // playerImage.onload = () => {
            // player.render();
            // this.ctx.drawImage(playerImage,0,0);
            window.requestAnimationFrame(this.animate.bind(this));
        // }
    }

    animate() {
        this.ctx.clearRect(0,0,550,550)
        this.player.update(this.keys);
        this.drawMaze3();
        this.player.render();
        window.requestAnimationFrame(this.animate.bind(this));
    }

    drawMaze2() {
        this.ctx.beginPath();
        for (let l of this.maze.hWallsArray) {
            // console.log(l[0],l[1]);
            this.ctx.moveTo(l[1] * 50 + 25, (l[0] + 1) * 50 + 25);
            this.ctx.lineTo((l[1] + 1) * 50 + 25, (l[0] + 1) * 50 + 25);
        }
        // console.log('verts')
        for (let l of this.maze.vWallsArray) {
            // console.log(l[0],l[1]);
            this.ctx.moveTo((l[1] + 1) * 50 + 25, l[0] * 50 + 25);
            this.ctx.lineTo((l[1] + 1) * 50 + 25, (l[0] + 1) * 50 + 25);
        }
        // this.ctx.stroke();
        // this.ctx.beginPath();

        for (let i = 0; i < 10; i++) {
            this.ctx.moveTo(25, i * 50 + 25);
            this.ctx.lineTo(25, (i + 1) * 50 + 25);

            this.ctx.moveTo(i * 50 + 25, 25);
            this.ctx.lineTo((i + 1) * 50 + 25, 25);
        }
        this.ctx.stroke();
    }

    drawMaze() {
        // let drawer = 
        this.ctx.beginPath();
        for (let y of Object.keys(this.maze.hWallsHash)) {
            for (let x of this.maze.hWallsHash[y]) {
                this.ctx.moveTo(x[0], y);
                this.ctx.lineTo(x[1], y);
            }
        }

        for (let x of Object.keys(this.maze.vWallsHash)) {
            for (let y of this.maze.vWallsHash[x]) {
                this.ctx.moveTo(x, y[0]);
                this.ctx.lineTo(x, y[1]);
            }
        }
        this.ctx.stroke();
    }

    drawMaze3() {
        // let drawer = 
        this.ctx.beginPath();
        // let i = 0;
        this.maze.rotateRad -= Math.PI/800;
        this.maze.rotateClockwiseBit();
        for (let c of this.maze.transitionWalls) {


            this.ctx.moveTo(c[0][0], c[0][1]);
            this.ctx.lineTo(c[1][0], c[1][1]);
            // if (i % 2 == 0) {
            //     this.ctx.moveTo(c[0], c[1]);
            // } else {
            //     this.ctx.lineTo(c[0], c[1]);
            // }
            // i ++;
        }
        this.ctx.stroke();
    }

}





module.exports = Game;
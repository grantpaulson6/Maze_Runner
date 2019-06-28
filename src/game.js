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
        this.drawMaze();
        this.player.render();
        window.requestAnimationFrame(this.animate.bind(this));
    }
    drawMaze() {
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

}





module.exports = Game;
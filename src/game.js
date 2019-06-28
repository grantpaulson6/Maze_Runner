const Maze = require('./maze');
const Sprite = require('./sprite');

class Game {

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        // this.maze = new Maze(this.ctx);

        const playerImage = new Image();
        // playerImage.src = "https://cdn.pixabay.com/photo/2014/01/05/01/19/dragon-238931__340.jpg";
        playerImage.src = "../sprite_sheets/indianajones_whip.png";
        // playerImage.width = 128;
        // playerImage.height = 192;
        // document.getElementById('test').appendChild(playerImage);
        // const player = new Sprite({
        //     ctx: this.ctx,
        //     width: 50,
        //     height: 50,
        //     image: playerImage
        // });
        // this.drawMaze();
        // player.render();
        playerImage.onload = () => {

            this.ctx.drawImage(playerImage,0,0);
        }
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
const Maze = require('./maze');

class Game {

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.maze = new Maze(this.ctx);

        this.ctx.beginPath();
        for (let l of this.maze.hWallsArray) {
            // console.log(l[0],l[1]);
            this.ctx.moveTo(l[1]*50+25,(l[0]+1)*50+25);
            this.ctx.lineTo((l[1]+1)*50+25,(l[0]+1)*50+25);
        }
        // console.log('verts')
        for (let l of this.maze.vWallsArray) {
            // console.log(l[0],l[1]);
            this.ctx.moveTo((l[1]+1)*50+25,l[0]*50+25);
            this.ctx.lineTo((l[1]+1)*50+25,(l[0]+1)*50+25);
        }
        this.ctx.stroke();
    }


}

module.exports = Game;


class Sprite {

    constructor(options) {
        this.ctx = options.ctx;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.hWalls = options.hWalls;
        this.vWalls = options.vWalls;
        this.sx = 0;
        this.sy = 0;
        this.dx = 25;
        this.dy = 25;
        this.m = 0;
        // this.oreintation('l');
        this.tickCount = 0;
        this.speed = 2;
    }

    update(keys) {
        this.move(keys);
        // this.tickCount += 1
        // if (this.tickCount > 10) {
        //     this.tickCount = 0
        //     this.sx += this.width;
        //     if (this.sx == this.width * 4) this.sx = 0;
        // }
    }

    move(keys) {
        this.tickCount += 1
        if (keys[38]) {
            if (this.m != 3) {
                this.m = 3;
                this.sy = this.m * this.height;
            }
            this.dy -= this.speed;
            this.checkWall('u');
        }
        if (keys[39]) {
            if (this.m != 2) {
                this.m = 2;
                this.sy = this.m * this.height;
            }
            // if (this.dx != 200) {
                this.dx += this.speed;
                this.checkWall('r');
                // }
            }
            
            if (keys[40]) {
                if (this.m != 0) {
                    this.m = 0;
                    this.sy = this.m * this.height;
                }
                this.dy += this.speed;
                this.checkWall('d');
            }
            
            if (keys[37]) {
                if (this.m != 1) {
                    this.m = 1;
                    this.sy = this.m * this.height;
                }
                this.dx -= this.speed;                               
                this.checkWall('l');
        }

        if (keys[37] || keys[38] || keys[39] || keys[40]) {
            if (this.tickCount > 8) {
                this.tickCount = 0;
                this.sx += this.width;
                if (this.sx == this.width * 4) this.sx = 0;
            }
        } else {
            // standing position when not moving
            if (this.width * 4 % this.sx % 2 == 0) this.sx = 0;
        }
        // debugger
        // this.checkWall();
    }

    checkWall(d) {
        // debugger
        console.log(this.dx)
        switch (d) {
            case 'r':
                if (this.vWalls[this.dx+this.width]) {
                    for (let wx of this.vWalls[this.dx + this.width]) {
                        if (this.dy+this.height >= wx[0] && this.dy+this.height <= wx[1]) {
                            this.dx -= this.speed;
                        }
                    }
                }
                return;
            case 'l':
                if (this.vWalls[this.dx]) {
                    for (let wx of this.vWalls[this.dx]) {
                        if (this.dy+this.height >= wx[0] && this.dy+this.height <= wx[1]) {
                            this.dx += this.speed;
                        }
                    }
                }
                return;
            case 'u':
                if (this.hWalls[this.dy+ this.height]) {
                    for (let wy of this.hWalls[this.dy + this.height]) {
                        if (this.dx+this.width >= wy[0] && this.dx <= wy[1]) {
                            this.dy += this.speed;
                        }
                    }
                }
                return;
            case 'd':
                if (this.hWalls[this.dy + this.height]) {
                    for (let wy of this.hWalls[this.dy + this.height]) {
                        if (this.dx + this.width >= wy[0] && this.dx <= wy[1]) {
                            this.dy -= this.speed;
                        }
                    }
                }
                return;
        }
    }

    render() {
        // console.log('here')
        // this.ctx.rect(10,10,60,60);
        // this.ctx.fill();
        // document.getElementById('test').appendChild(this.image);
        // let image = this.image;
        this.ctx.drawImage(
            this.image,
            this.sx,
            this.sy,
            this.width,
            this.height,
            this.dx,
            this.dy,
            this.width,
            this.height
        );
    }
}

module.exports = Sprite;
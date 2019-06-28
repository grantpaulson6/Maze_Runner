

class Sprite {

    constructor(options) {
        this.ctx = options.ctx;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;

        this.sx = 0;
        this.sy = 0;
        this.dx = 0;
        this.dy = 0;
        this.m = 0;
        // this.oreintation('l');
        this.tickCount = 0;
        this.speed = 1.5;
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
        }
        if (keys[39]) {
            if (this.m != 2) {
                this.m = 2;
                this.sy = this.m * this.height;
            }
            this.dx += this.speed;
        }

        if (keys[40]) {
            if (this.m != 0) {
                this.m = 0;
                this.sy = this.m * this.height;
            }
            this.dy += this.speed;
        }

        if (keys[37]) {
            if (this.m != 1) {
                this.m = 1;
                this.sy = this.m * this.height;
            }
            this.dx -= this.speed;                               
        }

        if (keys[37] || keys[38] || keys[39] || keys[40]) {
            if (this.tickCount > 8) {
                this.tickCount = 0;
                this.sx += this.width;
                if (this.sx == this.width * 4) this.sx = 0;
            }
        } else {
            if (this.width * 4 % this.sx % 2 == 0) {
                this.sx = 0;
            }
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
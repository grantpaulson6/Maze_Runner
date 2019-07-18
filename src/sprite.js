

class Sprite {

    constructor(options) {
        this.ctx = options.ctx;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
        this.hWalls = options.hWalls;
        this.vWalls = options.vWalls;
        this.path =  options.path;
        this.speed = options.speed;

        this.sx = 0;
        this.sy = 0;
        this.dx = options.dx;
        this.dy = options.dy;
        this.dxR = options.dx;
        this.dyR = options.dy;
        this.m = 0;

        //clown thing
        this.location = 1;


        this.tickCount = 0;
        this.rotateRad = 0;
        this.targetRad = 0;
        this.offset = 113.91;
    }

    move(keys) {
        this.tickCount += 1;
    

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

        
        if (keys[38]) {
            if (this.m != 3) {
                this.m = 3;
            }
            this.dy -= this.speed;
            if (this.checkPoint()) this.dy += this.speed;
            else this.checkWall('u');
        }
        if (keys[39]) {
            if (this.m != 2) {
                this.m = 2;
            }
            this.dx += this.speed;
            if (this.checkPoint()) this.dx -= this.speed;
            else this.checkWall('r');
        }
            
        if (keys[40]) {
            if (this.m != 0) {
                this.m = 0;
            }
            this.dy += this.speed;
            if (this.checkPoint()) this.dy -= this.speed;
            else this.checkWall('d');
        }
        
        if (keys[37]) {
            if (this.m != 1) {
                this.m = 1;
            }
            this.dx -= this.speed;       
            if (this.checkPoint()) this.dx += this.speed;                        
            else this.checkWall('l');
        }
        this.sy = this.orientate() * this.height;
    }

    clownMove(path) {
        if (!this.path) {
            this.path = path;
            this.deltaY = this.path[this.location][0] - this.path[this.location - 1][0];
            this.deltaX = this.path[this.location][1] - this.path[this.location - 1][1];
        }
        this.tickCount += 1;

        if (this.tickCount % 10 == 0) {
            this.sx += this.width;
            if (this.sx == this.width * 4) this.sx = 0;
        }

        if (this.tickCount == 51) {
            this.tickCount = 1;
            this.location++;
            this.deltaY = this.path[this.location][0] - this.path[this.location - 1][0];
            this.deltaX = this.path[this.location][1] - this.path[this.location - 1][1];
        }

        this.dx += this.deltaX;
        this.dy += this.deltaY;

        if (this.deltaY == -1 && this.m != 3) {
            this.m = 3;
        } else if (this.deltaX == 1 && this.m != 2) {
            this.m = 2;
        } else if (this.deltaY == 1 && this.m != 0) {
            this.m = 0;
        } else if (this.deltaX == -1 && this.m != 1) {
            this.m = 1;
        }

        this.sy = this.orientate() * this.height;

    }

    orientate() {
        let dir = [0,2,3,1];
        let offset = Math.floor(2* ((this.rotateRad+Math.PI/4) % (Math.PI *2))/ Math.PI);
        switch(this.m) {
            case 1:
                return dir[(3+offset >= 0 ? 3 + offset : 4 + 3 + offset) % 4];
            case 0:
                return dir[(offset >= 0 ? offset : 4 + offset) % 4];
            case 2:
                return dir[(1 + offset >= 0 ? 1 + offset : 4 + 1 + offset) % 4];
            case 3:
                return dir[(2 + offset >= 0 ? 2 + offset : 4 + 2 + offset) % 4];
        }
    }

    checkPoint() {
        let gridX1 = (this.dx + 8 - 25) / 50;
        let gridX2 = (this.dx + this.width - 8 - 25) / 50;
        let gridY1 = (this.dy + this.height - 16 - 25) / 50;
        let gridY2 = (this.dy + this. height - 25) / 50;
        return Math.floor(gridY2) === Math.ceil(gridY1) && Math.floor(gridX2) === Math.ceil(gridX1);
    }

    checkWall(d) {
        switch (d) {
            case 'r':
                if (this.vWalls[this.dx+this.width - 8]) {
                    for (let wx of this.vWalls[this.dx + this.width - 8]) {
                        if ((this.dy+this.height >= wx[0] && this.dy+this.height <= wx[1])||
                            (this.dy + this.height - 16 >= wx[0] && this.dy + this.height - 16 <= wx[1])) {
                            this.dx -= this.speed;
                        }
                    }
                }
                return;
            case 'l':
                if (this.vWalls[this.dx + 8]) {
                    for (let wx of this.vWalls[this.dx + 8]) {
                        if ((this.dy + this.height >= wx[0] && this.dy + this.height <= wx[1]) ||
                            (this.dy + this.height - 16 >= wx[0] && this.dy + this.height - 16 <= wx[1])) {
                            this.dx += this.speed;
                        }
                    }
                }
                return;
            case 'u':
                if (this.hWalls[this.dy+ this.height - 16]) {
                    for (let wy of this.hWalls[this.dy + this.height - 16]) {
                        if ((this.dx+this.width - 8 >= wy[0] && this.dx + this.width - 8 <= wy[1]) ||
                            (this.dx + 8 >= wy[0] && this.dx + 8 <= wy[1])) {
                            this.dy += this.speed;
                        }
                    }
                }
                return;
            case 'd':
                if (this.hWalls[this.dy + this.height]) {
                    for (let wy of this.hWalls[this.dy + this.height]) {
                        if ((this.dx + this.width - 8 >= wy[0] && this.dx + this.width - 8 <= wy[1]) ||
                            (this.dx + 8 >= wy[0] && this.dx + 8 <= wy[1])) {
                            this.dy -= this.speed;
                        }
                    }
                }
                return;
        }
    }

    rotate(rad) {
        let yi = this.dy - 275 + this.height - 8;
        let xi = this.dx - 275 + this.width/2;
        if (xi == 0) xi = 0.00000001;
        let theta = Math.atan2(yi, xi) - rad;
        let r = Math.sqrt(xi ** 2 + yi ** 2);

        yi = r * Math.sin(theta);
        xi = r * Math.cos(theta);

        this.dyR = yi + 275 - this.height + 10;
        this.dxR = xi + 275 - this.width/2;
    }

    render() {
        this.rotate(this.rotateRad);
        if (this.rotateRad.toFixed(6) != this.targetRad.toFixed(6)) {
            if (this.rotateRad > this.targetRad) {
                this.rotateRad -= Math.PI / 800;
            } else {
                this.rotateRad += Math.PI / 800;
            }
        }
        this.ctx.drawImage(
            this.image,
            this.sx,
            this.sy,
            this.width,
            this.height,
            this.dxR + this.offset,
            this.dyR + this.offset,
            this.width,
            this.height
        );
    }
}

module.exports = Sprite;
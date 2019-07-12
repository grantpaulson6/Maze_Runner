const Node = require('./node');

class Maze {
    
    constructor(ctx) {
        this.ctx = ctx;
        
        this.hWalls = new Set();
        this.vWalls = new Set();
        this.offset = 113.91;

        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                this.hWalls.add(r + "" + c);
                this.vWalls.add(r + "" + c);
            }
        }

        this.ladderImage = new Image();
        this.ladderImage.src = "../sprite_sheets/ladder.png";

        this.rootNode = new Node(0,0);
        const visited = new Set();

        // this.pos = [25,25];
        // this.ctx.rect(this.pos[0], this.pos[1], 50, 50);
        // this.ctx.fill();

        this.d = 0;
        this.last = [];
        this.nextNode(this.rootNode, visited,0);
        console.log(this.last);
        this.last[0] = this.last[0]*50+25+this.offset;
        this.last[1] = this.last[1]*50+25+this.offset;
        
        this.hWallsArray = [];
        this.vWallsArray = [];
        this.hWallsHash = {};
        this.vWallsHash = {};
        let vert;
        let hori;
        for (let v of this.hWalls.values()) {
            v = v.split('').map(e => parseInt(e));
            this.hWallsArray.push(v);
            vert = (v[0]+1)*50+25;
            hori = [v[1]*50 + 25, (v[1]+1)*50 + 25];
            if (this.hWallsHash[vert]) {
                this.hWallsHash[vert].push(hori);
            } else {
                this.hWallsHash[vert] = [hori];
            }
        }
        for (let v of this.vWalls.values()) {
            v = v.split('').map(e => parseInt(e));
            this.vWallsArray.push(v);
            vert = [v[0] * 50 + 25, (v[0] + 1) * 50 + 25];
            hori = (v[1] + 1) * 50 + 25;
            if (this.vWallsHash[hori]) {
                this.vWallsHash[hori].push(vert);
            } else {
                this.vWallsHash[hori] = [vert];
            }
        }

        this.vWallsHash[25] = []
        this.hWallsHash[25] = []
        for (let i = 0; i < 10; i++) {
            this.vWallsHash[25].push([25 + 50 * i, 25 + 50 * (i + 1)]);
            this.hWallsHash[25].push([25 + 50 * i, 25 + 50 * (i + 1)]);
        }

        // left and top outer walls need to be added

        
        // console.log(this.vWallsArray.length,this.hWallsArray.length)
        // console.log(this.last);
        this.rotateRad = 0;
        this.targetRad = 0;
        // this.rotateClockwiseBit(this.rotateRad);
        // this.rotateClockwiseBit(Math.PI/8);
    }

    nextNode(node, visited,d) {
        d++;
        if (d > this.d) {
            this.d = d;
            this.last = [node.r,node.c];
        }
        // window.setTimeout(()=>{

            // this.ctx.rect(pos[1], pos[0], 50, 50);
            // this.ctx.fill();
            
            visited.add(node.r +""+ node.c);
            const neighbors = this.neighbors(node, visited);
            this.shuffleArray(neighbors);
            neighbors.forEach( n => {
                if (!visited.has(n.r+""+n.c)) {
                    if (n.d == 'd') {
                        this.hWalls.delete(node.r + "" + node.c);
                    } else if (n.d == 'u') {
                        this.hWalls.delete(n.r + "" +  n.c);
                    } else if (n.d == 'r') {
                        this.vWalls.delete(node.r + "" +  node.c);
                    } else if (n.d == 'l') {
                        this.vWalls.delete(n.r + "" +  n.c);
                    }
                    node.next.push(n);
                    // window.setTimeout(() => this.nextNode(n, visited).bind(this), 200);
                    this.nextNode(n, visited, d);
                }
            });
        // },200)
    }

    neighbors(node, visited) {
        const neighs = [];
        if (node.r + 1 < 10 && !visited.has(node.r + 1 +""+node.c)) {
            neighs.push(new Node(node.r+1, node.c, 'd'));
        }
        if (node.c + 1 < 10 && !visited.has(node.r +""+(node.c + 1))) {
            neighs.push(new Node(node.r, node.c + 1, 'r'));
        } 
        if (node.r - 1 >= 0 && !visited.has(node.r - 1 +""+ node.c)) {
            neighs.push(new Node(node.r - 1, node.c, 'u'));
        } 
        if (node.c - 1 >= 0 && !visited.has(node.r+""+ (node.c - 1))) {
            neighs.push(new Node(node.r, node.c - 1, 'l'));
        }
        return neighs;
    }

    shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    rotateClockwise() {
        this.vWallsHash2 = {};
        this.hWallsHash2 = {};
        for (let y of Object.keys(this.hWallsHash)) {
            for (let x of this.hWallsHash[y]) {
                if (this.vWallsHash2[525-y]) {
                    this.vWallsHash2[525 - y].push(x);
                } else {
                    this.vWallsHash2[525 - y] = [x];
                }
            }
        }
        for (let x of Object.keys(this.vWallsHash)) {
            for (let y of this.vWallsHash[x]) {
                if (this.hWallsHash2[x]) {
                    this.hWallsHash2[x].push(y.map(e=>525-e));
                } else {
                    this.hWallsHash2[x] = [y.map(e => 525 - e)];
                }
            }
        }
    }

    rotateClockwiseBit() {
        this.transitionWalls = [];
        let theta;
        let r;
        for (let y of Object.keys(this.hWallsHash)) {
            for (let ax of this.hWallsHash[y]) {
                let wall = []
                ax.forEach( x => {
                    let yi = y - 275;
                    let xi = x - 275;
                    if (xi == 0) xi = 0.00000001;
                    theta = Math.atan2(yi,xi) - this.rotateRad;
                    r = Math.sqrt(xi**2 + yi**2);
    
                    yi = r * Math.sin(theta);
                    xi = r * Math.cos(theta);

                    xi += 275;
                    yi += 275;
    
                    wall.push([xi,yi]);
                });
                this.transitionWalls.push(wall);
            }
        }
        for (let x of Object.keys(this.vWallsHash)) {
            for (let y of this.vWallsHash[x]) {
                let wall = [];
                y.forEach( yi => {
                    let xi = x - 275;
                    if (xi == 0) xi = 0.00000001;
                    yi -= 275;
                    let theta = Math.atan2(yi,xi) - this.rotateRad;
                    let r = Math.sqrt(yi**2 + xi**2);
    
                    yi =  r * Math.sin(theta);
                    xi = r * Math.cos(theta);

                    xi += 275;
                    yi += 275;
                    wall.push([xi, yi]);
                });
                this.transitionWalls.push(wall);
            }
        }
    }

    drawMaze() {
        this.ctx.beginPath();
        if (this.rotateRad.toFixed(6) != this.targetRad.toFixed(6)) {
            if (this.rotateRad > this.targetRad) {
                this.rotateRad -= Math.PI / 800;
            } else {
                this.rotateRad += Math.PI / 800;
            }
        }
        this.rotateClockwiseBit();
        for (let c of this.transitionWalls) {
            this.ctx.moveTo(c[0][0] + this.offset, c[0][1] + this.offset);
            this.ctx.lineTo(c[1][0] + this.offset, c[1][1] + this.offset);
        }
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(275 + this.offset, 275 + this.offset, 250 + this.offset, 0, 2 * Math.PI);
        this.ctx.stroke();
        this.drawTriangle();
        this.drawLadder();
    }

    drawTriangle() {
        let x1 = 0;
        let y1 = - 275 - 50;
        let x2 = - 50;
        let y2 = - 275;
        let x3 = + 50;
        let y3 = - 275;

        let [xa, ya] = this.rotatePoint(x1, y1);
        let [xb, yb] = this.rotatePoint(x2, y2);
        let [xc, yc] = this.rotatePoint(x3, y3);

        this.ctx.beginPath();
        this.ctx.moveTo(xa + this.offset, ya + this.offset);
        this.ctx.lineTo(xb + this.offset, yb + this.offset);
        this.ctx.lineTo(xc + this.offset, yc + this.offset);
        this.ctx.lineTo(xa + this.offset, ya + this.offset);
        this.ctx.fill();
    }

    drawLadder() {

        this.ctx.drawImage(
            this.ladderImage,
            0,
            0,
            64,
            64,
            this.last[1]-7,
            this.last[0]-20,
            64,
            64
        );
    }

    rotatePoint(xi,yi) {
        if (xi == 0) xi = 0.00000001;
        let theta = Math.atan2(yi, xi) - this.rotateRad;
        let r = Math.sqrt(xi ** 2 + yi ** 2);

        yi = r * Math.sin(theta);
        xi = r * Math.cos(theta);

        xi += 275;
        yi += 275;
        return [xi, yi];
    }
}

module.exports = Maze;
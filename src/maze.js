const Node = require('./node');

class Maze {
    
    constructor(ctx) {
        this.ctx = ctx;
        
        this.hWalls = new Set();
        this.vWalls = new Set();

        for (let r = 0; r < 10; r++) {
            for (let c = 0; c < 10; c++) {
                this.hWalls.add(r + "" + c);
                this.vWalls.add(r + "" + c);
            }
        }

        this.rootNode = new Node(0,0);
        const visited = new Set();

        // this.pos = [25,25];
        // this.ctx.rect(this.pos[0], this.pos[1], 50, 50);
        // this.ctx.fill();

        this.d = 0;
        this.last = [];
        this.nextNode(this.rootNode, visited,0);
        this.hWallsArray = [];
        this.vWallsArray = [];
        this.hWallsHash = {};
        this.vWallsHash = {};
        for (let v of this.hWalls.values()) {
            v = v.split('').map(e => parseInt(e));
            this.hWallsArray.push(v);
            this.hWallsHash[v[0]] = v[1];
        }
        for (let v of this.vWalls.values()) {
            v = v.split('').map(e => parseInt(e));
            this.vWallsArray.push(v);
            this.vWallsHash[v[1]] = v[0];
        }
        // console.log(this.vWallsArray.length,this.hWallsArray.length)
        console.log(this.last);
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
}

module.exports = Maze;
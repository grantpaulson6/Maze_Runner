

class Maze {
    
    constructor() {
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
        console.log(this.hWalls.size, this.vWalls.size);
        this.nextNode(this.rootNode, visited);

        console.log(this.hWalls.size, this.vWalls.size, this.rootNode);
    }

    nextNode(node, visited) {
        visited.add(node.r +""+ node.c);
        const neighbors = this.neighbors(node, visited);
        this.shuffleArray(neighbors);
        neighbors.forEach( n => {
            if (!visited.has(n.r+""+n.c)) {
                if (n.d == 'd') {
                    this.hWalls.delete(n.r + "" + n.c);
                } else if (n.d == 'u') {
                    this.hWalls.delete(n.r-1 + "" +  n.c);
                } else if (n.d == 'r') {
                    this.vWalls.delete(n.r + "" +  n.c);
                } else if (n.d == 'l') {
                    this.vWalls.delete(n.r + "" +  (n.c-1));
                }
                node.next.push(n);
                this.nextNode(n, visited);
            }
        });
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

class Node {
    constructor(r,c,d) {
        this.r = r;
        this.c = c;
        this.d = d;
        this.next = [];
    }
}

new Maze();


class Maze {

    constructor() {

    }
    
    generateMaze() {
        const visited = new Set();
        const hWalls = new Set();
        const vWalls = new Set();
        for (let r = 0; r < 10; r++) {
            for (let c = 0; r < 10; r++) {
                hWalls.add([r,c]);
                vWalls.add([r,c]);
            }
        }

        this.rootNode = new Node([0,0]);
        visited.add([0,0]);
        console.log('here');

        this.nextNode(this.rootNode, visited, hWalls, vWalls);


    }

    nextNode(node, visited, hWalls, vWalls) {
        const neighbors = this.neighbors(node);
    }

    neighbors(node, visited) {
        const neighs = [];
        
    }
}

class Node {
    constructor(pos) {
        this.pos = pos;
        this.next = [];
    }
}


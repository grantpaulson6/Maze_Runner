/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Maze = __webpack_require__(/*! ./maze */ \"./src/maze.js\");\nconst Sprite = __webpack_require__(/*! ./sprite */ \"./src/sprite.js\");\n\nclass Game {\n\n    constructor(canvas) {\n        this.ctx = canvas.getContext('2d');\n        this.maze = new Maze(this.ctx);\n\n        const playerImage = new Image();\n        playerImage.src = \"../sprite_sheets/indianajones_whip.png\";\n        this.player = new Sprite({\n            ctx: this.ctx,\n            width: 32,\n            height: 48,\n            image: playerImage,\n            hWalls: this.maze.hWallsHash,\n            vWalls: this.maze.vWallsHash\n        });\n\n        this.keys = {};\n\n        window.addEventListener('keydown', e => {\n            this.keys[e.keyCode] = true;\n        });\n\n        window.addEventListener('keyup', e => {\n            this.keys[e.keyCode] = false;\n        });\n\n        window.requestAnimationFrame(this.animate.bind(this));\n\n        window.setTimeout(this.rotate.bind(this), 3000)\n    }\n\n    rotate() {\n        let p = Math.PI/2;\n        let rad = [-2*p, -p, p, 2*p][Math.floor(Math.random()*4)];\n        this.player.targetRad = rad;\n        this.maze.targetRad = rad;\n        window.setTimeout(this.rotate.bind(this), 10000);\n    }\n\n    animate() {\n        this.ctx.clearRect(0,0,778,778);\n        this.player.update(this.keys);\n        this.maze.drawMaze();\n        this.player.render();\n        window.requestAnimationFrame(this.animate.bind(this));\n    }\n}\n\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\nwindow.addEventListener('load', () => {\n\n    const canvas = document.getElementById('canvas');\n    // canvas.style.width = \"1000px\";\n    // canvas.style.height = \"1000px\";\n\n    new Game(canvas);\n\n});\n\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/maze.js":
/*!*********************!*\
  !*** ./src/maze.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Node = __webpack_require__(/*! ./node */ \"./src/node.js\");\n\nclass Maze {\n    \n    constructor(ctx) {\n        this.ctx = ctx;\n        \n        this.hWalls = new Set();\n        this.vWalls = new Set();\n        this.offset = 113.91;\n\n        for (let r = 0; r < 10; r++) {\n            for (let c = 0; c < 10; c++) {\n                this.hWalls.add(r + \"\" + c);\n                this.vWalls.add(r + \"\" + c);\n            }\n        }\n\n        this.rootNode = new Node(0,0);\n        const visited = new Set();\n\n        // this.pos = [25,25];\n        // this.ctx.rect(this.pos[0], this.pos[1], 50, 50);\n        // this.ctx.fill();\n\n        this.d = 0;\n        this.last = [];\n        this.nextNode(this.rootNode, visited,0);\n        this.hWallsArray = [];\n        this.vWallsArray = [];\n        this.hWallsHash = {};\n        this.vWallsHash = {};\n        let vert;\n        let hori;\n        for (let v of this.hWalls.values()) {\n            v = v.split('').map(e => parseInt(e));\n            this.hWallsArray.push(v);\n            vert = (v[0]+1)*50+25;\n            hori = [v[1]*50 + 25, (v[1]+1)*50 + 25];\n            if (this.hWallsHash[vert]) {\n                this.hWallsHash[vert].push(hori);\n            } else {\n                this.hWallsHash[vert] = [hori];\n            }\n        }\n        for (let v of this.vWalls.values()) {\n            v = v.split('').map(e => parseInt(e));\n            this.vWallsArray.push(v);\n            vert = [v[0] * 50 + 25, (v[0] + 1) * 50 + 25];\n            hori = (v[1] + 1) * 50 + 25;\n            if (this.vWallsHash[hori]) {\n                this.vWallsHash[hori].push(vert);\n            } else {\n                this.vWallsHash[hori] = [vert];\n            }\n        }\n\n        this.vWallsHash[25] = []\n        this.hWallsHash[25] = []\n        for (let i = 0; i < 10; i++) {\n            this.vWallsHash[25].push([25 + 50 * i, 25 + 50 * (i + 1)]);\n            this.hWallsHash[25].push([25 + 50 * i, 25 + 50 * (i + 1)]);\n        }\n\n        // left and top outer walls need to be added\n\n        \n        // console.log(this.vWallsArray.length,this.hWallsArray.length)\n        // console.log(this.last);\n        this.rotateRad = 0;\n        this.targetRad = 0;\n        // this.rotateClockwiseBit(this.rotateRad);\n        // this.rotateClockwiseBit(Math.PI/8);\n    }\n\n    nextNode(node, visited,d) {\n        d++;\n        if (d > this.d) {\n            this.d = d;\n            this.last = [node.r,node.c];\n        }\n        // window.setTimeout(()=>{\n\n            // this.ctx.rect(pos[1], pos[0], 50, 50);\n            // this.ctx.fill();\n            \n            visited.add(node.r +\"\"+ node.c);\n            const neighbors = this.neighbors(node, visited);\n            this.shuffleArray(neighbors);\n            neighbors.forEach( n => {\n                if (!visited.has(n.r+\"\"+n.c)) {\n                    if (n.d == 'd') {\n                        this.hWalls.delete(node.r + \"\" + node.c);\n                    } else if (n.d == 'u') {\n                        this.hWalls.delete(n.r + \"\" +  n.c);\n                    } else if (n.d == 'r') {\n                        this.vWalls.delete(node.r + \"\" +  node.c);\n                    } else if (n.d == 'l') {\n                        this.vWalls.delete(n.r + \"\" +  n.c);\n                    }\n                    node.next.push(n);\n                    // window.setTimeout(() => this.nextNode(n, visited).bind(this), 200);\n                    this.nextNode(n, visited, d);\n                }\n            });\n        // },200)\n    }\n\n    neighbors(node, visited) {\n        const neighs = [];\n        if (node.r + 1 < 10 && !visited.has(node.r + 1 +\"\"+node.c)) {\n            neighs.push(new Node(node.r+1, node.c, 'd'));\n        }\n        if (node.c + 1 < 10 && !visited.has(node.r +\"\"+(node.c + 1))) {\n            neighs.push(new Node(node.r, node.c + 1, 'r'));\n        } \n        if (node.r - 1 >= 0 && !visited.has(node.r - 1 +\"\"+ node.c)) {\n            neighs.push(new Node(node.r - 1, node.c, 'u'));\n        } \n        if (node.c - 1 >= 0 && !visited.has(node.r+\"\"+ (node.c - 1))) {\n            neighs.push(new Node(node.r, node.c - 1, 'l'));\n        }\n        return neighs;\n    }\n\n    shuffleArray(array) {\n        for (var i = array.length - 1; i > 0; i--) {\n            var j = Math.floor(Math.random() * (i + 1));\n            var temp = array[i];\n            array[i] = array[j];\n            array[j] = temp;\n        }\n    }\n\n    rotateClockwise() {\n        this.vWallsHash2 = {};\n        this.hWallsHash2 = {};\n        for (let y of Object.keys(this.hWallsHash)) {\n            for (let x of this.hWallsHash[y]) {\n                if (this.vWallsHash2[525-y]) {\n                    this.vWallsHash2[525 - y].push(x);\n                } else {\n                    this.vWallsHash2[525 - y] = [x];\n                }\n            }\n        }\n        for (let x of Object.keys(this.vWallsHash)) {\n            for (let y of this.vWallsHash[x]) {\n                if (this.hWallsHash2[x]) {\n                    this.hWallsHash2[x].push(y.map(e=>525-e));\n                } else {\n                    this.hWallsHash2[x] = [y.map(e => 525 - e)];\n                }\n            }\n        }\n    }\n\n    rotateClockwiseBit() {\n        this.transitionWalls = [];\n        let theta;\n        let r;\n        for (let y of Object.keys(this.hWallsHash)) {\n            for (let ax of this.hWallsHash[y]) {\n                let wall = []\n                ax.forEach( x => {\n                    let yi = y - 275;\n                    let xi = x - 275;\n                    if (xi == 0) xi = 0.00000001;\n                    theta = Math.atan2(yi,xi) - this.rotateRad;\n                    r = Math.sqrt(xi**2 + yi**2);\n    \n                    yi = r * Math.sin(theta);\n                    xi = r * Math.cos(theta);\n\n                    xi += 275;\n                    yi += 275;\n    \n                    wall.push([xi,yi]);\n                });\n                this.transitionWalls.push(wall);\n            }\n        }\n        for (let x of Object.keys(this.vWallsHash)) {\n            for (let y of this.vWallsHash[x]) {\n                let wall = [];\n                y.forEach( yi => {\n                    let xi = x - 275;\n                    if (xi == 0) xi = 0.00000001;\n                    yi -= 275;\n                    let theta = Math.atan2(yi,xi) - this.rotateRad;\n                    let r = Math.sqrt(yi**2 + xi**2);\n    \n                    yi =  r * Math.sin(theta);\n                    xi = r * Math.cos(theta);\n\n                    xi += 275;\n                    yi += 275;\n                    wall.push([xi, yi]);\n                });\n                this.transitionWalls.push(wall);\n            }\n        }\n    }\n\n    drawMaze() {\n        this.ctx.beginPath();\n        if (this.rotateRad.toFixed(6) != this.targetRad.toFixed(6)) {\n            if (this.rotateRad > this.targetRad) {\n                this.rotateRad -= Math.PI / 800;\n            } else {\n                this.rotateRad += Math.PI / 800;\n            }\n        }\n        this.rotateClockwiseBit();\n        for (let c of this.transitionWalls) {\n            this.ctx.moveTo(c[0][0] + this.offset, c[0][1] + this.offset);\n            this.ctx.lineTo(c[1][0] + this.offset, c[1][1] + this.offset);\n        }\n        this.ctx.stroke();\n        this.ctx.beginPath();\n        this.ctx.arc(275 + this.offset, 275 + this.offset, 250 + this.offset, 0, 2 * Math.PI);\n        this.ctx.stroke();\n        this.drawTriangle();\n    }\n\n    drawTriangle() {\n        let x1 = 0;\n        let y1 = - 275 - 50;\n        let x2 = - 50;\n        let y2 = - 275;\n        let x3 = + 50;\n        let y3 = - 275;\n\n        let [xa, ya] = this.rotatePoint(x1, y1);\n        let [xb, yb] = this.rotatePoint(x2, y2);\n        let [xc, yc] = this.rotatePoint(x3, y3);\n\n        this.ctx.beginPath();\n        this.ctx.moveTo(xa + this.offset, ya + this.offset);\n        this.ctx.lineTo(xb + this.offset, yb + this.offset);\n        this.ctx.lineTo(xc + this.offset, yc + this.offset);\n        this.ctx.lineTo(xa + this.offset, ya + this.offset);\n        this.ctx.fill();\n    }\n\n    rotatePoint(xi,yi) {\n        if (xi == 0) xi = 0.00000001;\n        let theta = Math.atan2(yi, xi) - this.rotateRad;\n        let r = Math.sqrt(xi ** 2 + yi ** 2);\n\n        yi = r * Math.sin(theta);\n        xi = r * Math.cos(theta);\n\n        xi += 275;\n        yi += 275;\n        return [xi, yi];\n    }\n}\n\nmodule.exports = Maze;\n\n//# sourceURL=webpack:///./src/maze.js?");

/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Node {\n    constructor(r, c, d) {\n        this.r = r;\n        this.c = c;\n        this.d = d;\n        this.next = [];\n    }\n}\n\nmodule.exports = Node;\n\n//# sourceURL=webpack:///./src/node.js?");

/***/ }),

/***/ "./src/sprite.js":
/*!***********************!*\
  !*** ./src/sprite.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\nclass Sprite {\n\n    constructor(options) {\n        this.ctx = options.ctx;\n        this.width = options.width;\n        this.height = options.height;\n        this.image = options.image;\n        this.hWalls = options.hWalls;\n        this.vWalls = options.vWalls;\n        this.sx = 0;\n        this.sy = 0;\n        this.dx = 27;\n        this.dy = 23;\n        this.dxR = 27;\n        this.dyR = 23;\n        this.m = 0;\n        // this.oreintation('l');\n        this.tickCount = 0;\n        this.rotateRad = 0;\n        this.targetRad = 0;\n        this.speed = 2;\n        this.offset = 113.91;\n    }\n\n    update(keys) {\n        this.move(keys);\n        // this.tickCount += 1\n        // if (this.tickCount > 10) {\n        //     this.tickCount = 0\n        //     this.sx += this.width;\n        //     if (this.sx == this.width * 4) this.sx = 0;\n        // }\n    }\n\n    move(keys) {\n        this.tickCount += 1;\n    \n\n        if (keys[37] || keys[38] || keys[39] || keys[40]) {\n            if (this.tickCount > 8) {\n                this.tickCount = 0;\n                this.sx += this.width;\n                if (this.sx == this.width * 4) this.sx = 0;\n            }\n        } else {\n            // standing position when not moving\n            if (this.width * 4 % this.sx % 2 == 0) this.sx = 0;\n        }\n\n        \n        if (keys[38]) {\n            if (this.m != 3) {\n                this.m = 3;\n                // this.sy = this.m * this.height;\n            }\n            this.dy -= this.speed;\n            if (this.checkPoint()) this.dy += this.speed;\n            else this.checkWall('u');\n        }\n        if (keys[39]) {\n            if (this.m != 2) {\n                this.m = 2;\n                // this.sy = this.m * this.height;\n            }\n            this.dx += this.speed;\n            if (this.checkPoint()) this.dx -= this.speed;\n            else this.checkWall('r');\n        }\n            \n        if (keys[40]) {\n            if (this.m != 0) {\n                this.m = 0;\n                // this.sy = this.m * this.height;\n            }\n            this.dy += this.speed;\n            if (this.checkPoint()) this.dy -= this.speed;\n            else this.checkWall('d');\n        }\n        \n        if (keys[37]) {\n            if (this.m != 1) {\n                this.m = 1;\n                // this.sy = this.m * this.height;\n            }\n            this.dx -= this.speed;       \n            if (this.checkPoint()) this.dx += this.speed;                        \n            else this.checkWall('l');\n        }\n        this.sy = this.orientate() * this.height;\n    }\n\n    orientate() {\n        // debugger\n        //counter clockwise is positive radian or this.rotateRad\n        let dir = [0,2,3,1];\n        //rotate offset by pi/4\n        // debugger\n        let offset = Math.floor(2* ((this.rotateRad+Math.PI/4) % (Math.PI *2))/ Math.PI);\n        switch(this.m) {\n            case 1:\n                return dir[(3+offset >= 0 ? 3 + offset : 4 + 3 + offset) % 4];\n            case 0:\n                return dir[(offset >= 0 ? offset : 4 + offset) % 4];\n            case 2:\n                return dir[(1 + offset >= 0 ? 1 + offset : 4 + 1 + offset) % 4];\n            case 3:\n                return dir[(2 + offset >= 0 ? 2 + offset : 4 + 2 + offset) % 4];\n        }\n    }\n\n    checkPoint() {\n        let gridX1 = (this.dx + 8 - 25) / 50;\n        let gridX2 = (this.dx + this.width - 8 - 25) / 50;\n        let gridY1 = (this.dy + this.height - 16 - 25) / 50;\n        let gridY2 = (this.dy + this. height - 25) / 50;\n        return Math.floor(gridY2) === Math.ceil(gridY1) && Math.floor(gridX2) === Math.ceil(gridX1);\n    }\n\n    checkWall(d) {\n        switch (d) {\n            case 'r':\n                if (this.vWalls[this.dx+this.width - 8]) {\n                    for (let wx of this.vWalls[this.dx + this.width - 8]) {\n                        if ((this.dy+this.height >= wx[0] && this.dy+this.height <= wx[1])||\n                            (this.dy + this.height - 16 >= wx[0] && this.dy + this.height - 16 <= wx[1])) {\n                            this.dx -= this.speed;\n                        }\n                    }\n                }\n                return;\n            case 'l':\n                if (this.vWalls[this.dx + 8]) {\n                    for (let wx of this.vWalls[this.dx + 8]) {\n                        if ((this.dy + this.height >= wx[0] && this.dy + this.height <= wx[1]) ||\n                            (this.dy + this.height - 16 >= wx[0] && this.dy + this.height - 16 <= wx[1])) {\n                            this.dx += this.speed;\n                        }\n                    }\n                }\n                return;\n            case 'u':\n                if (this.hWalls[this.dy+ this.height - 16]) {\n                    for (let wy of this.hWalls[this.dy + this.height - 16]) {\n                        if ((this.dx+this.width - 8 >= wy[0] && this.dx + this.width - 8 <= wy[1]) ||\n                            (this.dx + 8 >= wy[0] && this.dx + 8 <= wy[1])) {\n                            this.dy += this.speed;\n                        }\n                    }\n                }\n                return;\n            case 'd':\n                if (this.hWalls[this.dy + this.height]) {\n                    for (let wy of this.hWalls[this.dy + this.height]) {\n                        if ((this.dx + this.width - 8 >= wy[0] && this.dx + this.width - 8 <= wy[1]) ||\n                            (this.dx + 8 >= wy[0] && this.dx + 8 <= wy[1])) {\n                            this.dy -= this.speed;\n                        }\n                    }\n                }\n                return;\n        }\n    }\n\n    rotate(rad) {\n        let yi = this.dy - 275 + this.height - 8;\n        let xi = this.dx - 275 + this.width/2;\n        if (xi == 0) xi = 0.00000001;\n        let theta = Math.atan2(yi, xi) - rad;\n        let r = Math.sqrt(xi ** 2 + yi ** 2);\n\n        yi = r * Math.sin(theta);\n        xi = r * Math.cos(theta);\n\n        this.dyR = yi + 275 - this.height + 10;\n        this.dxR = xi + 275 - this.width/2;\n    }\n\n    render() {\n        this.rotate(this.rotateRad);\n        if (this.rotateRad.toFixed(6) != this.targetRad.toFixed(6)) {\n            if (this.rotateRad > this.targetRad) {\n                this.rotateRad -= Math.PI / 800;\n            } else {\n                this.rotateRad += Math.PI / 800;\n            }\n        }\n        this.ctx.drawImage(\n            this.image,\n            this.sx,\n            this.sy,\n            this.width,\n            this.height,\n            this.dxR + this.offset,\n            this.dyR + this.offset,\n            this.width,\n            this.height\n        );\n    }\n}\n\nmodule.exports = Sprite;\n\n//# sourceURL=webpack:///./src/sprite.js?");

/***/ })

/******/ });
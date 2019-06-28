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

eval("const Maze = __webpack_require__(/*! ./maze */ \"./src/maze.js\");\n\nclass Game {\n\n    constructor(canvas) {\n        this.ctx = canvas.getContext('2d');\n        this.maze = new Maze(this.ctx);\n\n        this.ctx.beginPath();\n        for (let l of this.maze.hWallsArray) {\n            // console.log(l[0],l[1]);\n            this.ctx.moveTo(l[1]*50+25,(l[0]+1)*50+25);\n            this.ctx.lineTo((l[1]+1)*50+25,(l[0]+1)*50+25);\n        }\n        // console.log('verts')\n        for (let l of this.maze.vWallsArray) {\n            // console.log(l[0],l[1]);\n            this.ctx.moveTo((l[1]+1)*50+25,l[0]*50+25);\n            this.ctx.lineTo((l[1]+1)*50+25,(l[0]+1)*50+25);\n        }\n        this.ctx.stroke();\n    }\n\n\n}\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\nwindow.addEventListener('load', () => {\n    console.log('im here');\n    const canvas = document.getElementById('canvas');\n    // canvas.style.width = \"1000px\";\n    // canvas.style.height = \"1000px\";\n\n    new Game(canvas);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/maze.js":
/*!*********************!*\
  !*** ./src/maze.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Node = __webpack_require__(/*! ./node */ \"./src/node.js\");\n\nclass Maze {\n    \n    constructor(ctx) {\n        this.ctx = ctx;\n        \n        this.hWalls = new Set();\n        this.vWalls = new Set();\n\n        for (let r = 0; r < 10; r++) {\n            for (let c = 0; c < 10; c++) {\n                this.hWalls.add(r + \"\" + c);\n                this.vWalls.add(r + \"\" + c);\n            }\n        }\n\n        this.rootNode = new Node(0,0);\n        const visited = new Set();\n\n        // this.pos = [25,25];\n        // this.ctx.rect(this.pos[0], this.pos[1], 50, 50);\n        // this.ctx.fill();\n\n        this.d = 0;\n        this.last = [];\n        this.nextNode(this.rootNode, visited,0);\n        this.hWallsArray = [];\n        this.vWallsArray = [];\n        for (let v of this.hWalls.values()) {\n            this.hWallsArray.push(v.split('').map(e=>parseInt(e)));\n        }\n        for (let v of this.vWalls.values()) {\n            this.vWallsArray.push(v.split('').map(e=>parseInt(e)));\n        }\n        // console.log(this.vWallsArray.length,this.hWallsArray.length)\n        console.log(this.last);\n    }\n\n    nextNode(node, visited,d) {\n        d++;\n        if (d > this.d) {\n            this.d = d;\n            this.last = [node.r,node.c];\n        }\n        // window.setTimeout(()=>{\n\n            // this.ctx.rect(pos[1], pos[0], 50, 50);\n            // this.ctx.fill();\n            \n            visited.add(node.r +\"\"+ node.c);\n            const neighbors = this.neighbors(node, visited);\n            this.shuffleArray(neighbors);\n            neighbors.forEach( n => {\n                if (!visited.has(n.r+\"\"+n.c)) {\n                    if (n.d == 'd') {\n                        this.hWalls.delete(node.r + \"\" + node.c);\n                    } else if (n.d == 'u') {\n                        this.hWalls.delete(n.r + \"\" +  n.c);\n                    } else if (n.d == 'r') {\n                        this.vWalls.delete(node.r + \"\" +  node.c);\n                    } else if (n.d == 'l') {\n                        this.vWalls.delete(n.r + \"\" +  n.c);\n                    }\n                    node.next.push(n);\n                    // window.setTimeout(() => this.nextNode(n, visited).bind(this), 200);\n                    this.nextNode(n, visited, d);\n                }\n            });\n        // },200)\n    }\n\n    neighbors(node, visited) {\n        const neighs = [];\n        if (node.r + 1 < 10 && !visited.has(node.r + 1 +\"\"+node.c)) {\n            neighs.push(new Node(node.r+1, node.c, 'd'));\n        }\n        if (node.c + 1 < 10 && !visited.has(node.r +\"\"+(node.c + 1))) {\n            neighs.push(new Node(node.r, node.c + 1, 'r'));\n        } \n        if (node.r - 1 >= 0 && !visited.has(node.r - 1 +\"\"+ node.c)) {\n            neighs.push(new Node(node.r - 1, node.c, 'u'));\n        } \n        if (node.c - 1 >= 0 && !visited.has(node.r+\"\"+ (node.c - 1))) {\n            neighs.push(new Node(node.r, node.c - 1, 'l'));\n        }\n        return neighs;\n    }\n\n    shuffleArray(array) {\n        for (var i = array.length - 1; i > 0; i--) {\n            var j = Math.floor(Math.random() * (i + 1));\n            var temp = array[i];\n            array[i] = array[j];\n            array[j] = temp;\n        }\n    }\n}\n\nmodule.exports = Maze;\n\n//# sourceURL=webpack:///./src/maze.js?");

/***/ }),

/***/ "./src/node.js":
/*!*********************!*\
  !*** ./src/node.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class Node {\n    constructor(r, c, d) {\n        this.r = r;\n        this.c = c;\n        this.d = d;\n        this.next = [];\n    }\n}\n\nmodule.exports = Node;\n\n//# sourceURL=webpack:///./src/node.js?");

/***/ })

/******/ });
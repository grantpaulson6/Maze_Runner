const Game = require('./game');




window.addEventListener('load', () => {

    const canvas = document.getElementById('canvas');
    // canvas.style.width = "1000px";
    // canvas.style.height = "1000px";

    new Game(canvas);

});


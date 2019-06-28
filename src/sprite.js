

class Sprite {

    constructor(options) {
        this.ctx = options.ctx;
        this.width = options.width;
        this.height = options.height;
        this.image = options.image;
    }

    // render() {
    //     console.log('here')
    //     this.ctx.rect(10,10,60,60);
    //     this.ctx.fill();
    //     document.getElementById('test').appendChild(this.image);
    //     let image = this.image;
    //     this.ctx.drawImage(
    //         image,
    //         0,
    //         0
    //         // this.width,
    //         // this.height,
    //         // 0,
    //         // 0,
    //         // this.width,
    //         // this.height
    //     );
    // }
}

module.exports = Sprite;
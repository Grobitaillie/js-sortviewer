class PixiGraphicItem {

    constructor(width, maxHeight, canvasHeight, x, value) {
        this.graphics = new PIXI.Graphics();
        this.width = width;
        this.value = value;
        this.maxHeight = maxHeight;
        this.canvasHeight = canvasHeight;
        this.height = this.value / this.maxHeight;
        this.x = x;
        this.y = this.canvasHeight - this.height;
        this.color = 0xFFFFFF;
    }

    changeValue(value) {
        this.value = value;
        this.height = this.value / this.maxHeight;
        this.y = 600 - this.height;

        this.draw();
    }

    changeColor(color) {
        this.color = color;
        this.draw();
    }

    draw() {
        this.graphics.clear();
        this.graphics.beginFill(this.color);
        this.graphics.drawRect(this.x, this.y, this.width, this.height);
        this.graphics.endFill();
    }

}
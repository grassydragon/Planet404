export class Button {

    constructor(scene, x, y, width = 0, height = 0) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.visible = true;
    }

    draw() {

    }

    containsPoint(point) {
        return point.x >= this.x - this.width / 2 && point.x <= this.x + this.width / 2
            && point.y >= this.y - this.height / 2 && point.y <= this.y + this.height / 2;
    }

    onMouseDown(point) {
        this.pressed = this.containsPoint(point);
    }

    onMouseUp(point) {
        if (this.pressed && this.containsPoint(point)) this.onClick();

        this.pressed = false;
    }

    onClick() {

    }

}
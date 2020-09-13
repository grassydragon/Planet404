import { FONT } from "./font.js";

export let Align = {
    LEFT: 0,
    CENTER: -1,
    RIGHT: -2
};

export let Baseline = {
    TOP: 0,
    MIDDLE: -1,
    BOTTOM: -2
};

export class Text {

    constructor(scene, content, x, y, size, align = Align.CENTER, baseline = Baseline.MIDDLE) {
        this.scene = scene;
        this.content = content;
        this.x = x;
        this.y = y;
        this.size = size;
        this.align = align;
        this.baseline = baseline;

        this.visible = true;

        this.alpha = 1;

        this.pixelSize = Math.round(this.size / 5);
    }

    get content() {
        return this._content;
    }

    set content(value) {
        this._content = value.toUpperCase();
    }

    get width() {
        let width = this.content.length - 1;

        for (let char of this.content) {
            let letter = FONT[char];

            width += letter[0].length;
        }

        width *= this.pixelSize;

        return width;
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.fillStyle = "#ffffff";
        context.globalAlpha = this.alpha;

        let height = this.pixelSize * 5;

        let x = Math.round(this.x + this.align * this.width / 2);
        let y = Math.round(this.y + this.baseline * height / 2);

        for (let char of this.content) {
            let letter = FONT[char];

            for (let i = 0; i < letter.length; i++) {
                for (let j = 0; j < letter[i].length; j++) {
                    if (letter[i][j]) context.fillRect(x + j * this.pixelSize, y + i * this.pixelSize, this.pixelSize, this.pixelSize);
                }
            }

            x += (letter[0].length + 1) * this.pixelSize;
        }

        context.restore();
    }

}
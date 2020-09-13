import { Button } from "./button.js";
import { Text } from "./text.js";

const ENABLED_COLOR = "#00adff";

const DISABLED_COLOR = "#9b9b9b";

const PRESSED_COLOR = "#006a9b";

export class TextButton extends Button {

    constructor(scene, content, x, y) {
        super(scene, x, y);

        this.text = new Text(scene, content, 0, 0, 20);

        this.rectWidth = this.text.width + 10;
        this.rectHeight = this.text.size + 10;

        this.width = this.rectWidth + 10;
        this.height = this.rectHeight + 10;

        this.enabled = true;
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        if (this.enabled) {
            if (this.pressed) {
                context.fillStyle = PRESSED_COLOR;
                context.strokeStyle = PRESSED_COLOR;
            }
            else {
                context.fillStyle = ENABLED_COLOR;
                context.strokeStyle = ENABLED_COLOR;
            }
        }
        else {
            context.fillStyle = DISABLED_COLOR;
            context.strokeStyle = DISABLED_COLOR;
        }

        context.lineWidth = 10;
        context.lineJoin = "round";

        context.fillRect(this.x - this.rectWidth / 2, this.y - this.rectHeight / 2, this.rectWidth, this.rectHeight);

        context.strokeRect(this.x - this.rectWidth / 2, this.y - this.rectHeight / 2, this.rectWidth, this.rectHeight);

        context.translate(this.x, this.y);

        this.text.draw();

        context.restore();
    }

}
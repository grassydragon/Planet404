import { Background } from "./engine/background.js";
import { random } from "./random.js";

export class LandscapeBackground extends Background {

    constructor(scene) {
        super(scene);

        this.gradient = this.scene.game.context.createLinearGradient(0, 0, 0, this.scene.game.height);

        this.gradient.addColorStop(0, "#95dfff");
        this.gradient.addColorStop(1, "#ffc8bb");

        this.sunX = 600;
        this.sunY = 200;
        this.sunR = 50;
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.fillStyle = this.gradient;

        context.fillRect(0, 0, this.scene.game.width, this.scene.game.height);

        context.fillStyle = "#ff8579";

        context.beginPath();
        context.arc(this.sunX, this.sunY, this.sunR, 0, Math.PI * 2);
        context.fill();

        context.restore();
    }

}
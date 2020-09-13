import { Background } from "./engine/background.js";
import { random } from "./random.js";

const SKY_COLOR = "#95dfff";

const STARS_NUMBER = 100;

const MAX_STAR_R = 2;

export class SkyBackground extends Background {

    constructor(scene) {
        super(scene);

        this.y = 0;

        this.gradient = this.scene.game.context.createLinearGradient(0, 0, 0, this.scene.game.height * 3);

        this.gradient.addColorStop(0, "#000000");
        this.gradient.addColorStop(1 / 3, SKY_COLOR);
        this.gradient.addColorStop(1, SKY_COLOR);

        this.stars = [];

        for (let i = 0; i < STARS_NUMBER; i++) {
            let x = random(0, this.scene.game.width);
            let y = random(0, this.scene.game.height);

            let r = random(0, MAX_STAR_R);

            this.stars.push({
                x: x,
                y: y,
                r: r
            });
        }
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.fillStyle = this.gradient;

        context.translate(0, this.y);

        context.fillRect(0, 0, this.scene.game.width, this.scene.game.height * 3);

        context.fillStyle = "#ffffff";

        for (let star of this.stars) {
            context.beginPath();
            context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
            context.fill();
        }

        context.restore();
    }

}
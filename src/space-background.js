import { Background } from "./engine/background.js";
import { random } from "./random.js";

const STARS_NUMBER = 100;

const OVERLAP = 10;

const MAX_STAR_R = 2;

const MIN_STAR_P = 0.5;

export class SpaceBackground extends Background {

    constructor(scene) {
        super(scene);

        this.canvas = document.createElement("canvas");

        this.canvas.width = this.scene.game.width;
        this.canvas.height = this.scene.game.height;

        this.context = this.canvas.getContext("2d");

        this.context.strokeStyle = "#ffffff";
        this.context.lineCap = "round";

        this.stars = [];

        for (let i = 0; i < STARS_NUMBER; i++) {
            let x = random(-OVERLAP, this.scene.game.width + OVERLAP);
            let y = random(-OVERLAP, this.scene.game.height + OVERLAP);

            let r = random(0, MAX_STAR_R);

            let p = random(MIN_STAR_P, 1);

            this.stars.push({
                x: x,
                y: y,
                r: r,
                p: p,
                px: x,
                py: y
            });
        }

        this.jump = false;
    }

    draw() {
        this.context.fillStyle = "#000000";

        if (this.jump) {
            this.context.globalAlpha = 0.05;

            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.globalAlpha = 1;

            for (let star of this.stars) {
                this.context.lineWidth = star.r * 2;

                this.context.beginPath();
                this.context.moveTo(star.px, star.py);
                this.context.lineTo(star.x, star.y);
                this.context.stroke();
            }
        }
        else {
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.context.fillStyle = "#ffffff";

            for (let star of this.stars) {
                this.context.beginPath();
                this.context.arc(star.x, star.y, star.r, 0, Math.PI * 2);
                this.context.fill();
            }
        }

        let context = this.scene.game.context;

        context.drawImage(this.canvas, 0, 0);

        for (let star of this.stars) {
            star.px = star.x;
            star.py = star.y;
        }
    }

    move(x, y) {
        for (let star of this.stars) {
            star.x += x * star.p;
            star.y += y * star.p;

            let reset = false;

            let minX = -OVERLAP;
            let maxX = this.scene.game.width + OVERLAP;

            let minY = -OVERLAP;
            let maxY = this.scene.game.height + OVERLAP;

            if (star.x < -OVERLAP) {
                reset = true;
                minX = this.scene.game.width;
            }
            else if (star.x > this.scene.game.width + OVERLAP) {
                reset = true;
                maxX = 0;
            }

            if (star.y < -OVERLAP) {
                reset = true;
                minY = this.scene.game.height;
            }
            else if (star.y > this.scene.game.height + OVERLAP) {
                reset = true;
                maxY = 0;
            }

            if (reset) {
                star.x = random(minX, maxX);
                star.y = random(minY, maxY);
                star.r = random(0, MAX_STAR_R);
                star.p = random(MIN_STAR_P, 1);
                star.px = star.x;
                star.py = star.y;
            }
        }
    }

}
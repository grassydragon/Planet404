import { GameObject } from "./engine/game-object.js";
import { random } from "./random.js";
import { PlanetPalettes } from "./planet-palettes.js";

export class Planet extends GameObject {

    constructor(scene, x, y, type) {
        super(scene, x, y);

        this.type = type;
        this.palette = PlanetPalettes.get(this.type);

        this.r = 100;

        this.h = this.r / 8;

        this.n = 5;

        this.step = this.r * 2 / this.n;

        this.stripes = [];

        for (let i = 0; i < 3; i++) {
            let points = [];

            points.push(-this.h, -this.h);

            for (let j = 0; j < this.n - 1; j++) points.push(-this.h + random(-this.h / 2, this.h / 2));

            points.push(-this.h, -this.h, this.h, this.h);

            for (let j = 0; j < this.n - 1; j++) points.push(this.h + random(-this.h / 2, this.h / 2));

            points.push(this.h, this.h);

            this.stripes.push(points);
        }
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.translate(this.x, this.y);
        context.scale(this.scale, this.scale);

        context.beginPath();
        context.arc(0, 0, this.r, 0, Math.PI * 2);
        context.clip();

        this.drawPlanet();

        this.drawPole();

        context.scale(1, -1);

        this.drawPole();

        context.scale(1, -1);

        context.translate(0, -this.h * 4);

        for (let points of this.stripes) {
            this.drawStripe(points);
            context.translate(0, this.h * 4);
        }

        context.restore();
    }

    drawPlanet() {
        let context = this.scene.game.context;

        context.fillStyle = this.palette.mainColor;

        context.fillRect(-this.r, -this.r, this.r * 2, this.r * 2);
    }

    drawPole() {
        let context = this.scene.game.context;

        context.fillStyle = "#ffffff";

        context.beginPath();
        context.arc(0, -this.r * 2.75, this.r * 2, 0, Math.PI);
        context.fill();
    }

    drawStripe(points) {
        let context = this.scene.game.context;

        context.fillStyle = this.palette.accentColor;

        let x = -this.r;

        context.beginPath();
        context.moveTo(x, points[1]);

        for (let i = 1; i < this.n + 1; i++) {
            context.bezierCurveTo(
                x - this.step, points[i - 1],
                x + this.step * 2, points[i + 2],
                x + this.step, points[i + 1]);
            x += this.step;
        }

        context.lineTo(x, points[this.n + 4]);

        for (let i = this.n + 4; i < this.n * 2 + 4; i++) {
            context.bezierCurveTo(
                x + this.step, points[i - 1],
                x - this.step * 2, points[i + 2],
                x - this.step, points[i + 1]);
            x -= this.step;
        }

        context.fill();
    }

}
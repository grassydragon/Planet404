import { Background } from "./engine/background.js";
import { random } from "./random.js";

const MAX_STAR_R = 2;

function drawStars(context) {
    for (let i = 0; i < 400; i++) {
        let x = random(0, context.canvas.width);
        let y = random(0, context.canvas.height);

        let r = random(0, MAX_STAR_R);

        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fill();
    }
}

function drawSpiral(context) {
    for (let t = 0; t < Math.PI * 2; t += 0.1) {
        let sr = 400 / (Math.PI * 2) * t;

        let x = sr * Math.cos(t);
        let y = sr * Math.sin(t);

        for (let i = 0; i < 10; i++) {
            let offsetX = random(-40, 40);
            let offsetY = random(-40, 40);

            let r = random(0, MAX_STAR_R);

            context.beginPath();
            context.arc(x + offsetX, y + offsetY, r, 0, Math.PI * 2);
            context.fill();
        }
    }
}

function drawCenter(context) {
    for (let i = 0; i < 100; i++) {
        let ca = random(0, Math.PI * 2);
        let cr = random(0, 100);

        let x = cr * Math.cos(ca);
        let y = cr * Math.sin(ca);

        let r = random(0, MAX_STAR_R);

        context.beginPath();
        context.arc(x, y, r, 0, Math.PI * 2);
        context.fill();
    }
}

export class MapBackground extends Background {

    constructor(scene) {
        super(scene);

        let canvas = document.createElement("canvas");

        canvas.width = this.scene.game.width;
        canvas.height = this.scene.game.height;

        let context = canvas.getContext("2d");

        context.fillRect(0, 0, canvas.width, canvas.height);

        context.fillStyle = "#ffffff";

        drawStars(context);

        context.translate(canvas.width / 2, canvas.height / 2);

        drawSpiral(context);

        context.save();

        context.rotate(Math.PI);

        drawSpiral(context);

        context.restore();

        drawCenter(context);

        this.image = canvas;

        this.place = null;
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.drawImage(this.image, 0, 0);

        context.strokeStyle = "#00ffff";
        context.globalAlpha = 0.5;

        let width = this.scene.game.width;
        let height = this.scene.game.height;

        let stepX = width / 4;
        let stepY = height / 3;

        for (let y = stepY; y < height; y += stepY) {
            context.beginPath();
            context.moveTo(0, y);
            context.lineTo(width, y);
            context.stroke();
        }

        for (let x = stepX; x < width; x += stepX) {
            context.beginPath();
            context.moveTo(x, 0);
            context.lineTo(x, height);
            context.stroke();
        }

        if (this.place) {
            context.strokeStyle = "#ffffff";
            context.globalAlpha = 1;
            context.lineWidth = 4;

            context.strokeRect(this.place.x * stepX, this.place.y * stepY, stepX, stepY);
        }

        context.restore();
    }

}
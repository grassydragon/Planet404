import { GameObject } from "./engine/game-object.js";
import { PlanetPalettes } from "./planet-palettes.js";
import { PlanetType } from "./planet-type.js";
import { random, randomInteger } from "./random.js";

export class Landscape extends GameObject {

    constructor(scene, x, y, type) {
        super(scene, x, y);

        let palette = PlanetPalettes.get(type);

        let canvas = document.createElement("canvas");

        canvas.width = this.scene.game.width;
        canvas.height = this.scene.game.height;

        let context = canvas.getContext("2d");

        context.fillStyle = palette.mainColor;

        context.beginPath();
        context.arc(canvas.width / 2, canvas.height * 4.75, canvas.height * 4, Math.PI, Math.PI * 2);
        context.fill();

        context.fillStyle = palette.accentColor;

        if (type === PlanetType.GREEN) {
            let trees = [
                { x: 100, y: 380 },
                { x: 420, y: 400 },
                { x: 500, y: 350 },
                { x: 700, y: 380 }
            ];

            for (let tree of trees) {
                let height = random(60, 120);

                for (let h = 0; h <= height; h += 10) {
                    for (let i = 0; i < 20; i++) {
                        let x = tree.x + random(-height / 4, height / 4) * (1 - h / height);
                        let y = tree.y - h;

                        let r = random(height / 8, height / 4);

                        context.beginPath();
                        context.arc(x, y, 10, 0, Math.PI * 2);
                        context.fill();
                    }
                }
            }
        }
        else if (type === PlanetType.DESERT) {
            let stones = [
                { x: 150, y: 400 },
                { x: 250, y: 425 },
                { x: 350, y: 375 },
                { x: 500, y: 400 },
                { x: 600, y: 375 },
                { x: 700, y: 400 }
            ];

            for (let stone of stones) {
                let r = random(10, 20);

                context.beginPath();
                context.arc(stone.x, stone.y, r, 0, Math.PI * 2);
                context.fill();
            }
        }
        if (type === PlanetType.ICE) {
            let spikes = [
                { x: 100, y: 380 },
                { x: 420, y: 400 },
                { x: 500, y: 350 },
                { x: 700, y: 380 }
            ];

            for (let spike of spikes) {
                let n = randomInteger(2, 4);

                for (let i = 0; i < n; i++) {
                    let height = random(30, 120);
                    let offset = random(-60, 60);

                    context.beginPath();
                    context.moveTo(spike.x + height / 8, spike.y);
                    context.lineTo(spike.x + offset, spike.y - height);
                    context.lineTo(spike.x - height / 8, spike.y);
                    context.fill();
                }
            }
        }

        this.image = canvas;
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.translate(this.x - this.scene.game.width / 2, this.y - this.scene.game.height / 2);

        context.drawImage(this.image, 0, 0);

        context.restore();
    }
}
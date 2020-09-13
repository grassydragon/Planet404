import { GameObject } from "./engine/game-object.js";

export class Parachute extends GameObject {

    constructor(scene, x, y) {
        super(scene, x, y);

        this.attachmentX = 0;
        this.attachmentY = 0;
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.strokeStyle = "#ffffff";
        context.lineWidth = 2;

        for (let i = 0; i < 4; i++) {
            context.beginPath();
            context.moveTo(this.x - 270 + i * 180, this.y);
            context.lineTo(this.attachmentX, this.attachmentY);
            context.stroke();
        }

        context.restore();
    }

}
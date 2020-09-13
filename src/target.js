import { GameObject } from "./engine/game-object.js";

export class Target extends GameObject {

    constructor(scene, x, y, r, start, end) {
        super(scene, x, y);

        this.r = r;
        this.start = start;
        this.end = end;
        this.angle = 0;
        this.width = 0;
        this.time = 0;
        this.duration = 0;
        this.spacecraftAngle = 0;
        this.active = false;
        this.satisfied = false;
        this.onCompleted = null;
    }

    update() {
        this.satisfied = false;

        if (this.active && Math.abs(this.angle - this.spacecraftAngle) < this.width / 2) {
            this.satisfied = true;

            this.time += 1 / 60;

            if (this.time >= this.duration) {
                this.active = false;

                if (this.onCompleted) this.onCompleted();
            }
        }
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.strokeStyle = "#ffffff";
        context.globalAlpha = 0.25;
        context.lineWidth = 5;

        context.beginPath();
        context.arc(this.x, this.y, this.r, this.start * Math.PI / 180, this.end * Math.PI / 180);
        context.stroke();

        if (this.active) {
            if (this.satisfied) context.strokeStyle = "#00ffff";

            context.globalAlpha = 1;

            context.beginPath();
            context.arc(this.x, this.y, this.r, (this.angle - this.width / 2) * Math.PI / 180, (this.angle + this.width / 2) * Math.PI / 180);
            context.stroke();
        }
        context.restore();
    }

    restart() {
        this.time = 0;
        this.active = true
    }

}
import { GameObject } from "./engine/game-object.js";
import { random } from "./random.js";

const ROCKET_COLOR = "#b0cdb4";

const WINDOW_COLOR = "#00adff";

const ENGINE_COLOR = "#cdb380";

const NORMAL_FLAME_COLOR = "#ffd800";

const JUMP_FLAME_COLOR = "#00ffff";

export let Engine = {
    OFF: 0,
    ON: 1,
    JUMP: 2
};

export class Spacecraft extends GameObject {

    constructor(scene, x, y) {
        super(scene, x, y);

        this.engine = Engine.ON;

        this.flameLength = 50;

        this.flameOffset = 0;

        this.flameColor = NORMAL_FLAME_COLOR;
    }

    update() {
        if (this.engine === Engine.OFF) {
            if (this.flameLength > 0) this.flameLength -= 2;

            this.flameColor = NORMAL_FLAME_COLOR;
        }
        else if (this.engine === Engine.ON) {
            if (this.flameLength < 50) this.flameLength += 2;
            else if (this.flameLength > 50) this.flameLength -= 2;

            this.flameColor = NORMAL_FLAME_COLOR;
        }
        else {
            if (this.flameLength < 100) this.flameLength += 2;

            this.flameColor = JUMP_FLAME_COLOR;
        }
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.strokeStyle = "#ffffff";
        context.lineJoin = "round";

        context.translate(this.x, this.y);
        context.rotate(this.rotation * Math.PI / 180);
        context.scale(this.scale, this.scale);

        if (this.flameLength > 0) this.drawRocketFlame();
        this.drawRocket();

        context.translate(-25, 0);

        if (this.flameLength > 0) this.drawEngineFlame();
        this.drawEngine();

        context.translate(50, 0);

        if (this.flameLength > 0) this.drawEngineFlame();
        this.drawEngine();

        context.restore();
    }

    drawRocketFlame() {
        let context = this.scene.game.context;

        context.fillStyle = this.flameColor;

        context.beginPath();
        context.moveTo(-15, 30);
        context.lineTo(this.flameOffset + random(-2, 2), 30 + this.flameLength + random(-10, 10));
        context.lineTo(15, 30);
        context.fill();
    }

    drawEngineFlame() {
        let context = this.scene.game.context;

        context.fillStyle = this.flameColor;

        context.beginPath();
        context.moveTo(-5, 30);
        context.lineTo(this.flameOffset + random(-2, 2), 30 + this.flameLength * 0.6 + random(-5, 5));
        context.lineTo(5, 30);
        context.fill();
    }

    drawRocket() {
        let context = this.scene.game.context;

        context.fillStyle = ROCKET_COLOR;
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(-20, 30);
        context.bezierCurveTo(-20, -10, -10, -30, 0, -30);
        context.bezierCurveTo(10, -30, 20, -10, 20, 30);
        context.closePath();
        context.fill();
        context.stroke();

        context.fillStyle = WINDOW_COLOR;
        context.lineWidth = 4;

        context.beginPath();
        context.arc(0, 0, 10, 0, Math.PI * 2);
        context.fill();
        context.stroke();
    }

    drawEngine() {
        let context = this.scene.game.context;

        context.fillStyle = ENGINE_COLOR;
        context.lineWidth = 2;

        context.beginPath();
        context.moveTo(-5, 30);
        context.lineTo(-5, 10);
        context.arc(0, 10, 5, Math.PI, Math.PI * 2);
        context.lineTo(5, 30);
        context.closePath();
        context.fill();
        context.stroke();
    }

    flyStraight() {
        this.flameOffset = 0;
    }

    flyLeft() {
        this.flameOffset = -5;
    }

    flyRight() {
        this.flameOffset = 5;
    }

}
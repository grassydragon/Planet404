import { GameObject } from "./engine/game-object.js";
import { random } from "./random.js";

export class Cloud extends GameObject {

    constructor(scene) {
        super(scene, 0, 0);

        this.size = 0;
        this.p = 0;
        this.alpha = 1;

        this.reset();
    }

    update() {
        this.y -= Cloud.vY * this.p;

        if (this.y < -this.size) this.reset();
    }

    draw() {
        let context = this.scene.game.context;

        context.save();

        context.fillStyle = "#ffffff";
        context.globalAlpha = this.alpha;

        context.fillRect(this.x, this.y, this.size, this.size);

        context.restore();
    }

    reset() {
        this.size = random(30, 60);
        this.x = random(this.size, this.scene.game.width - this.size);
        this.y = random(this.scene.game.height, this.scene.game.height * 2);
        this.p = random(0.5, 1);
        this.alpha = random(0.4, 0.8);
    }

}

Cloud.vY = 0;
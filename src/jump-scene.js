import { Scene } from "./engine/scene.js";
import { SpaceBackground } from "./space-background.js";
import { Engine, Spacecraft } from "./spacecraft.js";
import { Align, Baseline, Text } from "./engine/text.js";
import { Timer } from "./engine/timer.js";

export class JumpScene extends Scene {

    create() {
        this.background = new SpaceBackground(this);

        this.backgroundVY = 2;

        this.spacecraft = new Spacecraft(this, 400, 225);
        this.addObject(this.spacecraft);

        this.hint = new Text(this, "Prepare for a jump", 400, 440, 10, Align.CENTER, Baseline.BOTTOM);
        this.addText(this.hint);

        this.addTimer(new Timer(1, () => this.hint.content = "In 3"));
        this.addTimer(new Timer(2, () => this.hint.content = "In 2"));
        this.addTimer(new Timer(3, () => this.hint.content = "In 1"));
        this.addTimer(new Timer(4, () => {
            this.background.jump = true;
            this.backgroundVY = 4;
            this.spacecraft.engine = Engine.JUMP;
            this.hint.content = "Let's go!";
        }));
        this.addTimer(new Timer(8, () => this.game.startScene("ApproachScene")));
    }

    update() {
        this.background.move(0, this.backgroundVY);
    }

}
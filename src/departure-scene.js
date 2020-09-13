import { Scene } from "./engine/scene.js";
import { SpaceBackground } from "./space-background.js";
import { Spacecraft } from "./spacecraft.js";
import { Align, Baseline, Text } from "./engine/text.js";
import { Animation } from "./engine/animation.js";
import { Timer } from "./engine/timer.js";

export class DepartureScene extends Scene {

    create() {
        this.background = new SpaceBackground(this);

        this.backgroundVY = 0;

        this.spacecraft = new Spacecraft(this, 400, 675);
        this.addObject(this.spacecraft);

        this.hint = new Text(this, "We are heading out on an adventure", 400, 440, 10, Align.CENTER, Baseline.BOTTOM);
        this.addText(this.hint);

        this.addAnimation(new Animation(this.spacecraft, { name: "y", start: 675, end: 225 }, 4, () => this.backgroundVY = 2));

        this.addTimer(new Timer(3, () => this.hint.content = "To find new planets in our galaxy"));
        this.addTimer(new Timer(6, () => this.hint.content = "First, let's decide where to go"));
        this.addTimer(new Timer(9, () => this.game.startScene("MapScene")));
    }

    update() {
        this.background.move(0, this.backgroundVY);
    }

}
import { Scene } from "./engine/scene.js";
import { SkyBackground } from "./sky-background.js";
import { Target } from "./target.js";
import { Engine, Spacecraft } from "./spacecraft.js";
import { Animation } from "./engine/animation.js";
import { Align, Baseline, Text } from "./engine/text.js";
import { Parachute } from "./parachute.js";
import { Cloud } from "./cloud.js";
import { Timer } from "./engine/timer.js";
import { randomInteger } from "./random.js";
import { toRadians } from "./angles.js";

export class LandingScene extends Scene {

    create() {
        this.background = new SkyBackground(this);

        this.parachute = new Parachute(this, 400, -787.5);
        this.addObject(this.parachute);

        this.spacecraft = new Spacecraft(this, 400, -337.5);
        this.spacecraft.engine = Engine.OFF;
        this.spacecraft.flameLength = 0;
        this.addObject(this.spacecraft);

        this.target = new Target(this, 400, 0, 300, 30, 150);
        this.target.visible = false;
        this.target.angle = 90;
        this.target.width = 30;
        this.target.duration = 2;
        this.addObject(this.target);

        for (let i = 0; i < 20; i++) this.addObject(new Cloud(this));

        this.hint = new Text(this, "We need to prevent the spacecraft from tilting", 400, 440, 10, Align.CENTER, Baseline.BOTTOM);
        this.hint.visible = false;
        this.addText(this.hint);

        this.addAnimation(new Animation(this.background, { name: "y", start: 0, end: -450 }, 3, () => {
            Cloud.vY = 1;
            this.addAnimation(new Animation(this.background, { name: "y", start: -450, end: -900 }, 3));
        }));
        this.addAnimation(new Animation(this.parachute, { name: "y", start: -787.5, end: -450 }, 6));
        this.addAnimation(new Animation(this.spacecraft, { name: "y", start: -337.5, end: 225 }, 6));

        this.addTimer(new Timer(6, () => {
            this.hint.visible = true;
            this.target.visible = true;
        }));
        this.addTimer(new Timer(9, () => {
            this.taskActive = true;
        }));

        this.taskActive = false;

        this.taskIndex = 0;

        this.tasks = [-40, -30, -20, 20, 30, 40];

        for (let i = 0; i < 6; i++) {
            let index = randomInteger(i, 5);

            let tmp = this.tasks[i];
            this.tasks[i] = this.tasks[index];
            this.tasks[index] = tmp;
        }

    }

    update() {
        if (this.taskActive) {
            if (this.target.active) {
                let input = this.game.input;

                if (input.left && this.spacecraft.rotation < 60) this.spacecraft.rotation += 0.5;
                else if (input.right && this.spacecraft.rotation > -60) this.spacecraft.rotation -= 0.5;

                this.target.spacecraftAngle = this.spacecraft.rotation + 90;

                if (this.target.satisfied) Cloud.vY = 1;
                else Cloud.vY = 0.5;
            }
            else {
                let task = this.tasks[this.taskIndex];

                if (task < 0 && this.spacecraft.rotation > task) this.spacecraft.rotation -= 0.25;
                else if (task > 0 && this.spacecraft.rotation < task) this.spacecraft.rotation += 0.25;
                else {
                    this.taskIndex++;

                    this.hint.content = "Follow the target using the left and right arrows";

                    if (this.taskIndex === 6) {
                        this.target.onCompleted = () => {
                            this.hint.content = "Hold on tight!";
                            this.target.visible = false;
                            this.taskActive = false;

                            this.addAnimation(new Animation(this.parachute, { name: "y", start: -450, end: 0 }, 4));
                            this.addAnimation(new Animation(this.spacecraft, { name: "y", start: 225, end: 675 }, 4));

                            this.addTimer(new Timer(4, () => this.game.startScene("LandscapeScene")));
                        }
                    }

                    this.target.restart();
                }
            }

            this.spacecraft.x = 400 - Math.sin(toRadians(this.spacecraft.rotation)) * 225;
            this.spacecraft.y = Math.cos(toRadians(this.spacecraft.rotation)) * 225;
        }

        this.parachute.attachmentX = this.spacecraft.x + Math.sin(toRadians(this.spacecraft.rotation)) * 30;
        this.parachute.attachmentY = this.spacecraft.y - Math.cos(toRadians(this.spacecraft.rotation)) * 30;
    }

}
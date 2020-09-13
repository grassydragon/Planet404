import { Scene } from "./engine/scene.js";
import { Planet } from "./planet.js";
import { SpaceBackground } from "./space-background.js";
import { Target } from "./target.js";
import { Engine, Spacecraft } from "./spacecraft.js";
import { Align, Baseline, Text } from "./engine/text.js";
import { Timer } from "./engine/timer.js";
import { PlanetType } from "./planet-type.js";
import { Animation } from "./engine/animation.js";
import { randomInteger } from "./random.js";

const PLANET_POSITION_SPEED = 150 / 20 / 60;

const PLANET_SCALE_SPEED = 2 / 20 / 60;

let PlanetDescriptions = new Map([
    [PlanetType.GREEN, "It is quite green!"],
    [PlanetType.DESERT, "It has many deserts!"],
    [PlanetType.ICE, "It is covered with ice!"]
]);

export class ApproachScene extends Scene {

    create() {
        this.background = new SpaceBackground(this);

        this.backgroundVX = 0;
        this.backgroundVY = 2;

        this.spacecraft = new Spacecraft(this, 400, 225);
        this.addObject(this.spacecraft);

        this.target = new Target(this, 400, 225, 60, 0, 360);
        this.target.visible = false;
        this.target.width = 60;
        this.target.duration = 5;
        this.target.onCompleted = () => {
            this.taskIndex++;

            if (this.taskIndex < 4) {
                this.target.angle = this.tasks[this.taskIndex];
                this.target.restart();
            }
            else {
                this.hint.content = "Finally, we need to slow down";
                this.backgroundVX = 0;
                this.target.angle = 90;
                this.target.onCompleted = () => {
                    this.hint.content = "Prepare for a landing";
                    this.backgroundVY = 0;
                    this.target.visible = false;
                    this.addAnimation(new Animation(this.spacecraft, { name: "y", start: 225, end: -112.5 }, 6, () => this.game.startScene("LandingScene")));
                    this.addTimer(new Timer(2, () => this.spacecraft.engine = Engine.OFF));
                };
                this.target.restart();
            }
        };
        this.addObject(this.target);

        this.planet = new Planet(this, 650, -100, this.game.planetType);
        this.planet.scale = 0;
        this.addObject(this.planet);

        this.hint = new Text(this, "We are almost where", 400, 440, 10, Align.CENTER, Baseline.BOTTOM);
        this.addText(this.hint);

        this.addAnimation(new Animation(
            this.planet,
            [
                { name: "y", start: -150, end: 150 },
                { name: "scale", start: 0, end: 1 }
                ],
            6));

        this.addTimer(new Timer(3, () => this.hint.content = "Look, there is a new planet!"));
        this.addTimer(new Timer(6, () => this.hint.content = PlanetDescriptions.get(this.game.planetType)));
        this.addTimer(new Timer(9, () => {
            this.hint.content = "Let's correct our path before landing";
            this.target.visible = true;
        }));
        this.addTimer(new Timer(12, () => {
            this.hint.content = "Follow the target using the left and right arrows";
            this.target.angle = this.tasks[this.taskIndex];
            this.target.active = true;
        }));

        this.taskIndex = 0;

        this.tasks = [30, 150, 210, 330];

        for (let i = 0; i < 4; i++) {
            let index = randomInteger(i, 3);

            let tmp = this.tasks[i];
            this.tasks[i] = this.tasks[index];
            this.tasks[index] = tmp;
        }
    }

    update() {
        this.background.move(this.backgroundVX, this.backgroundVY);

        if (this.target.active) {
            let input = this.game.input;

            if (input.left) {
                this.spacecraft.flyLeft();
                this.spacecraft.rotation -= 2;

                if (this.spacecraft.rotation < 0) this.spacecraft.rotation += 360;
            }
            else if (input.right) {
                this.spacecraft.flyRight();
                this.spacecraft.rotation += 2;

                if (this.spacecraft.rotation > 360) this.spacecraft.rotation -= 360;
            }
            else {
                this.spacecraft.flyStraight();
            }

            this.target.spacecraftAngle = (this.spacecraft.rotation + 270) % 360;

            if (this.taskIndex < 4) {
                if (this.target.satisfied) {
                    this.backgroundVX = -1;
                    this.backgroundVY = 1;

                    this.planet.x += PLANET_POSITION_SPEED;
                    this.planet.y -= PLANET_POSITION_SPEED;

                    this.planet.scale += PLANET_SCALE_SPEED;
                }
                else {
                    this.backgroundVX = -0.5;
                    this.backgroundVY = 0.5;
                }
            }
        }
    }

}
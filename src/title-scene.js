import { Scene } from "./engine/scene.js";
import { SpaceBackground } from "./space-background.js";
import { Align, Baseline, Text } from "./engine/text.js"
import { TextButton } from "./engine/text-button.js";
import { Animation } from "./engine/animation.js";

export class TitleScene extends Scene {

    create() {
        this.background = new SpaceBackground(this);

        this.title = new Text(this, "Planet 404", 400, -100, 50);
        this.addText(this.title);

        this.subtitle = new Text(this, "that is yet to be found", 508, 140, 10);
        this.subtitle.visible = false;
        this.addText(this.subtitle);

        this.credits = new Text(this, "Nikita Zaytsev js13kGames 2020", 400, 440, 10, Align.CENTER, Baseline.BOTTOM);
        this.credits.visible = false;
        this.addText(this.credits);

        this.startButton = new TextButton(this, "Start", 400, 225);
        this.startButton.visible = false;
        this.startButton.onClick = () => this.game.startScene("DepartureScene");
        this.addButton(this.startButton);

        this.addAnimation(new Animation(this.title, { name: "y", start: -100, end: 100 }, 2, () => {
            this.subtitle.visible = true;
            this.credits.visible = true;
            this.startButton.visible = true;

            this.addAnimation(new Animation(this.subtitle, { name: "alpha", start: 0, end: 1 }, 1));
            this.addAnimation(new Animation(this.credits, {name: "alpha", start: 0, end: 1 }, 1));
        }));
    }

    update() {
        this.background.move(0, 2);
    }

}
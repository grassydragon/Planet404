import { Scene } from "./engine/scene.js";
import { LandscapeBackground } from "./landscape-background.js";
import { Landscape } from "./landscape.js";
import { Engine, Spacecraft } from "./spacecraft.js";
import { Animation } from "./engine/animation.js";
import { Timer } from "./engine/timer.js";
import { Align, Baseline, Text } from "./engine/text.js";
import { TextButton } from "./engine/text-button.js";

export class LandscapeScene extends Scene {

    create() {
        this.background = new LandscapeBackground(this);

        this.landscape = new Landscape(this, 400, 450, this.game.planetType);
        this.addObject(this.landscape);

        this.spacecraft = new Spacecraft(this, 300, 545);
        this.spacecraft.engine = Engine.OFF;
        this.spacecraft.flameLength = 0;
        this.addObject(this.spacecraft);

        this.title = new Text(this, "Planet 404", 400, -100, 50);
        this.addText(this.title);

        this.hint = new Text(this, "What a beautiful view!", 400, 440, 10, Align.CENTER, Baseline.BOTTOM);
        this.hint.visible = false;
        this.addText(this.hint);

        this.homeButton = new TextButton(this, "Home", 400, 225);
        this.homeButton.visible = false;
        this.homeButton.onClick = () => this.game.startScene("TitleScene");
        this.addButton(this.homeButton);

        this.addAnimation(new Animation(this.landscape, { name: "y", start: 450, end: 225 }, 4));
        this.addAnimation(new Animation(this.spacecraft, { name: "y", start: 545, end: 320 }, 4));

        this.addTimer(new Timer(6, () => this.hint.visible = true));
        this.addTimer(new Timer(9, () => {
            this.hint.content = "Let's call this planet";
            this.addAnimation(new Animation(this.title, { name: "y", start: -100, end: 100 }, 3));
        }));
        this.addTimer(new Timer(12, () => this.hint.content = "Thanks for playing!"));
        this.addTimer(new Timer(15, () => {
            this.hint.content = "Play again to find planets of a different type";
            this.homeButton.visible = true;
        }));
    }

    update() {

    }

}
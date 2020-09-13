import { Scene } from "./engine/scene.js";
import { MapBackground } from "./map-background.js";
import { TextButton } from "./engine/text-button.js";
import { Align, Baseline, Text } from "./engine/text.js";
import { randomInteger } from "./random.js";

export class MapScene extends Scene {

    create() {
        this.background = new MapBackground(this);

        this.hint = new Text(this, "Select a place in the galaxy to explore", 400, 440, 10, Align.CENTER, Baseline.BOTTOM);

        this.addText(this.hint);

        this.goButton = new TextButton(this, "Go!", 760, 420);

        this.goButton.visible = false;

        this.goButton.onClick = () => {
            this.game.planetType = randomInteger(0, 2);
            this.game.startScene("JumpScene");
        };

        this.addButton(this.goButton);

        this.place = {
            x: 0,
            y: 0
        };
    }

    update() {

    }

    onMouseDown(point) {
        super.onMouseDown(point);

        if (!this.goButton.pressed) {
            this.place.x = Math.floor(point.x / 200);
            this.place.y = Math.floor(point.y / 150);

            this.background.place = this.place;

            this.goButton.visible = true;
        }
    }

}
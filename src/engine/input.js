const ARROW_LEFT = "ArrowLeft";

const ARROW_RIGHT = "ArrowRight";

export class Input {

    constructor() {
        this.left = false;
        this.right = false;

        document.addEventListener("keydown", (event) => {
           this.updateKey(event.key, true);
        });

        document.addEventListener("keyup", (event) => {
            this.updateKey(event.key, false);
        })
    }

    updateKey(key, pressed) {
        if (key === ARROW_LEFT) this.left = pressed;
        else if (key === ARROW_RIGHT) this.right = pressed;
    }

}
export class Scene {

    constructor(game) {
        this.game = game;

        this.background = null;
        this.objects = [];
        this.texts = [];
        this.buttons = [];
        this.animations = [];
        this.timers = [];
    }

    addObject(object) {
        this.objects.push(object);
    }

    addText(text) {
        this.texts.push(text);
    }

    addButton(button) {
        this.buttons.push(button);
    }

    addAnimation(animation) {
        this.animations.push(animation);
    }

    addTimer(timer) {
        this.timers.push(timer);
    }

    clear() {
        this.background = null;
        this.objects = [];
        this.texts = [];
        this.buttons = [];
        this.animations = [];
        this.timers = [];
    }

    create() {

    }

    updateObjects() {
        for (let object of this.objects) {
            if (object.visible) object.update();
        }
    }

    updateAnimations() {
        for (let animation of this.animations) animation.update();

        let i = 0;

        while (i < this.animations.length) {
            if (this.animations[i].completed) this.animations.splice(i, 1);
            else i++;
        }
    }

    updateTimers() {
        for (let timer of this.timers) timer.update();

        let i = 0;

        while (i < this.timers.length) {
            if (this.timers[i].completed) this.timers.splice(i, 1);
            else i++;
        }
    }

    update() {

    }

    draw() {
        if (this.background) this.background.draw();

        for (let object of this.objects) {
            if (object.visible) object.draw();
        }

        for (let text of this.texts) {
            if (text.visible) text.draw();
        }

        for (let button of this.buttons) {
            if (button.visible) button.draw();
        }
    }

    onMouseDown(point) {
        for (let button of this.buttons) {
            if (button.visible) button.onMouseDown(point);
        }
    }

    onMouseUp(point) {
        for (let button of this.buttons) {
            if (button.visible) button.onMouseUp(point);
        }
    }

}
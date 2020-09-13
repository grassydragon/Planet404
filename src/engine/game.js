import { Input } from "./input.js";

const TIME_STEP = 1 / 60;

const MAX_FRAME = TIME_STEP * 6;

export class Game {

    constructor(canvas) {
        this.canvas = canvas;

        this.canvas.addEventListener("mousedown", (event) => this.onMouseDown(event));
        this.canvas.addEventListener("mouseup", (event) => this.onMouseUp(event));

        this.context = canvas.getContext("2d");

        this.width = canvas.width;
        this.height = canvas.height;

        this.input = new Input();

        this.scenes = new Map();

        this.activeScene = null;

        this.previousTime = 0;
        this.accumulatedTime = 0;

        this.animationCallback = (time) => this.animate(time);
    }

    addScene(name, scene) {
        this.scenes.set(name, scene);
    }

    startScene(name) {
        this.activeScene = this.scenes.get(name);

        this.activeScene.clear();
        this.activeScene.create();
    }

    start() {
        requestAnimationFrame(this.animationCallback);
    }

    resize() {
        let width = window.innerWidth;
        let height = window.innerHeight;

        if (!(this.canvas.clientWidth === width && this.canvas.height <= height
            || this.canvas.clientHeight === height && this.canvas.width <= width)) {
            let aspect = this.width / this.height;

            if (width / height < aspect) {
                this.canvas.style.width = width + "px";
                this.canvas.style.height = width / aspect + "px";
            }
            else {
                this.canvas.style.width = height * aspect + "px";
                this.canvas.style.height = height + "px";
            }
        }
    }

    animate(time) {
        time /= 1000;

        if (this.previousTime === 0) this.previousTime = time;

        this.accumulatedTime += Math.min(time - this.previousTime, MAX_FRAME);
        this.previousTime = time;

        this.resize();

        while (this.accumulatedTime >= TIME_STEP) {
            this.activeScene.updateObjects();
            this.activeScene.updateAnimations();
            this.activeScene.updateTimers();
            this.activeScene.update();
            this.accumulatedTime -= TIME_STEP;
        }

        this.context.clearRect(0, 0, this.width, this.height);

        this.activeScene.draw();

        requestAnimationFrame(this.animationCallback);
    }

    calculatePoint(event) {
        let scale = this.canvas.clientWidth / this.canvas.width;
        let rect = this.canvas.getBoundingClientRect();

        return {
            x: (event.clientX - rect.x) / scale,
            y: (event.clientY - rect.y) / scale
        };
    }

    onMouseDown(event) {
        this.activeScene.onMouseDown(this.calculatePoint(event));
    }

    onMouseUp(event) {
        this.activeScene.onMouseUp(this.calculatePoint(event));
    }

}
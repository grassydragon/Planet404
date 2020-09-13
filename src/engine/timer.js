export class Timer {

    constructor(duration, onCompleted) {
        this.duration = duration;
        this.onCompleted = onCompleted;
        this.time = 0;
        this.completed = false;
    }

    update() {
        this.time += 1 / 60;

        if (this.time >= this.duration) {
            this.completed = true;
            this.onCompleted();
        }
    }

}
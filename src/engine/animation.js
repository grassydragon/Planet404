export class Animation {

    constructor(target, properties, duration, onCompleted = null) {
        this.target = target;
        this.properties = properties instanceof Array ? properties : [properties];
        this.duration = duration;
        this.onCompleted = onCompleted;
        this.time = 0;
        this.completed = false;
    }

    update() {
        this.time += 1 / 60;

        let t = Math.min(this.time / this.duration, 1);

        for (let property of this.properties) {
            this.target[property.name] = property.start * (1 - t) + property.end * t;
        }

        if (this.time >= this.duration) {
            this.completed = true;
            if (this.onCompleted) this.onCompleted();
        }
    }

}
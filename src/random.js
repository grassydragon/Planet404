export function random(min, max) {
    return min + Math.random() * (max - min);
}

export function randomInteger(min, max) {
    return Math.round(random(min, max));
}
import { PlanetType } from "./planet-type.js";

class Palette {

    constructor(mainColor, accentColor) {
        this.mainColor = mainColor;
        this.accentColor = accentColor;
    }

}

export let PlanetPalettes = new Map([
    [PlanetType.GREEN, new Palette("#23e93c", "#beff55")],
    [PlanetType.DESERT, new Palette("#ffa03f", "#e9ca44")],
    [PlanetType.ICE, new Palette("#70bdff", "#befaff")]
]);
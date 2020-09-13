import { Game } from "./engine/game.js";
import { TitleScene } from "./title-scene.js";
import { DepartureScene } from "./departure-scene.js";
import { MapScene } from "./map-scene.js";
import { JumpScene } from "./jump-scene.js";
import { ApproachScene } from "./approach-scene.js";
import { LandingScene } from "./landing-scene.js";
import { LandscapeScene } from "./lanscape-scene.js";

let canvas = document.getElementById("canvas");

let game = new Game(canvas);

game.addScene("TitleScene", new TitleScene(game));
game.addScene("DepartureScene", new DepartureScene(game));
game.addScene("MapScene", new MapScene(game));
game.addScene("JumpScene", new JumpScene(game));
game.addScene("ApproachScene", new ApproachScene(game));
game.addScene("LandingScene", new LandingScene(game));
game.addScene("LandscapeScene", new LandscapeScene(game));

game.startScene("TitleScene");
// game.startScene("DepartureScene");
// game.startScene("MapScene");
// game.startScene("JumpScene");
//game.startScene("ApproachScene");
// game.startScene("LandingScene");
//game.startScene("LandscapeScene");

game.start();

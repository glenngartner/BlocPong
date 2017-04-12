"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer = require("./renderer_config");
var Start = (function () {
    function Start() {
        if (Renderer.lib.three == true) {
            console.log("threeJS is active!");
        }
        else if (Renderer.lib.babylon == true) {
            console.log("BabylonJS is active!");
        }
        else {
            console.log("You have no renderers active!");
        }
    }
    return Start;
}());
exports.Start = Start;

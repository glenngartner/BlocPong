"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var THREE = require("three");
var Paddle = (function () {
    function Paddle(dimensions, location, scene) {
        this.dimensions = dimensions;
        this.location = location;
        this.scene = scene;
        this.mesh = this.buildMesh(dimensions);
        this.setPosition(this.mesh, location);
        this.scene.add(this.mesh);
    }
    Paddle.prototype.buildMesh = function (dims) {
        var geo = new THREE.BoxGeometry(dims.width, dims.height, dims.depth);
        var mat = new THREE.MeshBasicMaterial({ color: 0xFF0000 });
        var mesh = new THREE.Mesh(geo, mat);
        return mesh;
    };
    Paddle.prototype.setPosition = function (mesh, location) {
        mesh.position.set(location.x, location.y, location.z);
    };
    return Paddle;
}());
exports.Paddle = Paddle;

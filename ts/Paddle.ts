import * as THREE from "three";

interface dimensions {
  width: number,
  height: number,
  depth: number
}

interface location {
  x: number,
  y: number,
  z: number
}

export class Paddle {

    private mesh: THREE.Mesh;

    constructor(
        private dimensions: dimensions,
        private location: location,
        private scene: THREE.Scene) {
        this.mesh = this.buildMesh(dimensions);
        this.setPosition(this.mesh, location);
        this.scene.add(this.mesh);
    }

    buildMesh(dims: dimensions): THREE.Mesh {
        let geo = new THREE.BoxGeometry(dims.width, dims.height, dims.depth);
        let mat = new THREE.MeshBasicMaterial({color: 0xFF0000});
        let mesh = new THREE.Mesh(geo, mat);
        return mesh;
    }

    setPosition(mesh: THREE.Mesh, location:location) {
        mesh.position.set(location.x, location.y, location.z);
    }

}

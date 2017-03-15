import * as THREE from "three";

export class Paddle {

    private mesh: THREE.Mesh;

    constructor(
        private dimensions: dimensions,
        private location: location,
        private color: number,
        private scene: THREE.Scene) {
        this.mesh = this.buildMesh(dimensions, color);
        this.setPosition(this.mesh, location);
        this.scene.add(this.mesh);
    }

    buildMesh(dims: dimensions, color: number): THREE.Mesh {
        let geo = new THREE.BoxGeometry(dims.width, dims.height, dims.depth);
        let mat = this.buildMaterial(color);
        let mesh = new THREE.Mesh(geo, mat);
        return mesh;
    }

    buildMaterial(color:number):THREE.MeshStandardMaterial {
      let mat = new THREE.MeshStandardMaterial();
      mat.color = new THREE.Color(color);
      mat.roughness = 0.25; 
      return mat;
    }

    setPosition(mesh: THREE.Mesh, location:location) {
        mesh.position.set(location.x, location.y, location.z);
    }

}

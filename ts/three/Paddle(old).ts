
export class Paddle {

    private mesh: THREE.Mesh;

    constructor(
        private dims: vector3,
        private location: vector3,
        private color: number,
        private scene: THREE.Scene) {
        this.mesh = this.buildMesh(dims, color);
        this.setPosition(this.mesh, location);
        this.scene.add(this.mesh);
    }

    buildMesh(dims: vector3, color: number): THREE.Mesh {
        let geo = new THREE.BoxGeometry(dims.x, dims.y, dims.z);
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

    setPosition(mesh: THREE.Mesh, loc:vector3) {
        mesh.position.set(loc.x, loc.y, loc.z);
    }

}

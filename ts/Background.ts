/**
 * Created by glenn on 2/28/2017.
 */
export class Background {

    constructor(
        private scene: THREE.Scene,
        private radius: number = 100
    ){
        let texture = this.loadTexture();
        this.createSphereMap(radius, texture);
    }

    loadTexture(): THREE.Texture{
            let texture = new THREE.TextureLoader().load("assets/textures/OceanWithClouds.png");
            return texture;
    }

    createSphereMap(radius: number, texture: THREE.Texture) {
            let sphere = new THREE.SphereBufferGeometry(radius, 32, 16);
            let mat = new THREE.MeshBasicMaterial(
                {
                    // color: 0x0000FF,
                    map: texture,
                    side: THREE.DoubleSide,
                    shading: THREE.SmoothShading
                }
            );
            let skyBox = new THREE.Mesh(sphere, mat);
            // skyBox.scale.x = -1;
            this.scene.add(skyBox);
    }
}
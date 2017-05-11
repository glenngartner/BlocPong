import {Actor, vector3} from "../interfaces";
export class Mesh {

    private mesh: THREE.Mesh;

    constructor(private actorArray: Array<Actor>,
                private scene: THREE.Scene) {
        this.buildMesh(actorArray);
    }

    buildMesh(actors: Array<Actor>) {
        for (let actor of actors) {
            let geo: THREE.Geometry;
            let geoOutline: THREE.Geometry;
            if (actor.type == "box") {
                geo = new THREE.BoxGeometry(actor.scale.z, actor.scale.y, actor.scale.x);
                geoOutline = new THREE.BoxGeometry(actor.scale.z, actor.scale.y, actor.scale.x);
            } else if (actor.type == "sphere"){
                geo = new THREE.SphereGeometry(actor.scale.x/2, 16, 16);
                geoOutline = new THREE.SphereGeometry(actor.scale.x/2, 16, 16);
            }
            let mat = this.buildMaterial(actor.color);
            let mesh = new THREE.Mesh(geo, mat);

            // create outline mesh
            //TODO: remove this outline creation stuff, and find a post processing way to do this
            let matOutline = new THREE.MeshBasicMaterial({color: 0x000000, side:THREE.BackSide});
            let outlineMesh = new THREE.Mesh(geoOutline, matOutline);
            outlineMesh.scale.multiplyScalar(1.15);
            outlineMesh.name = "outline";

            mesh.name = actor.name;
            this.setPosition(mesh, actor.location);
            this.scene.add(mesh);
            mesh.add(outlineMesh);
            outlineMesh.visible = false;
        }
    }

    buildMaterial(color: string): THREE.MeshStandardMaterial {
        let mat = new THREE.MeshStandardMaterial();
        mat.color = new THREE.Color(color);
        mat.roughness = 0.25;
        return mat;
    }

    setPosition(mesh: THREE.Mesh, loc: vector3) {
        mesh.position.set(loc.z, loc.y, loc.x);
    }

}

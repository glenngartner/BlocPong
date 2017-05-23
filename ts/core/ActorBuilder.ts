
import {ActorManager} from "./ActorManager";
import {Actor, vector3} from "../interfaces";
/**
 * Created by glenn on 4/12/2017.
 */

export class ActorBuilder {

    // default actor values

    name: string = "noName";
    selectable: boolean = true;
    selected: boolean = false;
    draggable: boolean = false;
    isDragging: boolean = false;
    isRigidBody: boolean = false;
    type: string = "box";
    location: vector3 = {x: 0, y: 0, z: 0};
    rotation: vector3 = {x: 0, y: 0, z: 0};
    scale: vector3 = {x: 1, y: 1, z: 1};
    color: string = "#CCCCCC";
    colorTex: string;
    metal: number = 0;
    metalTex: string;
    roughness: number = 0.25;
    roughnessTex: string;
    normalTex: string;
    envColor: number = 0xCCCCCC;
    envTex: string;

    constructor(manager: ActorManager, actor: Actor) {

        for (let prop in actor) {
            if (this.hasOwnProperty(prop) && actor[prop] != null) this[prop] = actor[prop];
        }

        manager.loadActors(this);

        // if (actor.name != null) this.name = actor.name;
        // if (actor.location != null) this.location = actor.location;
        // if (actor.rotation != null)this.rotation = actor.rotation;
        // if (actor.scale != null)this.scale = actor.scale;
        // if (actor.color != null)this.color = actor.color;
        // if (actor.colorTex != null)this.colorTex = actor.colorTex;
        // if (actor.metal != null)this.metal = actor.metal;
        // if (actor.metalTex != null)this.metalTex = actor.metalTex;
        // if (actor.roughness != null)this.roughness = actor.roughness;
        // if (actor.roughnessTex != null)this.roughnessTex = actor.roughnessTex;
        // if (actor.normalTex != null)this.normalTex = actor.normalTex;
        // if (actor.envColor != null)this.envColor = actor.envColor;
        // if (actor.envTex != null)this.envTex = actor.envTex;
    }
}
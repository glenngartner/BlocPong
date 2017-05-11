import {Actor, vector3} from "../interfaces";
/**
 * Created by glenn on 5/4/2017.
 */

export class ActorManager {

    actors: Array<Actor>;

    constructor() {
        this.actors = [];
        console.log("actor manager created");
    }

    get getActors() {
        return this.actors;
    }

    loadActors(newActor: Actor) {
        this.actors.push(newActor);
        console.log(newActor.name + " loaded into Actor Manager");
    }

    changeActorPropertyValue(name: string | number, prop: string, value: string | boolean | vector3 | number) {
        for (let actor of this.actors) {

            // console.log("actor " + actor.name + " selected = " + actor.selected);

            // when receiving the selected property, reset all selected values to false, reset the selections
            if (prop === "selected") {
                actor.selected = false;
            }

            if (actor.name == name) {
                actor[prop] = value;
                console.log("actor " + actor.name + " property: '" + prop + "' is now " + actor[prop]);
            }
        }
    }
}
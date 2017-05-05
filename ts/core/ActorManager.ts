/**
 * Created by glenn on 5/4/2017.
 */

export class ActorManager {

    actors: Array<Actor>;

    constructor(){
        this.actors = [];
        console.log("actor manager created");
    }

    loadActors(newActor: Actor){
        this.actors.push(newActor);
        console.log(newActor.name + " loaded into Actor Manager");
    }

    searchActors(prop: string, value: string & boolean & vector3 & number){
        for (let actor in this.actors){
            actor[prop] = value;
            console.log("changed " + actor + " " + "property" + prop + "to " + value);
        }
    }
}
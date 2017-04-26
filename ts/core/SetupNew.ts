/**
 * Created by glenn on 4/12/2017.
 */

class SetupNew {

    renderer;

    constructor(){
        //if babylon jS == true : renderer = new BabylonPong(); d
        //if three jS == true : renderer = new ThreePong(); d
    }

    createScene(sceneColor){
        this.renderer.start(sceneColor);
    }

    // let objects: Actor {
    //     // object 1
    //     // object 2
    // }

    // createObjects(actors: Array<Actors>){
    //    this.renderer.createActors(actors);
    // }
}
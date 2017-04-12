import * as Renderer from "./renderer_config";

export class Start {

  constructor(){
    if (Renderer.lib.three == true){
      console.log("threeJS is active!");
    } else if (Renderer.lib.babylon == true){
      console.log("BabylonJS is active!");
    } else {
      console.log("You have no renderers active!"); 
    }
  }
}

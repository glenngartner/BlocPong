/**
 * Created by glenn on 4/12/2017.
 */

export class RenderFactory {

    static createActor(config: rendererConfig, actor: Actor) {
        if (config.three == true){

        }
    }

    static libSelector(config: rendererConfig): string {
        for (let lib in config) {
            if (lib.valueOf()) {
                console.log();
            }
        }
        return;
    }
}

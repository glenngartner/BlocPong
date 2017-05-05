interface rendererConfig {
    three: boolean,
    babylon: boolean
}

interface vector3 {
    x: number,
    y: number,
    z: number
}

interface Actor {
    name?: string,
    selected?: boolean,
    type?: string,
    location?: vector3,
    rotation?: vector3,
    scale?: vector3,
    color?: string,
    colorTex?: string,
    metal?: number,
    metalTex?: string,
    roughness?: number,
    roughnessTex?: string,
    normalTex?: string,
    envColor?: number,
    envTex?: string
}

interface Renderer {
    _type: string;
    createScene();
    createCamera();
    createBackground();
    createActor(actor: Actor);
    createMaterial();
    createDirectionalLight();
    addEvent();
    render();
}

interface RendererInstance extends Renderer {
    _scene;
    _camera;
    _light;
    highlightActor(actor:Actor);
    removeHighlight(actor:Actor);
    checkActorState();
}

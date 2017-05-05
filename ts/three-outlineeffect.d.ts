/**
 * Created by glenn on 5/5/2017.
 */

declare namespace THREE{
    class OutlineEffect {
        constructor(renderer: THREE.Renderer, params: any);

        defaultThickness: number;
        defaultColor: THREE.Color;
        defaultAlpha: number;
        defaultKeepAlive: boolean;
        cache: any;
        removeThresholdCount: number;
        originalMaterials: any;
        invisibleMaterial: THREE.ShaderMaterial;
    }
}
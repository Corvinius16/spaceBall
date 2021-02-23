
import * as THREE from 'three';

let color = "#55b3f1";
function createFog(){
    const fog = new THREE.Fog(color,1,20);
    return fog;
}


export {createFog};
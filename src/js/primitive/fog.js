
import * as THREE from 'three';

let color = "#151515";
function createFog(){
    const fog = new THREE.Fog(color,1,15);
    return fog;
}


export {createFog};
import * as THREE from 'three';

let color = 0xffffff ;
let intencity =0.5;

function createAmbientLight(){
    const light = new THREE.AmbientLight(color,intencity); // soft white light
    return light ;
}


export {createAmbientLight};
import * as THREE from 'three';

let color = 0xffffff;
let intencity = 1;

function createDirectionalLight(){
    const light = new THREE.DirectionalLight( color,intencity); // soft white light
    light.castShadow = true;
    return light ;
}


export {createDirectionalLight};
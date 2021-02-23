import * as THREE from 'three';

let color = 0xffffff ;
let intencity =0.5;

function createPointLight(){
    const light = new THREE.PointLight(color,intencity); // soft white light
    return light ;
}


export {createPointLight};
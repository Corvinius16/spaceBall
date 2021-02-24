import * as THREE from 'three';

let fov = 70;
let aspect = window.innerWidth / window.innerHeight;
let near = 0.1;
let far = 30;



function createCamera(){
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far );
    return camera;
}


export {createCamera};

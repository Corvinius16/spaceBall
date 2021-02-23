import * as THREE from 'three';


function createCube(){
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshPhongMaterial( {color: 0x00ff00} );
    const cube = new THREE.Mesh( geometry, material );
    cube.receiveShadow = true;
    return cube
}


export {createCube};
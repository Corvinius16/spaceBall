import * as THREE from 'three';

const color =  0xffff00;
function createConus(){
    const geometry = new THREE.ConeGeometry( 0.05, 1.5, 32 );
    const material = new THREE.MeshPhongMaterial( {color: color} );
    const cone = new THREE.Mesh( geometry, material );
    cone.receiveShadow = true;
    return cone;
}


export {createConus};
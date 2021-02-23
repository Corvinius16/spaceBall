import * as THREE from "three";

const size = 30;
const divisions = 30;


function createGrid(){
    const grid = new THREE.GridHelper( size, divisions );
    return grid;
}


export {createGrid};




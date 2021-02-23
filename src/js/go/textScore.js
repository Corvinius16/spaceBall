import * as THREE from "three";
import {GameObject} from "./gameObject";

class TextScore  extends GameObject{
    constructor(Scene,Name,text,pos){
        super(Scene,Name);
        // console.log(window.container.fontLoader.getFont("helv"));
        // let textG = new THREE.TextGeometry( "asdafs",{
        //     font: window.container.fontLoader.getFont("helv"),
        //     size: 0.1,
        //     height:0.1
        // } );
        // const material = new THREE.MeshBasicMaterial( { color: "#ffffff" } );
        // let mesh = new THREE.Mesh(textG,material);
        // mesh.position.set(0,0,0);
        // this.setThreeObject(mesh);
    }
    update(){
        
    }
}

export {TextScore};



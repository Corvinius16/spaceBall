import {GameObject} from "./gameObject";
import * as THREE from "three"
class Conus  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        let conus = window.container.modelContainer.getModel("barr").clone();
        conus.material = window.container.materialContainer.getMaterial("base").clone();
       
        conus.position.set(-100,0,0);
        this.setThreeObject(conus);

    }
    update(){
    }
}

export {Conus};



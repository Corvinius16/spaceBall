
import {GameObject} from "./gameObject";
import * as THREE from "three";
class addScoreObject  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        let conus = window.container.modelContainer.getModel("aim").clone();
        conus.material = window.container.materialContainer.getMaterial("aim").clone();      
        conus.position.set(-100,0,0);
        this.setThreeObject(conus);
    }
    update(){
        
    }

    setColor(){
        this.getThreeObject().material.color.set("#ff0000");
        this.getThreeObject().material.emissive.set("#ff0000");
    }
    ResetColor(){
        this.getThreeObject().material.color.set("#ffff00");
        this.getThreeObject().material.emissive.set("#ffff00");
    }
}

export {addScoreObject};



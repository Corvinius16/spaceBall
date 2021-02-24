
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
}

export {addScoreObject};



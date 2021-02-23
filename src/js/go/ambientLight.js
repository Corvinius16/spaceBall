import {createAmbientLight} from "../primitive/ambientLight";
import {GameObject} from "./gameObject";

class AmbientLight  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        let light = createAmbientLight();
        this.setThreeObject(light);
    }
    update(){
        
    }
}

export {AmbientLight};



import {createPointLight} from "../primitive/pointLight";
import {GameObject} from "./gameObject";

class PointLight  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        let light = createPointLight();
        this.setThreeObject(light);
    }
    update(){
        
    }
}

export {PointLight};



import {createDirectionalLight} from "../primitive/directionalLight";
import {GameObject} from "./gameObject";

class DirectionalLight  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        let light = createDirectionalLight();
        this.setThreeObject(light);
    }
    update(){
        
    }
}

export {DirectionalLight};



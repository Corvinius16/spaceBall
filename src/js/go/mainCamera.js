import {createCamera} from "../primitive/camera";
import {GameObject} from "./gameObject";
class MainCamera  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        let camera = createCamera();
        this.camera = camera;
        this.setThreeObject(camera);

    }
    update(){
    }
}

export {MainCamera};



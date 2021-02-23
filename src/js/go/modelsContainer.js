import * as THREE from "three";
import {GameObject} from "./gameObject";
import {FBXLoader} from "three/examples/jsm/loaders/FBXLoader"

class ModelLoader  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.models = new Map();
        this.count = 0;
        const loader = new FBXLoader();
        let thisObj = this;
        loader.load("models/Ball.fbx",function(obj){
            let object=obj.children[0];
            object.castShadow = true;
            object.geometry.computeBoundingBox();
            thisObj.setModel("ball",object);
         
        });
        loader.load("models/Platform.fbx",function(obj){
            let object=obj.children[0];
            object.scale.set(1,1,1);
            object.receiveShadow = true;
            thisObj.setModel("platform2",object);
        });
        loader.load("models/Barrier.fbx",function(obj){
            let object=obj.children[0];
            object.scale.set(1,1,1);
            object.receiveShadow = true;
          object.geometry.computeBoundingBox();
            thisObj.setModel("barr",object);
        });
        loader.load("models/Aim.fbx",function(obj){
            let object=obj.children[0];
            object.scale.set(1,1,1);
            object.receiveShadow = true;
            object.geometry.computeBoundingBox();
            thisObj.setModel("aim",object);
        });
    }

    setModel(name,model){
        this.models.set(name,model);
        this.count++;
        if(this.count==4){
            this.loadComplete();
        }
    }

    getModel(name){
        return this.models.get(name);
    }
 
    update(){
        
    }
}

export {ModelLoader};



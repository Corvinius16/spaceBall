import * as THREE from "three";
import {GameObject} from "./gameObject";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

class ModelLoader  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.models = new Map();
        this.count = 0;
        const loader2 = new GLTFLoader();

        let thisObj = this;
        loader2.load("./models/Platform.glb",function(obj){
            let object=obj.scene.children[0].children[0];//new THREE.InstancedMesh(obj.children[0].geometry,new THREE.MeshBasicMaterial(),100);
            object.scale.set(1,1,1);
            object.receiveShadow = true;
            thisObj.setModel("platform2",object);
        });
        loader2.load("./models/Ball.glb",function(obj){
         
            let object=obj.scene.children[0].children[0];//new THREE.InstancedMesh(obj.children[0].geometry,new THREE.MeshBasicMaterial(),100);
            object.castShadow = true;
            object.geometry.computeBoundingBox();
            thisObj.setModel("ball",object);
         
        });
        loader2.load("./models/Barrier.glb",function(obj){
            let object=obj.scene.children[0].children[0];//new THREE.InstancedMesh(obj.children[0].geometry,new THREE.MeshBasicMaterial(),100);
            object.scale.set(1,1,1);
           object.geometry.computeBoundingBox();
            thisObj.setModel("barr",object);
        });
        loader2.load("./models/Aim.glb",function(obj){
            let object=obj.scene.children[0].children[0];//new THREE.InstancedMesh(obj.children[0].geometry,new THREE.MeshBasicMaterial(),100);
            object.scale.set(1,1,1);
            object.geometry.computeBoundingBox();
            object.name="Score";
            let box = new THREE.Box3();
            let box2 = new THREE.Box3();
            box.copy( object.geometry.boundingBox ).applyMatrix4(object.matrixWorld );
            let c = new THREE.Vector3();
            let s = new THREE.Vector3();
            box.getCenter(c);
            box.getSize(s);
            s.y = 0.4;
            box2.setFromCenterAndSize(c,s)
            object.geometry.newBox = box2;
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



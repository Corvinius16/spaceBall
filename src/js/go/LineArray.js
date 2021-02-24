import * as THREE from "three";
import {GameObject} from "./gameObject";
import {Conus} from "./conus";
import * as Rand from "random-seed";
import {Line} from "./line.js"
import {BufferGeometryUtils} from "three/examples/jsm/utils/BufferGeometryUtils";
class LineArray  extends GameObject{
    constructor(Scene,Name,countL,sphere,timeSync){
        super(Scene,Name);  
        this.TimeSync = timeSync;
        this.countLine = countL;
        this.Sphere = sphere;
        this.geometry = new THREE.BufferGeometry();
        for(var i =0 ;i<this.countLine;i++){
            this.createLine(i);
        }
        let mesh = new THREE.Mesh(test, [window.container.materialContainer.getMaterial("test").clone(),window.container.materialContainer.getMaterial("aim")]);
        this.setThreeObject(mesh);
    }


    createLine(countN){
        let count = this.random(3);
        let count2 = this.randomLineByValue(count);
        let line = new Line(this.MainScene,"line",countN,count2);
        line.sphere = this.Sphere;
        line.getThreeObject().translate(0,-0.3+0.5*countN,0-2.5*countN);
        this.geometry = BufferGeometryUtils.mergeBufferGeometries([this.geometry,line.getThreeObject()],true);
    }

    sync(valueLerp){

    }



    random(v){
        let r = this.rand(v);
        return r;
    }

    randomLineByValue(val){
        if(val == 0){
            return 2;
        }
        else if(val == 1){
            return 4;
        }
        else{
            return 6;
        }
    }

    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
}

export {LineArray};



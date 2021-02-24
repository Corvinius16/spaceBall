import {GameObject} from "./gameObject";
import * as THREE from "three"
import { times } from "lodash";
class Conus  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        let conus = window.container.modelContainer.getModel("barr").clone();
        conus.material = window.container.materialContainer.getMaterial("test").clone();
        this.rotation = 0;
        this.fromY =  0.7;
        this.toY = 0.9;
        this.dir = 1;
        this.LerpY = 0;
        conus.position.set(-100,0,0);
        this.setThreeObject(conus);

    }
    update(){
        this.rotation +=this.MainScene.getDeltaTime() * 50;
        this.getThreeObject().rotation.y = -THREE.MathUtils.degToRad(this.rotation);
        if(this.dir)
        {
            this.LerpY+=this.MainScene.getDeltaTime();
            if(this.LerpY>=1){
                this.dir =false;
                this.LerpY = 1;
            }
        }
        else{
            this.LerpY-=this.MainScene.getDeltaTime();
            if(this.LerpY<=0){
                this.LerpY = 0;
                this.dir = true;
            }
        }
        this.getThreeObject().position.y = this.lerp(this.fromY,this.toY,this.LerpY);
    }
    sync(value){
        // if(value<0.5){
        //     let LerpY = this.lerp(0,1,value/0.5);
        //     this.getThreeObject().position.y = this.lerp(this.fromY,this.toY,LerpY);
        // }
        // else if(value>0.5){
        //     let LerpY = this.lerp(0,1, (value-0.5)/0.5);
        //     this.getThreeObject().position.y =this.lerp(this.toY,this.fromY,LerpY);
        // }
    }
    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
}

export {Conus};



import * as THREE from "three";
import {GameObject} from "./gameObject";
import {Conus} from "./conus";
import * as Rand from "random-seed";
import {addScoreObject} from "./addScoreObject";
import {BufferGeometryUtils} from "three/examples/jsm/utils/BufferGeometryUtils";
class Line  extends GameObject{
    constructor(Scene,Name,countL,createConusCount){
        super(Scene,Name);  
        this.start = false;
        this.clasters = 4;
        this.rand = Rand.create();
        this.targetClaster = this.rand(0,this.clasters+1);
        this.clastersArray =[0,1,2,3];
        this.isAdd = false;
        this.conus = [];
        this.countLine = countL;
        this.shuffle(this.clastersArray);
        this.createConus(createConusCount)
    }

    startMove(){
        this.target = {
            y: this.getThreeObject().position.y-0.5,
            z: this.getThreeObject().position.z+2.5
        }
        this.pos = new THREE.Vector3(0,0,0);
        this.pos.copy(this.getThreeObject().position);
        // console.log(this.pos);
    }
    update(){
       if(this.getThreeObject().position.z>2.5){
           this.Destroy();
       }
       this.conus.forEach(el=>{
        el.update();
    })
    }

    sync(valueLerp){
        if(valueLerp === 1){
            this.target = {
                y: this.getThreeObject().position.y-0.5,
                z: this.getThreeObject().position.z+2.5
            }
          
        
            this.pos.copy(this.getThreeObject().position);
            valueLerp=0;
            this.isAdd = false;
        }
        if(valueLerp>0.3){
            if(!this.isAdd)
            {
                this.countLine --;
                this.isAdd = true;
                if(this.countLine === 0){
                    this.sphere.setLine(this);
                    
                }
             }
        }
        this.conus.forEach(el=>{
            el.sync(valueLerp);
        })
        this.setPosition(valueLerp);
    }

    shuffle(array) {
        array.sort(() =>this.rand(2) - 0.5);
    }
    setPosition(t) {
        let vec = {
            y: this.lerp(this.pos.y,this.target.y,t),
            z: this.lerp(this.pos.z,this.target.z,t),
        }
        let obj = this.getThreeObject();
        obj.position.y = vec.y;
        obj.position.z = vec.z;
    }

    createConus(count){
        
        let obj = window.container.modelContainer.getModel("platform2").clone();
        obj.material = window.container.materialContainer.getMaterial("test").clone();
        
        let fromX = -1.6;
        let clustIndex = 0;
        var newClast =0;
        let test = obj;
        let geom = [];
        geom.push(test);
        for(let i=0;i<count;i++){
            if(newClast === 2)
            {
                newClast=0;
                clustIndex++;
            }
            if(clustIndex === this.targetClaster){
                clustIndex++;
                newClast = 0;
            }
            const conus = new Conus(this.MainScene,"conus");
            conus.getThreeObject().position.set(fromX + this.clastersArray[clustIndex]*0.475*2 + newClast*0.35,0.7,0);
            this.conus.push(conus);
            obj.add(conus.getThreeObject());
             newClast++;
        }
        let tS = new addScoreObject(this.MainScene,"scoreObj");
        let tSObj = tS.getThreeObject();
        tSObj.position.set( fromX + this.clastersArray[this.targetClaster]*0.45*2 + 0.25,0.35,0)
        obj.add(tSObj);
 
        this.setThreeObject(obj);

    }
    SetTimeSync(timeSync){
        this.TimeSync = timeSync;
    }
    Destroy(){
        this.getThreeObject().children.forEach(el=>{
           el.geometry.dispose();
           el.material.dispose();
        });
        this.TimeSync.DestroyObj(this);
        super.Destroy();
    }
    

    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
}

export {Line};



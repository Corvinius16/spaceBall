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
        this.boxes = [];
        this.targetBox = undefined;
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
        
        let obj = window.container.modelContainer.getModel("platform2").geometry.clone();
       // obj.material = window.container.materialContainer.getMaterial("test").clone();
        
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
            this.conus.push(conus);
            let thConus = conus.getThreeObject().geometry.clone();
            thConus.translate( fromX + this.clastersArray[clustIndex]*0.475*2 + newClast*0.35,0.7,0);
            geom.push(thConus);
            let box = thConus.boundingBox;
            this.boxes.push(box);
            newClast++;
        }
        let tS = new addScoreObject(this.MainScene,"scoreObj");
        let tSObj = tS.getThreeObject().geometry.clone();
        tSObj.translate( fromX + this.clastersArray[this.targetClaster]*0.45*2 + 0.25,0.35,0);
      
        //geom.push(tSObj);
        //let box = tS.getThreeObject().geometry.boundingBox;
        let box = new THREE.Box3();
        let c = new THREE.Vector3(fromX + this.clastersArray[this.targetClaster]*0.45*2 + 0.25,0.35,0);
        let s = new THREE.Vector3(0.5,0.7,0.5);
        box.setFromCenterAndSize(c,s)
        this.targetBox = box


        test = BufferGeometryUtils.mergeBufferGeometries(geom,true);
        test = BufferGeometryUtils.mergeBufferGeometries([test,tSObj],true);
         let mesh = new THREE.Mesh(test, [window.container.materialContainer.getMaterial("test").clone(),window.container.materialContainer.getMaterial("aim").clone()])
        mesh.receiveShadow = true;
        this.setThreeObject(mesh);

       // this.getThreeObject().add(tSObj);
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



import * as THREE from "three";
import {GameObject} from "./gameObject";
import {Conus} from "./conus";
import * as Rand from "random-seed";
import {addScoreObject} from "./addScoreObject";
class Line  extends GameObject{
    constructor(Scene,Name,countL,createConusCount,canMove){
        super(Scene,Name);  
        this.start = false;
        this.clasters = 4;
        this.rand = Rand.create();
        this.targetClaster = 0;
        this.clastersArray =[0,1,2,3];
        this.isAdd = false;
        this.conus = [];
        this.countLine = countL;
        this.startedLine = countL;
        this.MaxLine = 5;
        this.shuffle(this.clastersArray);
        this.createConus(createConusCount);
        this.moveLeftRight = false;
        this.moveR = true;
        if(canMove)
        {
            // if(window.container.lineFabric.countLine>15){
            //     if(this.rand(100)<10){
            //         let fromX = -1.6;
            //         let x = fromX + this.clastersArray[0]*0.45*2 + 0.25;
            //         this.LeftX = x - this.clastersArray[0]*0.45*2 -0.25;
            //         this.rightX = x+ (3-this.clastersArray[0])*0.45*2 ;
            //         this.delta =  this.getThreeObject().position.x - x;
            //         this.moveLeftRight = true;
            //         let dir = this.rand(1);
            //         if(dir){
            //             this.moveR = true;
            //         }
            //         else{
            //             this.moveR = false;
            //         }
                    
            //     }
            // }
        }
    }
    Reset(){
        this.countLine = this.startedLine;
        this.isAdd = false;
        this.getThreeObject().position.set(0,-0.3+0.5*(this.countLine),0-2.5*(this.countLine));
        this.startMove();
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
       this.conus.forEach(el=>{
        el.update();
    })
    }

    sync(valueLerp){
        if(valueLerp === 1){
            console.log(this.countLine);
            if(this.countLine === -1){
                this.getThreeObject().position.set(0,-0.3+0.5*this.MaxLine,0-2.5*this.MaxLine);
                this.countLine = this.MaxLine;
              
            }
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
                    console.log("asd");
                    this.sphere.setLine(this);
                }
                
             }
        }
        if(this.moveLeftRight){
          if(this.moveR){
            let obj = this.getThreeObject();
            if(obj.position.x+-this.delta< this.rightX)
            {
            obj.position.x+=1*this.MainScene.getDeltaTime();
            }
            else{
                this.moveR = false;
            }
          }
          else{
            let obj = this.getThreeObject();
            if(obj.position.x -this.delta>this.LeftX)
            {
            obj.position.x-=1*this.MainScene.getDeltaTime();
            }
            else{
                this.moveR = true;
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
            if(clustIndex === 0){
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
        tSObj.position.set( fromX + this.clastersArray[0]*0.45*2 + 0.25,0.35,0)
        this.targetClaster = this.clastersArray[0];
        obj.add(tSObj);
        this.setThreeObject(obj);
        this.scoreTaget = tS;

        let size = new THREE.Vector3(3.5,1,2);
        this.leftBox = new THREE.Box3();
        this.rightBox = new THREE.Box3();
        let leftPos = new THREE.Vector3(-3.9,0,0);
        let rightPos = new THREE.Vector3(3.9,0,0);
        this.leftBox.setFromCenterAndSize(leftPos,size);
        this.rightBox.setFromCenterAndSize(rightPos,size);
    

        // let testBox1 = new THREE.Box3Helper(leftBox,"#ff00ff");
        // let testBox2 = new THREE.Box3Helper(rightBox,"#ff00ff");
        // obj.add(testBox1);
        // obj.add(testBox2);


    }
    SetTimeSync(timeSync){
        this.TimeSync = timeSync;
    }
    Destroy(){
        // this.getThreeObject().children.forEach(el=>{
        //    el.geometry.dispose();
        //    el.material.dispose();
        // });
        // this.TimeSync.DestroyObj(this);
        // super.Destroy();
    }
    

    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
}

export {Line};



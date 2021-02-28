import * as THREE from "three";
import {GameObject} from "./gameObject";
import {Conus} from "./conus";
import * as Rand from "random-seed";
import {addScoreObject} from "./addScoreObject";
class Line  extends GameObject{
    constructor(Scene,Name,countL,canMove){
        super(Scene,Name);  
        this.start = false;
        this.clasters = 4;
        this.rand = Rand.create();
        this.targetClaster = 0;
        this.clastersArray =[0,1,2,3];
        this.isAdd = false;
        this.conus = [];
        this.countLine = countL;
        this.shuffle(this.clastersArray);
        this.createConus();
        this.moveLeftRight = false;
        this.moveR = true;
    }
    randomLeftRightMove(){
            if(this.rand(100)<10){
                let fromX = -1.6;
                let x = fromX + this.clastersArray[0]*0.45*2 + 0.25;
                this.LeftX = x - this.clastersArray[0]*0.45*2 -0.25;
                this.rightX = x+ (3-this.clastersArray[0])*0.45*2 ;
                this.delta =  this.getThreeObject().position.x - x;
                this.moveLeftRight = true;
                let dir = this.rand(1);
                if(dir){
                    this.moveR = true;
                }
                else{
                    this.moveR = false;
                }
                
            }
        
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
    //    if(this.getThreeObject().position.z>2.5){
    //        this.Destroy();
    //    }
       this.conus.forEach(el=>{
        el.update();
    })
    }



    sync(valueLerp){
        // console.log(this.countLine);
        if(valueLerp === 1){
            if(this.countLine === -1){
                this.getThreeObject().position.set(0,-0.3+0.5*5,0-2.5*5);
                this.countLine =5;
                this.isAdd= false;
                this.randomConusPosition();
                this.scoreTaget.ResetColor();
                this.moveLeftRight = false;
                this.randomLeftRightMove();
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

    createConus(){
        
        let obj = window.container.modelContainer.getModel("platform2").clone();
        obj.material = window.container.materialContainer.getMaterial("test").clone();
        
        
        let test = obj;
        let geom = [];
        geom.push(test);
        for(let i=0;i<6;i++){

            const conus = new Conus(this.MainScene,"conus");
            conus.getThreeObject().position.set(-200,0,0);
            this.conus.push(conus);
            obj.add(conus.getThreeObject());
        }
        let tS = new addScoreObject(this.MainScene,"scoreObj");
        let tSObj = tS.getThreeObject();
        tSObj.position.set(-200,0,0);
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
        let fromX = -1.6;
        this.scoreTaget.getThreeObject().position.set(fromX + this.clastersArray[0]*0.45*2 + 0.25,0.35,0);
        //this.randomConusPosition();

        // let testBox1 = new THREE.Box3Helper(leftBox,"#ff00ff");
        // let testBox2 = new THREE.Box3Helper(rightBox,"#ff00ff");
        // obj.add(testBox1);
        // obj.add(testBox2);


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

    randomConusPosition(){
        this.conus.forEach(el=>{
            el.getThreeObject().position.set(-200,0,0);
        })

        let fromX = -1.6;
        let clustIndex = 0;
        var newClast =0;

        let count = this.random(3);
        let count2 = this.randomLineByValue(count);

        this.shuffle(this.clastersArray);
        
        for(let i=0;i<count2;i++){
            if(newClast === 2)
            {
                newClast=0;
                clustIndex++;
            }
            if(clustIndex === 0){
                clustIndex++;
                newClast = 0;
            }
            this.conus[i].getThreeObject().position.set(fromX + this.clastersArray[clustIndex]*0.475*2 + newClast*0.35,0.7,0);
             newClast++;
        }
        this.scoreTaget.getThreeObject().position.set(fromX + this.clastersArray[0]*0.45*2 + 0.25,0.35,0);
 

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



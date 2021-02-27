import {GameObject} from "./gameObject";
import * as THREE from "three";

class MainSphere  extends GameObject{
    constructor(Scene,Name,gameOver,score){
        super(Scene,Name);

        //createSphere(this.readyObj.bind(this));
        
      

        this.vec=new THREE.Vector3(0,0,0);
        this.pos = new THREE.Vector3(0,0,0);
        this.delta = new THREE.Vector3(0,0,0);
        this.newPos = new THREE.Vector3(0,0,0);
        this.Score = score;
        this.move = false;
        this.fromY = 0.5;
        this.toY = 2;
        this.gameOver = gameOver;
        this.countRotation = 2;
        document.addEventListener("touchstart",this.handleStart.bind(this),false);
        document.addEventListener("touchmove", this.handleMove.bind(this), false);
        document.addEventListener("touchend",this.handleEnd.bind(this),false);
       
    }

    completeInit(){
        let obj = window.container.modelContainer.getModel("ball").clone();
        obj.material = window.container.materialContainer.getMaterial("test").clone();
        this.setThreeObject(obj);
        this.MainScene.addObject(this);
    }



    // readyObj(obj){
    //     obj.scale.set(0.3,0.3,0.3);
    //     obj.position.set(0,0.5,0);
    //     obj.geometry.computeBoundingBox();
    //     this.setThreeObject(obj);
    //     this.MainScene.addObject(this);
    //     this.initVertex();
    //     this.loadComplete();
    // }

    setLine(go){
        // go.getThreeObject().material.color.set("#f6f6f6");
        // if(this.line!=undefined)
        // {
        // this.line.getThreeObject().material.color.set(0x00ff00);
        // }
        this.line = go;

    }
    update(){
        let curr = this.object.position.x - (-1.35);
        let perc = curr/2.7;
        
        let cameraMinX = -0.6;
        let cameraMaxX = 0.6;
        let val = this.lerp(cameraMinX,cameraMaxX,perc);
        this.MainScene.getMainCamera().getThreeObject().position.x = val;
     }

    sync(valueLerp){
        if(valueLerp<0.3){
            let LerpY = this.lerp(0,1,valueLerp/0.3);
            this.getThreeObject().position.y = this.lerp(this.fromY,this.toY,LerpY);
        }
        else if(valueLerp>0.3&&valueLerp<0.7){
            this.getThreeObject().position.y = this.toY;
        }
        else if(valueLerp>0.7){
            let LerpY = this.lerp(0,1,(valueLerp-0.7)/0.3);
            this.getThreeObject().position.y = this.lerp(this.toY,this.fromY,LerpY);
        }
        if(valueLerp == 1){
            let target = false;
            if(this.line!=undefined){
                const box = new THREE.Box3();
                box.copy( this.getThreeObject().geometry.boundingBox ).applyMatrix4( this.getThreeObject().matrixWorld );
                this.line.getThreeObject().children.forEach(el=>{
                if(el.name == "Score")
                {
                    if(!el.isUsed)
                    {
                        let box2 = new THREE.Box3();
                        box2.copy( el.geometry.newBox ).applyMatrix4(el.matrixWorld );
                        var collision = box.intersectsBox (box2);
                        if(collision){
                            el.isUsed = true;
                            target = true;
                            this.line.scoreTaget.setColor();
                        }
                  
                    }
                }
                });
            }
            if(!target)
            {
                if(window.container.soundContainer.getSound("bounce1").isPlaying){
                    window.container.soundContainer.getSound("bounce1").stop();
                }
                window.container.soundContainer.getSound("bounce1").play();
            this.Score.addScore(1);
            }
            else{
                if(window.container.soundContainer.getSound("bounce2").isPlaying){
                    window.container.soundContainer.getSound("bounce2").stop();
                }
                window.container.soundContainer.getSound("bounce2").play();

                this.Score.addScore(5);
            }
        }
        let rotation = this.lerp(0,360,valueLerp);
        this.getThreeObject().rotation.x = -THREE.MathUtils.degToRad(rotation);

         if(valueLerp>0.7)
        {
            let coll = false;
            if(this.line!=undefined){
                const box = new THREE.Box3();
                box.copy( this.getThreeObject().geometry.boundingBox ).applyMatrix4( this.getThreeObject().matrixWorld );
                this.line.getThreeObject().children.forEach(el=>{
                if(el.name != "Score")
                {
                    let box2 = new THREE.Box3();
                    box2.copy( el.geometry.boundingBox ).applyMatrix4(el.matrixWorld );
                    var collision = box.intersectsBox (box2);
                    if(collision){
                        coll = true;
                    }
                }
            })
                
            }
            if(valueLerp>0.8){
                const box = new THREE.Box3();
                box.copy( this.getThreeObject().geometry.boundingBox ).applyMatrix4( this.getThreeObject().matrixWorld );
                let box2 = new THREE.Box3();
                box2.copy( this.line.leftBox ).applyMatrix4(this.line.getThreeObject().matrixWorld );
                var collision = box.intersectsBox (box2);
                if(collision){
                    coll = true;
                }
                let box3 = new THREE.Box3();
                box3.copy( this.line.rightBox ).applyMatrix4(this.line.getThreeObject().matrixWorld );
                var collision2 = box.intersectsBox (box3);
                if(collision2){
                    coll = true;
                }

            }
            if(coll){
                this.gameOver();
            }
         }
      
    }

    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
    handleEnd(event){
        this.move = false;
        this.delta= 0;
    }
    handleStart(event){
        this.move = true;
        this.delta = 0;
        this.pos.set(0,0,0);
        this.newPos.set(0,0,0);
    }
    handleMove(event){
        this.vec.set(( event.targetTouches[0].pageX / window.innerWidth) * 2 - 1,
        -( event.targetTouches[0].pageY / window.innerHeight) * 2 + 1,0.5);
        let camera = this.MainScene.getMainCamera().getThreeObject();
        this.vec.unproject(camera);

        this.vec.sub(camera.position).normalize();

        var dist = (this.getThreeObject().position.z - camera.position.z)/this.vec.z;
       
        this.newPos.copy(camera.position).add(this.vec.multiplyScalar(dist));
        if(this.pos.x !=0)
        {
        this.delta = this.newPos.x -this.pos.x;
        }
         this.pos.copy(this.newPos);
        if(this.move){
            if(this.object.position.x+this.delta>-1.35 && this.object.position.x+this.delta<1.35)
            {
                 this.object.position.x +=this.delta;
            }
           
        }
    }
}

export {MainSphere};



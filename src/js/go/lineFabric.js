
import {GameObject} from "./gameObject";
import {Line} from "./line";
import * as Rand from "random-seed";
class LineFabric  extends GameObject{
    constructor(Scene,Name,timeSync){
        super(Scene,Name);
        this.TimeSync =timeSync;
        this.rand = Rand.create();
        
    }
    
    startSync(){
        let count =this.random(3);
        let count2 = this.randomLineByValue(count);
        let line = new Line(this.MainScene,"line",5,count2);
        line.getThreeObject().position.set(0,-0.3+0.5*5,0-2.5*5);
        line.startMove();
        line.sphere = this.sphere;
        line.SetTimeSync(this.TimeSync);
    
        this.MainScene.addObject(line);
        this.TimeSync.addObject(line);
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
    sync(valueLerp){
        if(valueLerp === 1){
            let count = this.random(3);
            let count2 = this.randomLineByValue(count);
            let line = new Line(this.MainScene,"line",5,count2);
            line.sphere = this.sphere;
            line.getThreeObject().position.set(0,-0.3+0.5*5,0-2.5*5);
            line.startMove();
            line.SetTimeSync(this.TimeSync);
            this.MainScene.addObject(line);
            this.TimeSync.addObject(line);
        }
    }

 
}

export {LineFabric};



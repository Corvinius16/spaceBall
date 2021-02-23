
import {GameObject} from "./gameObject";

class TimeSync  extends GameObject{
    constructor(Scene,Name,timeT){
        super(Scene,Name);
        this.time = timeT;
        this.start= false;
        this.timeElapsed = 0;
        this.valueLerp = 0;
        this.objects = [];
    }

    DestroyObj(obj){
        var removeIndex = this.objects.map(function(item) { return item.uuid; }).indexOf(obj.uuid);
        if(removeIndex!=-1)
        {
        this.objects.splice(removeIndex, 1);
        }
    }
    update(){
        if(this.start)
        {

            if(this.timeElapsed<this.time){
                this.valueLerp = this.lerp(0,1,this.timeElapsed/this.time);
                this.timeElapsed+=this.MainScene.getDeltaTime();
            }
            else{
                this.timeElapsed = 0;
                this.valueLerp = 1;

            }
            this.objects.forEach(el=>{
                el.sync(this.valueLerp);
            })
        }
    }

    Reset(){
        this.start = false;
        this.valueLerp = 0;
        this.timeElapsed = 0;
        this.objects.splice(0,this.objects.length);
     
    }

    StartSync(){
        this.start = true;
    }

    addObject(object){
        this.objects.push(object);
    }
    lerp(start, end, t) {
        return start * (1 - t) + end * t;
    }
}

export {TimeSync};



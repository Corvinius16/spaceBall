import {GameObject} from "./gameObject";

class TimeSpeedIncrease  extends GameObject{
    constructor(Scene,Name, timeSync){
        super(Scene,Name);
        this.TimeSync = timeSync;
        this.maxTime = this.TimeSync.time;
        this.CurrentCountLine = 0;


        this.minTime = 0.4;
        this.IncreaseLineCount = 5;
        this.IncreaseTimeSpeed = 0.02;
    }
    update(){
        
    }

    sync(value){
        if(value === 1){
            if(this.TimeSync.time>this.minTime)
            {
                if(this.CurrentCountLine === this.IncreaseLineCount){
                    this.TimeSync.time -=this.IncreaseTimeSpeed;
                    // console.log(this.TimeSync.time);
                    this.CurrentCountLine = 0;
                }
                this.CurrentCountLine++;
            }
       
        }
    }

    Reset(){
        this.CurrentCountLine = 0;
        this.TimeSync.time = this.maxTime;
    }

}

export {TimeSpeedIncrease};



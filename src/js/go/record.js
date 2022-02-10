import {GameObject} from "./gameObject";
class Record  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.recordValue = 0;
        this.adsScore = 0;
        this.showAds = false;
        this.getRecordFromVK();
    }

    getRecordFromVK(){
        let thisObj = this;
        // console.log(window.container.vkBridge);
        let record = window.localStorage.getItem("record");
        if(record == undefined){
            record = 0;
        }
        thisObj.recordValue = record;
        thisObj.loadComplete();
       
    }

    setNewRecord(score){
      
        if(score>this.recordValue){
            this.recordValue = score;
            window.localStorage.setItem("record",score);
        }
    }

}

export {Record};



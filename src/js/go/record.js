import {GameObject} from "./gameObject";
class Record  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.recordValue = 0;
        this.adsScore = 0;
        this.getRecordFromYandex();
    }

    getRecordFromYandex(){
        let thisObj = this;
       if(window.container.yandex.player != undefined){
           window.container.yandex.player.getData(["record"]).then((data)=>{
               this.recordValue = data;
           })
       }
    }


    setRecordYandex(){
        if(window.container.yandex.player != undefined){
            window.container.yandex.player.setData({
                record: [this.recordValue],
            });
        }
    }
    setNewRecord(score){
        this.adsScore += score;
        if(this.adsScore>70){
            this.adsScore =0;
        }
        if(score>this.recordValue){
            this.recordValue = score;
            this.setRecordYandex();
        }
    }

}

export {Record};



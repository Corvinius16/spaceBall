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
        window.container.vkBridge.send("VKWebAppStorageGet",{"keys":["record"]}).then(data=>{
            thisObj.recordValue = data.keys[0].value;
            if(thisObj.recordValue==""){
                thisObj.recordValue = 0;
            }
            thisObj.loadComplete();
        }).catch(error=>{
            console.log(error);
            thisObj.loadComplete();
        });
    }

    setNewRecord(score){
        this.adsScore += score;
        if(this.adsScore>70){
            this.adsScore =0;
            this.showAds = true;
        }
        if(score>this.recordValue){
            this.recordValue = score;
            window.container.vkBridge.send("VKWebAppStorageSet",{"key":"record","value":String(score)});
        }
    }

}

export {Record};



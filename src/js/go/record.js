import {GameObject} from "./gameObject";
class Record  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.recordValue = 0;
        this.getRecordFromVK();
    }

    getRecordFromVK(){
        let thisObj = this;
        // console.log(window.container.vkBridge);
        window.container.vkBridge.send("VKWebAppStorageGet",{"keys":["record"]}).then(data=>{
            console.log(data);
            thisObj.recordValue = data.data.keys[0].value;
            thisObj.loadComplete();
        }).catch(error=>{
            console.log(error);
            thisObj.loadComplete();
        });
    }

    setNewRecord(score){
        if(score>this.recordValue){
            window.container.vkBridge.send("VKWebAppStorageSet",{"key":"record","value":score}).then(data=>{
                console.log(data);
            });
        }
    }

}

export {Record};



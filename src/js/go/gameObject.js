import {v4 as uuidv4} from "uuid";

class GameObject{
    constructor(Scene,name){
        this.MainScene = Scene;
        this.Name = name;
        this.uuid= uuidv4();
        let thisObj = this;
        var promise = new Promise((loadComplete,reject)=>{
            thisObj.loadComplete = loadComplete;
        });
        this.promiseInit = promise;
    }

    update(){

    }

    getLoadPromise(){
     
        return this.promiseInit;
    }

    getThreeObject(){
        return this.object;
    }

    setThreeObject(objectThree){
        this.object = objectThree;
    }


    Destroy(){
      this.MainScene.DestroyObject(this);
    }

}

export {GameObject};
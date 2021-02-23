

class LoaderObject{

    constructor(loadComplete){
        this.objects = [];
        this.loadComplete = loadComplete;
    }


    addObject(gameObject){
        this.objects.push(gameObject);
    }


    startWait(){
        var prom = [];
        var thisObj = this;
        this.objects.forEach(el=>{
            var pr = el.getLoadPromise();
            prom.push(pr);
        })
        Promise.all(prom).then(value=>{
            console.log("asdads");
            thisObj.loadComplete();
        });
    }

}

export {LoaderObject};



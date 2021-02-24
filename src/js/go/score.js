import {GameObject} from "./gameObject";

class Score  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.scoreHTML = document.querySelector(".score");
        this.score = 0;
    }
    update(){
        this.updateHTML()
    }

    addScore(count){
        this.score +=count;
        this.updateHTML();
    }

    Reset(){
        this.score = 0;
        this.updateHTML();
    }


    updateHTML(){
        this.scoreHTML.innerHTML = 1/this.MainScene.getDeltaTime();
    }
}

export {Score};



import {GameObject} from "./gameObject";
import {ScoreHtml} from "./scoreHtml";
class Score  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.scoreHTML = document.querySelector(".scoreContainer p");
        this.score = 0;
    }
    update(){
        //this.updateHTML()
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
        this.scoreHTML.innerHTML = this.score;
    }
}

export {Score};



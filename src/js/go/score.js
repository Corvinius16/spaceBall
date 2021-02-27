import {GameObject} from "./gameObject";
import {ScoreHtml} from "./scoreHtml";
class Score  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.scoreHTML = document.querySelector(".score");
        this.score = 0;
    }
    update(){
        //this.updateHTML()
    }

    addScore(count){
        this.score +=count;

        if(count!=1)
        {
        var width = window.innerWidth, height = window.innerHeight;
        var widthHalf = width / 2, heightHalf = height / 2;
        var pos = window.container.sphere.getThreeObject().position.clone();
        pos.project(this.MainScene.getMainCamera().getThreeObject());
        pos.x = ( pos.x * widthHalf ) + widthHalf;
        pos.y = - ( pos.y * heightHalf ) + heightHalf;

        let html = new ScoreHtml(pos,count);
        }
        // console.log(pos);
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



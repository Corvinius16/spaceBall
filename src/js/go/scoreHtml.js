import anime from 'animejs/lib/anime.es.js';
class ScoreHtml{
    constructor(pos,numb){
        this.position = pos;
        this.number = numb;
        this.timeDelay = 1500;
        this.createHtml();

    }

    htmlToElement(html) {
        var template = document.createElement('template');
        html = html.trim(); // Never return a text node of whitespace as the result
        template.innerHTML = html;
        return template.content.firstChild;
    }
    createHtml(){
        let el = `<div  style="opacity:1;position:absolute;top:${this.position.y}px;left:${this.position.x}px">
            <p style="font-size:120px;margin:0px;color:white">${this.number}</p>
        </div>`;
        let child =document.body.appendChild(this.htmlToElement(el));
        this.targetMove(child);
        setTimeout(function(){
            document.body.removeChild(child);
        },this.timeDelay);
    }

    targetMove(el){
        var angle = Math.random()*Math.PI*2;
        let x = Math.cos(angle)*300;
        let y = Math.sin(angle)*300;
        anime({
            targets: el,
            translateX: x,
            translateY: y,
            opacity: 0,
            duration: this.timeDelay
          });
    }

}

export {ScoreHtml}
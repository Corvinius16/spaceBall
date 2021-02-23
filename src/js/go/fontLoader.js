import * as THREE from "three";
import {GameObject} from "./gameObject";

class FontLoader  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.fonts = new Map();
        const loader = new THREE.FontLoader();
        let thisObj = this;
        loader.load('helvetiker_regular.typeface.json', function ( font ){
            thisObj.fonts.set("helv",font);
            thisObj.loadComplete();
        });
    }

    getFont(name){
        return this.fonts.get(name);
    }
    update(){
        
    }
}

export {FontLoader};



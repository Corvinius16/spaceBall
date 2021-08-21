import * as THREE from "three";
import {GameObject} from "./gameObject";

class SoundLoader  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.sounds =new Map();
        this.count = 0;
        let thisObj = this;
        this.listener = new THREE.AudioListener();
        const loader = new THREE.AudioLoader();

        loader.load("https://corvinius16.github.io/spaceBall/sounds/Ambient5.mp3",function(t){
            const sound = new THREE.Audio( thisObj.listener );
            sound.setBuffer(t);
            
            sound.setLoop(false);
            sound.setVolume(0.3);
            thisObj.loadedSound("ambient",sound);
        });
        loader.load("https://corvinius16.github.io/spaceBall/sounds/Ambient5_1.mp3",function(t){
            const sound = new THREE.Audio( thisObj.listener );
            sound.setBuffer(t);
            sound.setLoop(false);
            sound.setVolume(0.3);
            thisObj.loadedSound("ambient2",sound);
        });
        loader.load("https://corvinius16.github.io/spaceBall/sounds/Bounce1.mp3",function(t){
            const sound = new THREE.Audio( thisObj.listener );
            sound.setBuffer(t);
            sound.setVolume(1);
            thisObj.loadedSound("bounce1",sound);
        });
        loader.load("https://corvinius16.github.io/spaceBall/sounds/Bounce2.mp3",function(t){
            const sound = new THREE.Audio( thisObj.listener );
            sound.setBuffer(t);
            sound.setVolume(1);
            thisObj.loadedSound("bounce2",sound);
        });
        loader.load("https://corvinius16.github.io/spaceBall/sounds/fail.mp3",function(t){
            const sound = new THREE.Audio( thisObj.listener );
            sound.setBuffer(t);
            sound.setVolume(1);
            thisObj.loadedSound("fail",sound);
        });


    }

    loadedSound(name,t){
        this.sounds.set(name,t);
        this.count++;
        if(this.count == 5){
            this.loadComplete();
        }
    }
    
    getSound(name){
        return this.sounds.get(name);
    }
  
 
    update(){
        
    }
}

export {SoundLoader};



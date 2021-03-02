import * as THREE from 'three';
import {MainCamera} from "./go/mainCamera";


import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import {ShaderPass} from 'three/examples/jsm/postprocessing/ShaderPass';
import {CopyShader} from 'three/examples/jsm/shaders/CopyShader';
let background = new THREE.Color('#151515');


class MainScene {
    constructor(){
        let thisScene = this;
        this.scene = new THREE.Scene();
        this.scene.background = background;
        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            powerPreference: "high-performance",
            alpha:false,
            stencil: false,
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.setMainCamera(new MainCamera(this,"MainCamera"));
        this.gameObjects = [];
        this.gameObjects.push(this.camera);
        this.renderer.setPixelRatio( 1 );
        this.renderer.setSize( window.innerWidth, window.innerHeight);
        
        document.body.appendChild(this.renderer.domElement);
        var clock = new THREE.Clock();
        this.deltaTime = 0;

        function animate() {
            requestAnimationFrame( animate );
            let delta = clock.getDelta();
            if(delta>1){
                delta = 0;
            }
            thisScene.deltaTime = delta;
            thisScene.gameObjects.forEach(el=>{
               el.update();
            });
         thisScene.renderer.render( thisScene.scene, thisScene.getMainCamera().getThreeObject());
         
        }
        requestAnimationFrame( animate );


    }

    addObject(object){
        if(object.getThreeObject()!=undefined)
        {
        this.scene.add(object.getThreeObject());
        }
        this.gameObjects.push(object);
    }

    addThreeObject(object){
        this.scene.add(object);
    }

    getMainCamera(){
        return this.camera;
    }

    setMainCamera(cameraObject){
        this.camera = cameraObject;
    }

    DestroyObject(go){
        var removeIndex = this.gameObjects.map(function(item) { return item.uuid; }).indexOf(go.uuid);
        this.gameObjects.splice(removeIndex, 1);
        go.getThreeObject().geometry.dispose();
        if(Array.isArray(go.getThreeObject().material)){
            go.getThreeObject().material.forEach(el=>{
                el.dispose();
            })
        }
        else{
            go.getThreeObject().material.dispose();
        }
        
        this.scene.remove(go.getThreeObject());
        go = null;
    }

    getDeltaTime(){

        return this.deltaTime;
    }


}

export {MainScene}

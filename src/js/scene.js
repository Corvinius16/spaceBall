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
        });
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.setMainCamera(new MainCamera(this,"MainCamera"));
        this.gameObjects = [];
        this.gameObjects.push(this.camera);
        this.renderer.setPixelRatio( 0.5 );
        this.renderer.setSize( window.innerWidth, window.innerHeight);
        
        document.body.appendChild(this.renderer.domElement);
        var clock = new THREE.Clock();
        this.deltaTime = 0;
        // this.renderer.info.autoReset = false;
        // this.composer =new EffectComposer(this.renderer);
        // this.composer.setPixelRatio( 0.5 );
        // this.composer.setSize( window.innerWidth, window.innerHeight)
        // const renderPass = new RenderPass(this.scene, this.getMainCamera().getThreeObject());
        // this.composer.addPass( renderPass );
        
        // const bloom = new BloomPass(0.7, 30, 4,256);
        // this.composer.addPass( bloom );


        // let effectCopy = new ShaderPass( CopyShader );
        // this.composer.addPass( effectCopy );
        
        // effectCopy.renderToScreen = true;

        // this.renderer.autoClear = false;
        // // thisScene.renderer.debug.checkShaderErrors=false;

        function animate() {
            requestAnimationFrame( animate );
            
            // thisScene.renderer.info.reset();
            let delta = clock.getDelta();
            thisScene.deltaTime = delta;
            thisScene.gameObjects.forEach(el=>{
               el.update();
            });
            // thisScene.renderer.render();
            // thisScene.renderer.clear();
            // thisScene.composer.render();
              console.log(thisScene.renderer.info.render.calls);
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
        // if(this.deltaTime > 0.0167)
        // {
        //     this.deltaTime = 0.0167;
        // }
        return this.deltaTime;
    }


}

export {MainScene}

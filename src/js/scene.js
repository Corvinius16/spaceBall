import * as THREE from 'three';
import {MainCamera} from "./go/mainCamera";
let background = new THREE.Color('#55b3f1');


class MainScene {
    constructor(){
        let thisScene = this;
        this.scene = new THREE.Scene();
        this.scene.background = background;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.setMainCamera(new MainCamera(this,"MainCamera"));
        this.gameObjects = [];
        this.gameObjects.push(this.camera);
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild(this.renderer.domElement);
        var clock = new THREE.Clock();
        this.deltaTime = 0;

      
        // thisScene.renderer.debug.checkShaderErrors=false;

        function animate(now) {
         
	// monitored code goes here

	
            requestAnimationFrame( animate );
            let delta = clock.getDelta();
            if(delta>0.025)
            {
            console.log(delta);
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
        go.getThreeObject().material.dispose();
        this.scene.remove(go.getThreeObject());
        go = null;
    }

    getDeltaTime(){
        if(this.deltaTime > 0.0167)
        {
            this.deltaTime = 0.0167;
        }
        return this.deltaTime;
    }


}

export {MainScene}

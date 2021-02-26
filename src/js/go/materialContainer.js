import * as THREE from "three";
import {GameObject} from "./gameObject";

class MaterialLoader  extends GameObject{
    constructor(Scene,Name){
        super(Scene,Name);
        this.materials = new Map();
        this.textures =new Map();
        this.count = 0;
        let thisObj = this;

        const loader = new THREE.TextureLoader();

        loader.load("textures/diffuse.png",function(t){
            thisObj.loadedTexture("base",t);
        });
        loader.load("textures/texture_master_mat_Emissive.png",function(t){
            thisObj.loadedTexture("emmisive",t);
        })

    }

    loadedTexture(name,t){
        this.textures.set(name,t);
        this.count++;
        if(this.count == 2){
         this.initMaterials();
        }
    }
    initMaterials(){
        let aimMat = new THREE.MeshLambertMaterial({
            color: "#ffff00",
            emissive: "#ffff00",
            emissiveIntensity: 5

        });
        let testMat= new THREE.MeshStandardMaterial({
            emissiveMap: this.getTexture("emmisive"),
            emissive: "#ffffff",
            emissiveIntensity: 2,
            map: this.getTexture("base"),
        });
        this.materials.set("test",testMat);
        this.materials.set("aim",aimMat);
        this.loadComplete();
    }
    getMaterial(name){
        return this.materials.get(name);
    }
    getTexture(name){
        return this.textures.get(name);
    }
 
    update(){
        
    }
}

export {MaterialLoader};



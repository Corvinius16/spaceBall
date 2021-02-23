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

        loader.load("textures/texture_master_mat_BaseColor.png",function(t){
            thisObj.loadedTexture("base",t);
        });
        loader.load("textures/texture_master_mat_Emissive.png",function(t){
            thisObj.loadedTexture("emmisive",t);
        })
        loader.load("textures/texture_master_mat_Metallic.png",function(t){
            thisObj.loadedTexture("met",t);
        })
        loader.load("textures/texture_master_mat_Normal.png",function(t){
            thisObj.loadedTexture("normal",t);
        })
        loader.load("textures/texture_master_mat_Roughness.png",function(t){
            thisObj.loadedTexture("rough",t);
        })
    }

    loadedTexture(name,t){
        this.textures.set(name,t);
        this.count++;
        if(this.count == 5){
         this.initMaterials();
        }
    }
    initMaterials(){
        let sphereMaterial = new THREE.MeshStandardMaterial({
            emissiveMap: this.getTexture("emmisive"),
            emissive: "#ffffff",
            map: this.getTexture("base"),
            metalnessMap: this.getTexture("met"),
            roughnessMap: this.getTexture("rough"),
            normalMap: this.getTexture("normal")
        })
        this.materials.set("base",sphereMaterial);
        let aimMat = new THREE.MeshLambertMaterial({
            color: "#ffff00"
        });
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



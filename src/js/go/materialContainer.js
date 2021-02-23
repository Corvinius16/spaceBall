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

        loader.load("textures/texture_master_mat_BaseColor.png",function(texture){
            thisObj.loadedTexture("base",texture);
        });
        loader.load("textures/texture_master_mat_Emissive.png",function(texture){
            thisObj.loadedTexture("emmisive",texture);
        })
        loader.load("textures/texture_master_mat_Metallic.png",function(texture){
            thisObj.loadedTexture("met",texture);
        })
        loader.load("textures/texture_master_mat_Normal.png",function(texture){
            thisObj.loadedTexture("normal",texture);
        })
        loader.load("textures/texture_master_mat_Roughness.png",function(texture){
            thisObj.loadedTexture("rough",texture);
        })
    }

    loadedTexture(name,texture){
        this.textures.set(name,texture);
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
            color: "#ffff00",
            emissive: "#ffff00",
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



import * as THREE from "three";

import {MainScene} from "./js/scene";
import {MainSphere} from "./js/go/mainSphere";
import { Line } from "./js/go/line";
import {AmbientLight} from "./js/go/ambientLight";
import {DirectionalLight} from "./js/go/directionLight";
import {createFog} from "./js/primitive/fog";
import {TimeSync} from "./js/go/TimeSync";
import {LineFabric} from "./js/go/lineFabric";
import {LoaderObject} from "./js/helpers/loader";
import {Score} from "./js/go/score";
import {TimeSpeedIncrease} from "./js/go/timeSpeedIncrease";
import {FontLoader} from "./js/go/fontLoader";
import {Container} from "./js/go/Container";
import {ModelLoader} from "./js/go/modelsContainer";
import {MaterialLoader} from "./js/go/materialContainer";
import {SoundLoader} from "./js/go/soundLoader";
import bridge from '@vkontakte/vk-bridge';
import {UrlParser} from "./js/helpers/UrlParser"

bridge.send('VKWebAppInit', {});

let scene = new MainScene();
let deathGif = document.querySelector(".death");
let timeSync;
//let lineFabric;
let loader;
let sphere;
let score;
let timeSpeedIncrease;
// let fontLoader;
let staticObject;
let modelContainer;
let materialContainer;
let soundContainer;
let parser = new UrlParser();
parser.parseUri();
THREE.Cache.enabled = true;

function initEnvironment(){
    scene.scene.fog = createFog();
    staticObject = new Container();
    let camera = scene.getMainCamera();
    camera.getThreeObject().rotation.set(-0.2,0,0);
    camera.getThreeObject().position.set(0,2.5,4);
    timeSync = new TimeSync(scene,"timeSync",0.8);
    staticObject.timeSync = timeSync;
   // lineFabric = new LineFabric(scene,"lineFabric",timeSync);
  //  staticObject.lineFabric = lineFabric;
    modelContainer = new ModelLoader(scene,"modelLoader");
    materialContainer = new MaterialLoader(scene,"materialLoader");
    soundContainer = new SoundLoader(scene,"soundLoader");
    camera.getThreeObject().add(soundContainer.listener);
    staticObject.soundContainer = soundContainer;
    staticObject.materialContainer = materialContainer;
    staticObject.modelContainer = modelContainer;
    loader = new LoaderObject(startGame);
    score = new Score(scene,"score",sphere);
    timeSpeedIncrease = new TimeSpeedIncrease(scene,"timeSpeed",timeSync);
  //  timeSync.addObject(lineFabric);
    timeSync.addObject(timeSpeedIncrease);
    scene.addObject(score);
    scene.addObject(timeSync);
   // scene.addObject(lineFabric);
    
window.container = staticObject;

}


function initStartGameObjects(){
    sphere = new MainSphere(scene,"MainSphere",deathAnimation,score);
    staticObject.sphere = sphere;
    timeSync.addObject(sphere);
  //  lineFabric.sphere = sphere;
    loader.addObject(modelContainer);
    loader.addObject(materialContainer);
    loader.addObject(soundContainer);
    let light = new AmbientLight(scene,"AmbientLight");
    let dLight = new DirectionalLight(scene,"DirectionalLight");
    dLight.getThreeObject().position.set(0,10,0);
    scene.addObject(dLight);
    scene.addObject(light);
    loader.startWait();
   
}


let menu =  document.querySelector("#mainCl");


function startGame(){
    menu.addEventListener("click",Start);
    sphere.completeInit();
    soundContainer.getSound("ambient").onEnded= newAudioSecond;
    InitPositions();
    soundContainer.getSound("ambient2").onEnded = newAudioFirst;
}
function newAudioFirst(){
  
    if(soundContainer.getSound("ambient2").isPlaying)
    {
    soundContainer.getSound("ambient2").stop();
    }
    soundContainer.getSound("ambient").play();
}
function newAudioSecond(){
    if(soundContainer.getSound("ambient").isPlaying){
        soundContainer.getSound("ambient").stop();
    }
    soundContainer.getSound("ambient2").play();
}

function Start(){
    menu.classList.toggle("hide");
   // InitPositions();
 //   lineFabric.startSync();
    timeSync.StartSync();
    soundContainer.getSound("ambient").play();
    // sphere.getThreeObject().position.set(0,2,0)
}



function InitPositions(){
    sphere.getThreeObject().position.set(0,0,0);
    let line = new Line(scene,"line",0);
    line.sphere = sphere;
    line.SetTimeSync(timeSync);
    line.getThreeObject().position.set(0,-0.3,0);
    line.startMove();
    scene.addObject(line);
    timeSync.addObject(line);
    for (var i = 1; i<6; i++) {
        let countC = 0;
        if(i>2){
           countC = 2;
        }
        let line = new Line(scene,"line",i,countC);
        line.sphere = sphere;
        line.SetTimeSync(timeSync);
        line.getThreeObject().position.set(0,-0.3+0.5*i,0-2.5*i);
        line.startMove();
        scene.addObject(line);
        timeSync.addObject(line);
    }
}
function deathAnimation(){
    var width = window.innerWidth, height = window.innerHeight;
    var widthHalf = width / 2, heightHalf = height / 2;
    var pos = window.container.sphere.getThreeObject().position.clone();
    pos.project(scene.getMainCamera().getThreeObject());
    pos.x = ( pos.x * widthHalf ) + widthHalf;
    pos.y = - ( pos.y * heightHalf ) + heightHalf;
    let src = deathGif.src;
    deathGif.src = "";
    deathGif.src = src;
    deathGif.classList.toggle("hide");
    deathGif.style.left= pos.x - 170+"px";
    deathGif.style.top = pos.y - 170 + "px";
    timeSync.Reset();
    window.container.sphere.getThreeObject().visible =false;
    soundContainer.getSound("fail").play();
    if(soundContainer.getSound("ambient").isPlaying){
        soundContainer.getSound("ambient").stop();

    }
    if(soundContainer.getSound("ambient2").isPlaying)
    {
    soundContainer.getSound("ambient2").stop();
    }
    setTimeout(function(){
       deathGif.classList.toggle("hide");
       window.container.sphere.getThreeObject().visible =true;
        clearAll()
    },1000);
}
function clearAll(){

    bridge.send("VKWebAppShowNativeAds", {ad_format:"preloader"}).then(data => console.log(data.result))
    .catch(error => console.log(error));
    //timeSync.Reset();
    //timeSync.addObject(lineFabric);
    //timeSync.addObject(sphere);
    //timeSync.addObject(timeSpeedIncrease);
  
    
    timeSpeedIncrease.Reset();
   // lineFabric.Reset();
    sphere.line = undefined;
    score.Reset();
    scene.gameObjects.forEach(el=>{
        if(el.Name ==="line"){
            el.Reset();
        }
    })
   
   menu.classList.toggle("hide");
}



initEnvironment();
initStartGameObjects();
// scene.addThreeObject(createGrid());


import * as THREE from 'three';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { data } from 'autoprefixer';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z+=5;
scene.background=new THREE.Color(0x0a0a0a);
/**
 * 1.FOV How Hide Is UR Camera
 * 2.Aspect Ratio
 * 3. Near Clip : Seberapa Dekat Kamera Bisa Melihat
 * 4. Far Clip : Seberapa Jauh Kamera Bisa Melihat
 */

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild( renderer.domElement );

var controls = new OrbitControls(camera, renderer.domElement);
var grid=new THREE.GridHelper(100,100,0x0a0a0a,0x000000);
grid.position.set(0,-0.5,0);
scene.add(grid);

let kendali=new Object();
kendali.x=1;
kendali.y=1;
kendali.z=2;

let gui=new GUI();
gui.add(kendali,"x",-4,4,0.1);
gui.add(kendali,"y",-4,4);
gui.add(kendali,"z",-4,4);

//Raycasting
let rayCast=new THREE.Raycaster();
let mouse={};
let selected;
let arrow=new THREE.ArrowHelper(rayCast.ray.direction,camera.position,10,0xff0000);
scene.add(arrow);

addEventListener("mousedown",(e)=>{
    mouse.x=(e.clientX/window.innerWidth)*2-1;//normalization koordinat x mouse
    mouse.y=(e.clientY/window.innerHeight)*-2+1;//normalization koordinat y mouse

    arrow.setDirection(rayCast.ray.direction);
    //console.log(mouse);

    rayCast.setFromCamera(mouse,camera);
    let items=rayCast.intersectObjects(scene.children);
    items.forEach((i)=>{
        if(i.object.name!=""){
            //console.log(i.object.name);
            selected=i.object;
        }
    })
})

let pLight=new THREE.PointLight(0xffffff,1);
pLight.position.set(1,1,2);
scene.add(pLight);
scene.add(new THREE.PointLightHelper(pLight,0.1,0xff0000));

let cGeo=new THREE.BoxGeometry(1,1,1);
let cMat=new THREE.MeshLambertMaterial({color:0xff0000});
let cMesh=new THREE.Mesh(cGeo,cMat);
cMesh.position.set(2,0,0);
cMesh.name="cube1";
scene.add(cMesh);

let cGeo2=new THREE.BoxGeometry(1,1,1);
let cMat2=new THREE.MeshLambertMaterial({color:0xff0000});
let cMesh2=new THREE.Mesh(cGeo2,cMat2);
cMesh2.position.set(-2,0,0);
cMesh2.name="cube2";
//cMesh2.matrixAutoUpdate=false;
scene.add(cMesh2);

let planeGeo=new THREE.PlaneGeometry(100,100);
let planeMesh=new THREE.Mesh(planeGeo,new THREE.MeshBasicMaterial({color:0xffffff}));
planeMesh.rotation.x -=Math.PI/2;
planeMesh.position.y -=0.5;
scene.add(planeMesh);

let angle=0;

const animate = function () {
    if(selected!=undefined){
        selected.rotation.x +=0.01;
    }
    requestAnimationFrame( animate );
    pLight.position.set(kendali.x,kendali.y,kendali.z);
    renderer.render( scene, camera );
};

animate();

window.addEventListener('resize',function(){
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect=this.window.innerWidth/ this.window.innerHeight;
    camera.updateProjectionMatrix();
})


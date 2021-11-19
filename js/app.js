import * as THREE from 'three';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';


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

var controls=new THREE.OrbitControls(camera,renderer.domElement);
var grid=new THREE.GridHelper(100,100,0x0a0a0a,0x000000);
grid.position.set(0,-0.5,0);
scene.add(grid);

const box = new THREE.BoxGeometry(1,1,1);
const grassTexture=new THREE.TextureLoader().load('./assets/texture/grass.jpg');
const alphaTexture=new THREE.TextureLoader().load('./assets/texture/alphatexture.jpg');
const brickTexture=new THREE.TextureLoader().load('./assets/texture/brick.jpg');

//box1
const boxMat = new THREE.MeshBasicMaterial({ 
            map:grassTexture,
            color: 0x00ff00
            } );
const boxMesh = new THREE.Mesh( box, boxMat );
scene.add( boxMesh );

//box2
let light1=new THREE.PointLight(0xffffff,1);
light1.position.set(1,-2,2);
scene.add(light1);
scene.add(new THREE.PointLightHelper(light1,0.2,0x00ff00));

let light2=new THREE.PointLight(0xffffff,1);
light2.position.set(2,2,2);
scene.add(light2);
scene.add(new THREE.PointLightHelper(light2,0.2,0x00ff00));

var ambient=new THREE.AmbientLight(0xf22000);
scene.add(ambient);

var directionalLight=new THREE.DirectionalLight(0x00ff00,0.5);
directionalLight.position.set(2,2,0);
// directionalLight.target.position.set(4,2,0);
// directionalLight.target.updateMatrixWorld();
scene.add(directionalLight);
scene.add(new THREE.DirectionalLightHelper(directionalLight));

var spotLight=new THREE.SpotLight(0x0000ff,0.5,5);
spotLight.position.set(2,2,0);
spotLight.target.position.set(3,2,0);
spotLight.target.updateMatrixWorld();
scene.add(spotLight);
scene.add(new THREE.SpotLightHelper(spotLight));

const boxMat2 = new THREE.MeshLambertMaterial({ 
            map:grassTexture,
            emissive: 0x00ff00,
            emissiveIntensity:0.2,
            emissiveMap:alphaTexture,
            } );

const boxMesh2 = new THREE.Mesh( box, boxMat2 );
boxMesh2.position.set(2,0,0);
scene.add( boxMesh2 );



//box3
const boxMat3 = new THREE.MeshPhongMaterial({ 
    map:grassTexture,
    shininess:100,
    bumpMap:brickTexture,
    bumpScale:0.01

    } );
const boxMesh3 = new THREE.Mesh( box, boxMat3 );
boxMesh3.position.set(-2,0,0);
scene.add( boxMesh3 );



camera.position.z = 5;

const animate = function () {
     requestAnimationFrame( animate );
     boxMesh.rotation.x += 0.01;
     boxMesh.rotation.y += 0.01;

     boxMesh2.rotation.x += 0.01;
     boxMesh2.rotation.y += 0.01;

     boxMesh3.rotation.x += 0.01;
     boxMesh3.rotation.y += 0.01;
     renderer.render( scene, camera );
};

animate();

window.addEventListener('resize',function(){
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect=this.window.innerWidth/ this.window.innerHeight;
    camera.updateProjectionMatrix();
})


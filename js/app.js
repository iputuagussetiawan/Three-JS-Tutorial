import * as THREE from 'three';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.01, 10 );
camera.position.z=1;
scene.background=new THREE.Color(0x0a0a0a);
/**
 * 1.FOV How Hide Is UR Camera
 * 2.Aspect Ratio
 * 3. Near Clip : Seberapa Dekat Kamera Bisa Melihat
 * 4. Far Clip : Seberapa Jauh Kamera Bisa Melihat
 */

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild( renderer.domElement );
camera.position.z = 5;

const light=new THREE.AmbientLight(0xffffff,1);
scene.add(light);
const loader=new GLTFLoader("./assets/gltf/drone/scene.gltf",(result)=>{
    console.log(result);
    let model=result.scene;
    scene.add(model);
});


const animate = function () {
    requestAnimationFrame( animate );
    //pLight.position.set(kendali.x,kendali.y,kendali.z);
    // cMesh.rotation.x += 0.01;
    // cMesh.rotation.y += 0.01;
    renderer.render( scene, camera );
};

animate();

window.addEventListener('resize',function(){
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
    camera.aspect=this.window.innerWidth/ this.window.innerHeight;
    camera.updateProjectionMatrix();
})


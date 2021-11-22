import * as THREE from 'three';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import gsap from 'gsap';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.01, 100 );
camera.position.z=5;
camera.rotation.z=1;
scene.background=new THREE.Color(0x272727);
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


let ambian= new THREE.AmbientLight(0xffffff,2);
scene.add(ambian);

let drone;
let loader =new GLTFLoader().load('./assets/gltf/drone/drone.glb',function(result){
    console.log(result);
    drone=result.scene.children[0];
    drone.scale.set(.45,.45,.45);
    scene.add(drone);

    gsap.to(camera.position,{
        z:1,
        duration:1,
        ease:"back.out(1.7)",
    })
    gsap.to(camera.rotation,{
        z:0,
        duration:1,
    })
    gsap.to(drone.rotation,{
        x:-0.5,
        duration:1,
        delay:1
    })
    gsap.to(drone.rotation,{
        z:Math.PI,
        duration:2,
        delay:1
    })
    gsap.to(drone.scale,{
        x:.25,
        y:.25,
        z:.25,
        duration:1,
        delay:1
    })
    gsap.to(drone.position,{
        x:.35,
        y:.1,
        //duration:1,
        delay:1
    })
});


const animate = function () {
    requestAnimationFrame( animate );
    //pLight.position.set(kendali.x,kendali.y,kendali.z);
    //drone.rotation.z += 0.01;
    // cMesh.rotation.y += 0.01;
    renderer.render( scene, camera );
};

animate();

window.addEventListener('resize',function(){
    camera.aspect=this.window.innerWidth/ this.window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(this.window.innerWidth, this.window.innerHeight);
})


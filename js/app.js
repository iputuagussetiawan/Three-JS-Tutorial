import * as THREE from 'three';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 100 );
/**
 * 1.FOV How Hide Is UR Camera
 * 2.Aspect Ratio
 * 3. Near Clip : Seberapa Dekat Kamera Bisa Melihat
 * 4. Far Clip : Seberapa Jauh Kamera Bisa Melihat
 */

 const renderer = new THREE.WebGLRenderer();
 renderer.setSize( window.innerWidth, window.innerHeight );
 document.body.appendChild( renderer.domElement );

 const box = new THREE.BoxGeometry(1,1,1);
 const boxMat = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
 const boxMesh = new THREE.Mesh( box, boxMat );
 scene.add( boxMesh );

 camera.position.z = 5;

 const animate = function () {
     requestAnimationFrame( animate );
     boxMesh.rotation.x += 0.01;
     boxMesh.rotation.y += 0.01;
     renderer.render( scene, camera );
 };

 animate();

 window.addEventListener('resize',function(){
     renderer.setSize(this.window.innerWidth, this.window.innerHeight);
     camera.aspect=this.window.innerWidth/ this.window.innerHeight;
     camera.updateProjectionMatrix();
 })


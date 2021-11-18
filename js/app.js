import * as THREE from 'three';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';

let scene;
let camera;
let renderer;
let house;
let model_container = document.querySelector('.webgl');
const canvasSize = document.querySelector('.canvas-element');

const stats = new Stats()
document.body.appendChild(stats.domElement);

const init = () => {
    // scene setup
    scene = new THREE.Scene();

    //camera setup
    const fov = 40;
    const aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    const near = 0.1;
    const far = 1000;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(0, 0, 50);
    camera.lookAt(scene.position);
    scene.add(camera);

    //renderer setup
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: model_container
    });
    
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    //orbitcontrol setup
    const controls = new OrbitControls(camera, renderer.domElement);

    // ambient light setup
    const amibientLight = new THREE.AmbientLight(0x404040, 2);
    scene.add(amibientLight);

    // direction lights setup
    const spotLight1 = new THREE.SpotLight(0x1d27f0, 5);
    spotLight1.position.set(6, 11, 6);
    spotLight1.castShadow = true;
    const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1, 1, 0x00ff00);
    scene.add(spotLight1);

    // orenge light setup
    const spotLight2 = new THREE.SpotLight(0xf57d22, 2);
    spotLight2.position.set(-10, 0, 12);
    spotLight2.castShadow = true;
    const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 2, 0x00ff00);
    scene.add(spotLight2);

    // back light setup
    const spotLight3 = new THREE.SpotLight(0x1d27f0, 2);
    spotLight3.position.set(-10, 18, -17);
    spotLight3.castShadow = true;
    const spotLightHelper3 = new THREE.SpotLightHelper(spotLight3, 2, 0xff0000);
    scene.add(spotLight3);


    // helper code for setting light position
    const gui = new GUI();

    // blue light controls
    const blueLight = gui.addFolder('BlueLight');
    blueLight.add(spotLight1.position, "x", -30, 30, 1);
    blueLight.add(spotLight1.position, "y", -30, 30, 1);
    blueLight.add(spotLight1.position, "z", -30, 30, 1);

    // orenge light controls
    const orengeLight = gui.addFolder('OrengeLight');
    orengeLight.add(spotLight2.position, "x", -40, 40, 1);
    orengeLight.add(spotLight2.position, "y", -40, 40, 1);
    orengeLight.add(spotLight2.position, "z", -40, 40, 1);

    // back light controls
    const backLight = gui.addFolder('BackLight');
    backLight.add(spotLight3.position, "x", -40, 40, 1);
    backLight.add(spotLight3.position, "y", -40, 40, 1);
    backLight.add(spotLight3.position, "z", -40, 40, 1);

    // loding gltf 3d model
    const loader = new GLTFLoader();
    loader.load('./assets/gltf/viking/scene.glb', (gltf) => {
        house = gltf.scene.children[0];
        house.scale.set(0.4, 0.4, 0.4)
        house.position.set(0, -1.3, 0)
        house.rotation.x = Math.PI / -3
        scene.add(gltf.scene);
    });

    animate();
}

// redering scene and camera
const render = () => {
    renderer.render(scene, camera);
}

// animation recursive function
let step = 0
let currentTimeLine=window.pageYOffset / 3000;
let aimTimeLine=window.pageYOffset / 3000;
const animate = () => {
    requestAnimationFrame(animate);
    //step += 0.02;
    //house.position.y =  2*Math.abs(Math.sin(step));
    // console.log(2*Math.abs(Math.sin(step)))
    //house.rotation.y = Math.sin(step)*(Math.abs(Math.cos(step / 3) / 4));

    currentTimeLine +=(aimTimeLine-currentTimeLine) * 0.01;

    //console.log(currentTimeLine)
     const rx=currentTimeLine* -0.5+0.5;
     const ry=(currentTimeLine * 0.9 + 0.1) * Math.PI*2;
    //house.rotation.set(0,0,currentTimeLine);

    house.rotation.z = ry;

    //const rx=currentTimeLine* Math.abs(Math.sin(step));
    //const ry=(currentTimeLine * 0.9 + 0.1) * Math.abs(Math.sin(step));
    //house.rotation.z += 0.05;
    // house.rotation.x = 0.01;
	// house.rotation.y += 0.01;
    //house.rotation.set(0.01,0.01,0)
	//renderer.render( scene, camera );

    render();
    //stats.update();
}

//console.log(Math.sin(10));

// making responsive
const windowResize = () => {
    camera.aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    render();
}

window.addEventListener('resize', windowResize, false);
window.onload = init;

window.addEventListener("scroll",function(){
    aimTimeLine=window.pageYOffset / 3000;
})


// const book=document.querySelector(".book");
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
// renderer.setSize( window.innerWidth, window.innerHeight );
// book.appendChild( renderer.domElement );

// const ambiantLight= new THREE.AmbientLight( 0x222222 );
// scene.add( ambiantLight );

// const directionalLight = new THREE.DirectionalLight( 0xffffff);
// directionalLight.position.set(0,0,6);
// scene.add( directionalLight );

// const texture = new THREE.TextureLoader();
// const urls=[
//     "/assets/images/book/left.png","/assets/images/book/right.png",
//     "/assets/images/book/top.png","/assets/images/book/bottom.png",
//     "/assets/images/book/front.png","/assets/images/book/back.png"
// ]
// const materials=urls.map(url=>{
//     return new THREE.MeshLambertMaterial({
//         map:texture.load(url)
//     })
// })
// // immediately use the texture for material creation
// //const material = new THREE.MeshBasicMaterial( { map: texture } );

// const geometry = new THREE.BoxGeometry(3.5,5,0.5);
// const material = new THREE.MeshLambertMaterial({ 
//     map: texture.load('/assets/images/book/front.png') 
// } );
// const cube = new THREE.Mesh( geometry, materials );
// scene.add( cube );

// camera.position.z = 6;
// let currentTimeLine=window.pageYOffset / 3000;
// let aimTimeLine=window.pageYOffset / 3000;
// function animate() {
// 	requestAnimationFrame( animate );
//     // cube.rotation.x += 0.01;
//     // cube.rotation.y += 0.01;
//     currentTimeLine +=(aimTimeLine-currentTimeLine) * 0.1;
//     //const currentTimeLine=window.pageYOffset / 3000
//     const rx=currentTimeLine* -0.5+0.5;
//     const ry=(currentTimeLine * 0.9 + 0.1) * Math.PI*2;
//     cube.rotation.set(rx,ry,0)
// 	renderer.render( scene, camera );
// }
// animate();
// window.addEventListener("scroll",function(){
//     aimTimeLine=window.pageYOffset / 3000;
// })
import * as THREE from 'three';
import gsap from 'gsap';
import { Scene } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
    el: document.querySelector('[data-scroll-container]'),
    smooth: true
});

const speed_scroll=500;
var tl = gsap.timeline({defaults:{duration: 1}});


let scene;
let camera;
let renderer;
let objectModel;
let model_container = document.querySelector('.webgl');
const canvasSize = document.querySelector('.canvas-element');

const stats = new Stats()
document.body.appendChild(stats.domElement);



const init = () => {
    // scene setup
    scene = new THREE.Scene();
    scene.add(new THREE.AxesHelper(5))

    //camera setup
    const fov = 40;
    const aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    const near = 0.01;
    const far = 100;

    camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.z=10;
    camera.rotation.z=1;
    //camera.lookAt(scene.position);
    scene.add(camera);

    //renderer setup
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        canvas: model_container
    });
    
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    // renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
    // renderer.autoClear = false;
    renderer.setClearColor(0x000000, 0.0);

    //orbitcontrol setup
    const controls = new OrbitControls(camera, renderer.domElement);

    // ambient light setup
    //const amibientLight = new THREE.AmbientLight(0x404040, 2);
    const amibientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(amibientLight);

    // direction lights setup
    //const spotLight1 = new THREE.SpotLight(0x1d27f0, 5);
    const spotLight1 = new THREE.SpotLight(0xffffff, 5);
    spotLight1.position.set(6, 11, 6);
    spotLight1.castShadow = true;
    const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1, 1, 0x00ff00);
    scene.add(spotLight1);

    // orenge light setup
    //const spotLight2 = new THREE.SpotLight(0xf57d22, 2);
    const spotLight2 = new THREE.SpotLight(0xffffff, 2);
    spotLight2.position.set(-10, 0, 12);
    spotLight2.castShadow = true;
    const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2, 2, 0x00ff00);
    scene.add(spotLight2);

    // back light setup
    //const spotLight3 = new THREE.SpotLight(0x1d27f0, 2);
    const spotLight3 = new THREE.SpotLight(0xffffff, 2);
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
    loader.load('./assets/gltf/drone/drone.glb', (gltf) => {
        objectModel = gltf.scene.children[0];
        objectModel.scale.set(1, 1, 1)
        objectModel.position.set(0, 0, 0)
        ///house.position.set(-6.5, -7, 0)
       
        scene.add(gltf.scene);


        gsap.to(camera.position,{
            z:4,
            duration:1,
            ease:"back.out(1.7)",
        })
        gsap.to(camera.rotation,{
            z:0,
            duration:1,
        })

        gsap.to(objectModel.rotation,{
            x:-0.5,
            duration:1,
            delay:1
        })
        gsap.to(objectModel.rotation,{
            z:Math.PI,
            duration:2,
            delay:1
        })
        gsap.fromTo(".main-content", 
            {
                opacity: 0,
                y:-50
            }, 
            {
                opacity: 1, 
                y:0,
                duration: 1,
                delay:2
            }
        );
    });
    animate();   
}



const render = () => {
    renderer.render(scene, camera);
}

// animation recursive function
let currentTimeLine=window.pageYOffset / 500;
let aimTimeLine=window.pageYOffset / 500;
const animate = () => {
    //renderer.render(scene,camera);
    requestAnimationFrame(animate);
    currentTimeLine +=(aimTimeLine-currentTimeLine) * 0.1;
    const rz=(currentTimeLine * 0.9 + 0.1) * Math.PI*2;
    if(objectModel){
       objectModel.rotation.z = rz;
    }
    render();
}
// making responsive
const windowResize = () => {
    camera.aspect = canvasSize.offsetWidth / canvasSize.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasSize.offsetWidth, canvasSize.offsetHeight);
    render();
}

window.addEventListener('resize', windowResize, false)
// scroll.on('scroll', (args) => {
//     // Get all current elements : args.currentElements
//     aimTimeLine=window.pageYOffset / 500;
//     console.log(window.pageYOffset);
// });

scroll.on("scroll", (obj) => {
    console.log(obj.scroll.y);
    aimTimeLine=obj.scroll.y / 500;
  });
// window.addEventListener("scroll",function(){
//     aimTimeLine=window.pageYOffset / 500;
//     console.log(aimTimeLine);
// })
window.onload = init;



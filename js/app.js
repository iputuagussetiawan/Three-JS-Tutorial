import * as THREE from 'three';
import { Scene } from 'three';
const book=document.querySelector(".book");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
book.appendChild( renderer.domElement );

const ambiantLight= new THREE.AmbientLight( 0x222222 );
scene.add( ambiantLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff);
directionalLight.position.set(0,0,6);
scene.add( directionalLight );

const texture = new THREE.TextureLoader();
const urls=[
    "/assets/images/book/left.png","/assets/images/book/right.png",
    "/assets/images/book/top.png","/assets/images/book/bottom.png",
    "/assets/images/book/front.png","/assets/images/book/back.png"
]
const materials=urls.map(url=>{
    return new THREE.MeshLambertMaterial({
        map:texture.load(url)
    })
})
// immediately use the texture for material creation
//const material = new THREE.MeshBasicMaterial( { map: texture } );

const geometry = new THREE.BoxGeometry(3.5,5,0.5);
const material = new THREE.MeshLambertMaterial({ 
    map: texture.load('/assets/images/book/front.png') 
} );
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 6;
let currentTimeLine=window.pageYOffset / 3000;
let aimTimeLine=window.pageYOffset / 3000;
function animate() {
	requestAnimationFrame( animate );
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    currentTimeLine +=(aimTimeLine-currentTimeLine) * 0.1;
    //const currentTimeLine=window.pageYOffset / 3000
    const rx=currentTimeLine* -0.5+0.5;
    const ry=(currentTimeLine * 0.9 + 0.1) * Math.PI*2;
    cube.rotation.set(rx,ry,0)
	renderer.render( scene, camera );
}
animate();
window.addEventListener("scroll",function(){
    aimTimeLine=window.pageYOffset / 3000;
})
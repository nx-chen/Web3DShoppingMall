/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class ShoppingArea extends Component {

    componentDidMount() {
        this.init()
    }

    init = () => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.x = 4;
        camera.position.z = 5;
        camera.position.y = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const control = new OrbitControls(camera, renderer.domElement)
        scene.background = new THREE.Color(0xfefee7);

        const ambientLight = new THREE.AmbientLight(0xffffff,1);

        ambientLight.castShadow = true;
        scene.add(ambientLight);

        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.control = control

        renderer.setSize(window.innerWidth, window.innerHeight);
        this.mount.appendChild(renderer.domElement);

        this.createFloor();
        this.addAntiqueBookcase();
        this.animate();
    }

    addAntiqueBookcase = () => {
        const loader = new GLTFLoader()

        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/')
        loader.setDRACOLoader(dracoLoader)
        loader.load(
            'Assets/Meubles/antique_dresser.glb',
            (gltf) => {
                gltf.scene.traverse(function (child) {
                    if (child.isMesh) {
                        const m = child
                        m.receiveShadow = true
                        m.castShadow = true
                    }
               
                })
                gltf.scene.position.set(-1.5, 0, -1);
                this.modelReady = true;
                this.scene.add(gltf.scene);

            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log(error)
            }
        )

    }

    createFloor = () => {
        const floorMat = new THREE.MeshStandardMaterial({
            roughness: 0.8,
            color: 0xfefee7,
            metalness: 0.2,
            bumpScale: 0.0005,
        });
        /*
        const textureLoader1 = new THREE.TextureLoader();
        textureLoader1.load('Assets/Textures/hardwood2_diffuse.png', function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(5, 12);
            map.encoding = THREE.sRGBEncoding;
            floorMat.map = map;
            floorMat.needsUpdate = true;

        });
        const textureLoader2 = new THREE.TextureLoader();
        textureLoader2.load('Assets/Textures/hardwood2_bump.png', function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(5, 12);
            floorMat.bumpMap = map;
            floorMat.needsUpdate = true;

        });
        const textureLoader3 = new THREE.TextureLoader();
        textureLoader3.load('Assets/Textures/hardwood2_roughness.png', function (map) {
            map.wrapS = THREE.RepeatWrapping;
            map.wrapT = THREE.RepeatWrapping;
            map.anisotropy = 4;
            map.repeat.set(5, 12);
            floorMat.roughnessMap = map;
            floorMat.needsUpdate = true;

        });
        */
        const floorGeometry = new THREE.PlaneGeometry(50, 50);
        //const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const floorMesh = new THREE.Mesh(floorGeometry, floorMat);
        floorMesh.receiveShadow = true;
        floorMesh.rotation.x = - Math.PI / 2.0;
        this.scene.add(floorMesh);
    }

    animate = () => {
        requestAnimationFrame(this.animate);
        this.renderer.render(this.scene, this.camera);

        this.control.update()
    }

    componentWillUnmount() {
        this.mount.removeChild(this.renderer.domElement)
    }
    render() {
        return (
            <div
                id="canvas"
                style={{ width: '100%', height: '100%', background: '#FFFFFF' }}
                ref={(mount) => { this.mount = mount }}
            />
        );
    }
}
//   ReactDOM.render(<Scene />, document.getElementById('canvas'))

export default ShoppingArea;
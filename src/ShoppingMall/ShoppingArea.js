/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class ShoppingArea extends Component {

    state = {
        productSrc:"Assets/Meubles/antique_dresser_blue.glb"
    };

    componentDidMount() {
        this.init()
        this.setState({
            productSrc: this.props.productSrc,
        })
    }

    componentDidUpdate(prevProps) {
        console.log("----",this.props.productSrc);
        if (prevProps.productSrc !== this.props.productSrc) {
            this.setState({  productSrc: this.props.productSrc, });
        }
    }

    init = () => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.x = 4;
        camera.position.z = 5;
        camera.position.y = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        const control = new OrbitControls(camera, renderer.domElement)
        scene.background = new THREE.Color(0xffffff);

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
            this.props.productSrc,
            (gltf) => {
                gltf.scene.traverse(function (child) {
                    if (child.isMesh) {
                        const m = child
                        m.receiveShadow = true
                        m.castShadow = true
                    }
               
                })
        
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
        const floorGeometry = new THREE.PlaneGeometry(3, 3);
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
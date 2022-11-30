/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

class ShoppingAreaTest extends Component {

    state = {
        productSrc: "Assets/Meubles/antique_dresser_blue.glb"
    };

    componentDidMount() {
        this.init()
        this.setState({
            productSrc: this.props.productSrc,
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.productSrc !== prevProps.productSrc) {
            this.setState({ productSrc: this.props.productSrc });
            console.log("coucou",this.state.productSrc);
        }

    }

    init = () => {
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.x = 4;
        camera.position.z = 5;
        camera.position.y = 4;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;


        const control = new OrbitControls(camera, renderer.domElement)
        scene.background = new THREE.Color(0xffffff);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1);

        ambientLight.castShadow = true;
        scene.add(ambientLight);


        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.control = control


        this.mount.appendChild(renderer.domElement);
        this.setMeuble(this.state.productSrc);
        this.createFloor();
        this.animate();
        

        window.addEventListener('resize',(e)=>{
            this.camera.aspect = window.innerWidth /  window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth,window.innerHeight);
        });
    }

    setMeuble = (meublePath) => {
        return new Promise((resolve, reject)=>{
            const loader = new GLTFLoader()

            loader.load(
                meublePath,
                (gltf) => {
                    console.log(gltf)
                    /*
                    gltf.scene.traverse(function (child) {
                        if (child.isMesh) {
                            const m = child
                            m.receiveShadow = true
                            m.castShadow = true
                        }
                        if (child.isLight) {
                            const l = child
                            l.castShadow = true
                            l.shadow.bias = -0.003
                            l.shadow.mapSize.width = 2048
                            l.shadow.mapSize.height = 2048
                        }
                    })*/
                    this.model = gltf.scene;
                    this.scene.add(this.model);
                    resolve(this.modelReady = true);
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
                },
                (error) => {
                    console.log(error)
                }
            )
        })
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

export default ShoppingAreaTest;
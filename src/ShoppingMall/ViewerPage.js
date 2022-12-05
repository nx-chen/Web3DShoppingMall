import React, { useRef, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './style/ViewerPage.css';

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


const ViewerPage = () => {
    const { state } = useLocation();

    const mountRef = useRef(null);

    const products = [
        { id: 0, name: "Antique Dresser Blue", assetPath: "Assets/Meubles/antique_dresser_blue.glb" },
        { id: 1, name: "Antique Dresser Green", assetPath: "Assets/Meubles/antique_green_v3.glb" },
        { id: 2, name: "Grand Classic Edwardian Dining Armchair", assetPath: "Assets/Meubles/edwardian_chair_v3.glb" },
        { id: 3, name: "Victorian Chair", assetPath: "Assets/Meubles/victorian_chair_v2.glb" },
        { id: 4, name: "Victorian Desk", assetPath: "Assets/Meubles/victorian_desk_with_props.glb" },
    ];

    const [productSelectedId, setProductSelectedId] = useState(state.id);


    const prevButton = () => {
        if(productSelectedId === 0)
            setProductSelectedId(products.length - 1);        
        else
            setProductSelectedId(productSelectedId - 1);
            
    }
    const nextButton = () => {
        if(productSelectedId === products.length - 1)
            setProductSelectedId(0);
        else
            setProductSelectedId(productSelectedId + 1);
    }

    // to remove srolling
    document.body.style.overflow = "hidden";

    useEffect(() => {

        const { current } = mountRef;

        if (!current) {
            return;
        }

        var scene = new THREE.Scene();
        
        var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer({antialias: true});

        renderer.setSize( window.innerWidth* 0.75, window.innerHeight * 0.9 );
        renderer.setPixelRatio( window.devicePixelRatio );
        /*renderer.toneMapping = THREE.ACESFilmicToneMapping;
		renderer.toneMappingExposure = 1;*/
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        

        const environment = new RoomEnvironment();
        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        scene.background = new THREE.Color( 0xbfe3dd );
		scene.environment = pmremGenerator.fromScene( environment ).texture;

        camera.position.y = 0.1;
        camera.position.z = 5;

        const loader = new GLTFLoader();
        loader.load(
            products[productSelectedId].assetPath,
            (gltf) => 
            {
                gltf.scene.traverse(
                    (child) => {
                        if(child instanceof THREE.Mesh)
                        {
                            child.castShadow = true;
                        }
                    }
                );
                scene.add(gltf.scene);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => 
            {  
                console.log(error);
            }
        );

        //shadow

        /*const ground = new THREE.Mesh( new THREE.PlaneGeometry( 100, 100 ), new THREE.MeshPhongMaterial( { color: 0x999999, depthWrite: false } ) );
		ground.rotation.x = - Math.PI / 2;
		ground.position.y = -1;
        ground.position.z = 0;
        ground.position.x = 0;
		ground.receiveShadow = true;
		scene.add( ground );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
		hemiLight.position.set( 0, 100, 0 );
		scene.add( hemiLight );

        const dirLight = new THREE.DirectionalLight( 0xffffff );
		dirLight.position.set( - 0, 40, 50 );
		dirLight.castShadow = true;
		dirLight.shadow.camera.top = 50;
		dirLight.shadow.camera.bottom = - 25;
		dirLight.shadow.camera.left = - 25;
		dirLight.shadow.camera.right = 25;
		dirLight.shadow.camera.near = 0.1;
		dirLight.shadow.camera.far = 200;
		dirLight.shadow.mapSize.set( 1024, 1024 );
		scene.add( dirLight );*/

        //scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );

        function checkRotation(){

            var rotSpeed = .02
            var x = camera.position.x,
              y = camera.position.y,
              z = camera.position.z;
            camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
            camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);      
            camera.lookAt(scene.position);
          
        }

        var animate = function () {
            requestAnimationFrame( animate );
            checkRotation();
            renderer.render( scene, camera );
        }

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth * 0.75, window.innerHeight*0.9 );
        }

        window.addEventListener("resize", onWindowResize, false);

        animate();
      
        return () => current.removeChild(renderer.domElement);

    }, [productSelectedId]);

    return (
        <div className='viewerPage'>

            <div id="scene-container">
                <div ref={mountRef} id="canva"></div>
                <div id="button-container">
                    <button onClick={prevButton} id="previous">
                        <FontAwesomeIcon icon={faChevronLeft} size="5x" color='gray'/>
                    </button>
                    <button onClick={nextButton} id="next">
                        <FontAwesomeIcon icon={faChevronRight} size="5x" color='gray'/>
                    </button>
                </div>                
            </div>

            <div id="info">
                <h3>{products[productSelectedId].name}</h3>
            </div>
        </div>
    );
}

export default ViewerPage;
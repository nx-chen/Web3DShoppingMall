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
import { faBars } from '@fortawesome/free-solid-svg-icons';

const ViewerPage = () => {
    const { state } = useLocation();

    const mountRef = useRef(null);

    const products = [
        //armoires
        { id: 0, name: "Antique dresser blue", assetPath: "Assets/Meubles/antique_dresser_blue.glb" },
        { id: 1, name: "Antique dresser green", assetPath: "Assets/Meubles/antique_green_v3.glb" },
        { id: 2, name: "Antique wardrobe", assetPath: "Assets/Meubles/antique_wardrobe.glb" },
        { id: 3, name: "Bedside table", assetPath: "Assets/Meubles/bedside_table_2.glb" },
        //tables
        { id: 4, name: "Antique desk", assetPath: "Assets/Meubles/antique_desk.glb" },
        { id: 5, name: "Old Table", assetPath: "Assets/Meubles/old_table.glb" },
        { id: 6, name: "Table", assetPath: "Assets/Meubles/table.glb" },
        { id: 7, name: "Wooden center table", assetPath: "Assets/Meubles/wooden_center_table.glb" },
        { id: 8, name: "Victorian desk", assetPath: "Assets/Meubles/victorian_desk_with_props.glb" },
        { id: 9, name: "Small table", assetPath: "Assets/Meubles/small_table.glb" },
        //sofas chaises
        { id: 10, name: "Chesterfield sofa", assetPath: "Assets/Meubles/chesterfield-sofa.glb" },
        { id: 11, name: "Mercury chair", assetPath: "Assets/Meubles/mercury_chair_regency_period.glb" },
        { id: 12, name: "Grand classic Edwardian Dining Armchair", assetPath: "Assets/Meubles/edwardian_chair_v3.glb" },
        { id: 13, name: "Victorian Chair", assetPath: "Assets/Meubles/victorian_chair_v2.glb" },
        { id: 14, name: "Couch", assetPath: "Assets/Meubles/couch.glb" },
        //autres
        { id: 15, name: "Old gramophone", assetPath: "Assets/Meubles/old_gramophone.glb" },
        { id: 16, name: "Vintage gramophone", assetPath: "Assets/Meubles/vintage_gramophone.glb" },
        { id: 17, name: "Rocking horse with wheels", assetPath: "Assets/Meubles/rocking_horse_with_wheels.glb" },
        { id: 18, name: "Standing bird cage", assetPath: "Assets/Meubles/standing_bird_cage.glb" },
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
    let lastTime = new Date().getTime();

    useEffect(() => {

        const { current } = mountRef;

        if (!current) {
            return;
        }

        var scene = new THREE.Scene();
        
        var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer({antialias: true});

        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.setPixelRatio( window.devicePixelRatio );
		renderer.outputEncoding = THREE.sRGBEncoding;
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        

        const environment = new RoomEnvironment();
        const pmremGenerator = new THREE.PMREMGenerator( renderer );

        scene.background = new THREE.Color( 0xbfe3dd );
		scene.environment = pmremGenerator.fromScene( environment ).texture;

        const ground = new THREE.Mesh( 
            new THREE.PlaneGeometry( 8, 8 ), 
            new THREE.MeshPhongMaterial( { color: 0xbfe3dd, depthWrite: false } ) );
		ground.rotation.x = - Math.PI / 2;

		camera.position.x = 1;
        camera.position.z = 8;
        camera.position.y = 4;
        camera.lookAt(0, 0, 0);

		ground.receiveShadow = true;
		scene.add( ground );

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

        const dirLight = new THREE.DirectionalLight( 0xbfe3dd, 1.45 );
		dirLight.position.set( -10, 20, 20 );
		dirLight.castShadow = true;
		dirLight.shadow.camera.near = 0.1;
		dirLight.shadow.camera.far = 200;
		dirLight.shadow.mapSize.set( 8000, 8000 );
        dirLight.shadow.bias = -0.00005;
        dirLight.shadow.normalBias = -0.00001;
		scene.add( dirLight );

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
            testTime();
            renderer.render( scene, camera );
        }

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize( window.innerWidth, window.innerHeight );
        }

        window.addEventListener("resize", onWindowResize, false);

        animate();

        

        window.addEventListener('mousemove', function() {
            lastTime = new Date().getTime();
        })

        var turnTime = window.setInterval(testTime, 10);

        var timeOut = 30 * 1000;

        function testTime() {
            var currentTime = new Date().getTime();
            if (currentTime - lastTime > timeOut) {
                checkRotation();
                window.clearInterval(turnTime)
            }

        }

         
        return () => { 

            scene.traverse((child) => {
                const mesh = child;
                if (mesh.isMesh) {
                  mesh.geometry.dispose();
                  const materials = Array.isArray(mesh.material) ? mesh.material : [ mesh.material ];
                  for (const mat of materials) {
                    mat.dispose();
                    console.log("dispose");
                  }
                }
            })

            window.removeEventListener("resize", onWindowResize, false);
            window.removeEventListener('mousemove', function() {
                lastTime = new Date().getTime();
            });

            if(renderer){
                renderer.forceContextLoss();
                renderer.dispose();
                //renderer=undefined;
                console.log("Renderer: " + renderer);
            }
            current.removeChild(renderer.domElement);
        };

    }, [productSelectedId]);

    return (
        <div className='viewerPage'>

            <div id="scene-container">
                <div id="titleArea">
                    <span id="title">{products[productSelectedId].name}</span>
                </div>
                <button id="back">
                    <FontAwesomeIcon icon={faBars} size="5x" color='#5d7a76'/>
                </button>   
                <div ref={mountRef} id="canva"></div>
                <button onClick={prevButton} id="previous" className='btnChangePage'>
                    <FontAwesomeIcon icon={faChevronLeft} size="5x" color='#5d7a76'/>
                </button>
                <button onClick={nextButton} id="next" className='btnChangePage'>
                    <FontAwesomeIcon icon={faChevronRight} size="5x" color='#5d7a76'/>
                </button>              
            </div>

        </div>
    );
}

export default ViewerPage;
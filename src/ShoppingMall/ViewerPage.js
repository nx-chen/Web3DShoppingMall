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
        { id: 0, name: "Antique dresser blue", assetPath: "Assets/Meubles/antique_dresser_blue.glb", describe: ["The best dresser you can find", "Made of wood", "Color vivid"] },
        { id: 1, name: "Antique dresser green", assetPath: "Assets/Meubles/antique_green_v3.glb", describe: ["Dresser antique", "Made of wood", "Color vivid"] },
        { id: 2, name: "Antique wardrobe", assetPath: "Assets/Meubles/antique_wardrobe.glb", describe: ["The best wardrobe you can find", "Made of wood", "Color vivid"] },
        { id: 3, name: "Bedside table", assetPath: "Assets/Meubles/bedside_table_2.glb", describe: ["Little bedside table for your bedroom", "Made of wood", "Color vivid"] },
        //tables
        { id: 4, name: "Antique desk", assetPath: "Assets/Meubles/antique_desk.glb", describe: ["The best desk antique you can find", "Made of wood", "Color vivid"] },
        { id: 5, name: "Old Table", assetPath: "Assets/Meubles/old_table.glb", describe: ["Table anitique", "Made of wood", "Color vivid"] },
        { id: 6, name: "Table", assetPath: "Assets/Meubles/table.glb", describe: ["Lovely table", "Made of wood", "Color vivid"] },
        { id: 7, name: "Wooden center table", assetPath: "Assets/Meubles/wooden_center_table.glb", describe: ["The best table for your dining room", "Made of wood", "Color vivid"] },
        { id: 8, name: "Victorian desk", assetPath: "Assets/Meubles/victorian_desk_with_props.glb", describe: ["The best desk you can find", "Made of wood", "Color vivid"] },
        { id: 9, name: "Small table", assetPath: "Assets/Meubles/small_table.glb", describe: ["Little table suitable for you", "Made of wood", "Color vivid"] },
        //sofas chaises
        { id: 10, name: "Chesterfield sofa", assetPath: "Assets/Meubles/chesterfield-sofa.glb", describe: ["The best sofa you can find", "Comfortable", "Color vivid"] },
        { id: 11, name: "Mercury chair", assetPath: "Assets/Meubles/mercury_chair_regency_period.glb", describe: ["The best Chair for your home", "Made of wood", "Color vivid"] },
        { id: 12, name: "Grand classic Edwardian Dining Armchair", assetPath: "Assets/Meubles/edwardian_chair_v3.glb", describe: ["The best Chair for your dining room", "Made of wood", "Color vivid"] },
        { id: 13, name: "Victorian Chair", assetPath: "Assets/Meubles/victorian_chair_v2.glb", describe: ["The best Chair for your dining room", "Made of wood", "Color vivid"] },
        { id: 14, name: "Couch", assetPath: "Assets/Meubles/couch.glb", describe: ["The best couch you can find", "Comfortable", "Made for whole family"] },
        //autres
        { id: 15, name: "Old gramophone", assetPath: "Assets/Meubles/old_gramophone.glb", describe: ["The gramophone antique", "Play your music", "Color vivid"] },
        { id: 16, name: "Vintage gramophone", assetPath: "Assets/Meubles/vintage_gramophone.glb", describe: ["The best gramophone you can find", "Play your music", "Color vivid"] },
        { id: 17, name: "Rocking horse with wheels", assetPath: "Assets/Meubles/rocking_horse_with_wheels.glb", describe: ["The best rocking horse for your kids", "Made of wood", "Color vivid"] },
        { id: 18, name: "Standing bird cage", assetPath: "Assets/Meubles/standing_bird_cage.glb", describe: ["The best bird cage you can find", "Beautiful and classic", "Color vivid"] },
    ];
    const [productSelectedId, setProductSelectedId] = useState(state.id);
    const [description, setDescription] = useState(0);

    const prevButton = () => {
        if (productSelectedId === 0)
            setProductSelectedId(products.length - 1);
        else
            setProductSelectedId(productSelectedId - 1);

    }
    const nextButton = () => {
        if (productSelectedId === products.length - 1)
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


        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

        var renderer = new THREE.WebGLRenderer({ antialias: true });

        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        
        current.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);

        controls.maxDistance = 10;

        controls.listenToKeyEvents(renderer.domElement)


        const environment = new RoomEnvironment();
        const pmremGenerator = new THREE.PMREMGenerator(renderer);

        scene.background = new THREE.Color(0xbfe3dd);
        scene.environment = pmremGenerator.fromScene(environment).texture;

        const ground = new THREE.Mesh(
            new THREE.PlaneGeometry(8, 8),
            new THREE.MeshPhongMaterial({ color: 0xbfe3dd, depthWrite: false }));
        ground.rotation.x = - Math.PI / 2;

        camera.position.x = 1;
        camera.position.z = 8;
        camera.position.y = 4;
        camera.lookAt(0, 0, 0);

        ground.receiveShadow = true;
        scene.add(ground);

        const loader = new GLTFLoader();
        loader.load(
            products[productSelectedId].assetPath,
            (gltf) => {
                gltf.scene.traverse(
                    (child) => {
                        if (child instanceof THREE.Mesh) {
                            child.castShadow = true;
                        }
                    }
                );
                scene.add(gltf.scene);
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
            },
            (error) => {
                console.log(error);
            }
        );

        //shadow

        const dirLight = new THREE.DirectionalLight(0xbfe3dd, 1.45);
        dirLight.position.set(-10, 20, 20);
        dirLight.castShadow = true;
        dirLight.shadow.camera.near = 0.1;
        dirLight.shadow.camera.far = 200;
        dirLight.shadow.mapSize.set(8000, 8000);
        dirLight.shadow.bias = -0.00005;
        dirLight.shadow.normalBias = -0.00001;
        scene.add(dirLight);

        //scene.add( new THREE.CameraHelper( dirLight.shadow.camera ) );


        // Rotation
        function checkRotation(){

            var rotSpeed = .01
            
            var x = camera.position.x,
                y = camera.position.y,
                z = camera.position.z;
            camera.position.x = x * Math.cos(rotSpeed) - z * Math.sin(rotSpeed);
            camera.position.z = z * Math.cos(rotSpeed) + x * Math.sin(rotSpeed);
            camera.lookAt(scene.position);

        }

        // Zoom on double click

        const mouse = new THREE.Vector2();

        function zoomCam(event)
        {
            event.preventDefault();
            const canvas = renderer.domElement;
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;

            const dir = new THREE.Vector3((event.clientX / w) * 2.0 - 1.0, -((event.clientY / h) * 2.0 - 1.0, -1));
            dir.unproject(camera);

            mouse.set(
                (event.clientX / w) * 2.0 - 1.0,
                -((event.clientY / h) * 2.0 - 1.0));

            var raycaster = new THREE.Raycaster();
            raycaster.setFromCamera(mouse, camera);

            var intersects = raycaster.intersectObjects(scene.children, true);
            console.log("intersects: " + intersects)
            if (intersects && intersects.length > 0)
            {
                controls.target.set(intersects[0].point.x,intersects[0].point.y,intersects[0].point.z);
                controls.maxDistance = 2;
                controls.update();
                controls.maxDistance = 10;
            }
        }

        renderer.domElement.addEventListener('dblclick', zoomCam);
    

        // annotation
        const canvas = document.getElementById('number');
        const ctx = canvas.getContext('2d');
        const x = 32;
        const y = 32;
        const radius = 30;
        const startAngle = 0;
        const endAngle = Math.PI * 2;

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.fill();

        ctx.strokeStyle = 'rgb(255, 255, 255)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(x, y, radius, startAngle, endAngle);
        ctx.stroke();

        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.font = '32px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('1', x, y);

        const numberTexture = new THREE.CanvasTexture(document.getElementById("number"));
        const spriteMaterial = new THREE.SpriteMaterial({
            map: numberTexture,
            alphaTest: 0,
            transparent: true,
            depthTest: false,
            depthWrite: false });

        const sprite = new THREE.Sprite(spriteMaterial);
        sprite.position.set(250, 250, 250);
        sprite.scale.set(0, 0, 0);

        const annotation = document.getElementById("annotation");

        function updateScreenPosition() {
            const vector = new THREE.Vector3(0.5, 0.2, 0.2);
            const canvas = renderer.domElement;
        
            vector.project(camera);
        
            vector.x = Math.round((0.5 + vector.x / 2) * (canvas.width / window.devicePixelRatio));
            vector.y = Math.round((0.5 - vector.y / 2) * (canvas.height / window.devicePixelRatio));
        
            annotation.style.top = `${vector.y}px`;
            annotation.style.left = `${vector.x}px`;
            annotation.style.opacity = 1;
        }


        var animate = function () {
            requestAnimationFrame( animate );
            testTime();          
            renderer.render( scene, camera );
            updateScreenPosition();

        }

        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener("resize", onWindowResize, false);

        animate();

        window.addEventListener('mousemove', function () {

            lastTime = new Date().getTime();
            console.log(camera.position);

            if (camera.position.x <= 8 &&  camera.position.z >= 2 && camera.position.x >= -1 && camera.position.z <= 9)
{
    setDescription(0);
}
else if (camera.position.x <=-1 &&  camera.position.x >= -6)
{
    setDescription(1);
} else {
    setDescription(2);
}

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
                    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
                    for (const mat of materials) {
                        mat.dispose();
                        console.log("dispose");
                    }
                }
            })

            current.removeChild(renderer.domElement);

            window.removeEventListener("resize", onWindowResize, false);
            window.removeEventListener('mousemove', function () {
                lastTime = new Date().getTime();
            });

            renderer.domElement.removeEventListener('dblclick', zoomCam);

            /*if(renderer){

                renderer.forceContextLoss();
                renderer.dispose();
                //renderer=undefined;
                console.log("Renderer: " + renderer);
            }*/         
        };

    }, [productSelectedId]);

    return (
        <div className='viewerPage'>
            <div id="annotation-div">
                <canvas id="number" width="64" height="64"></canvas>
                <div id="annotation">
                    <div>
                        <p><strong>Hand Facts</strong></p>
                        <p>Statistically, The average number of hands per person worldwide is less than 2.</p>
                    </div>
                </div>
            </div>
            <div id="scene-container">
                <div id="titleArea">
                    <span id="title">{products[productSelectedId].name}</span>
                </div>

                <button id="back">
                    <FontAwesomeIcon icon={faBars} size="5x" color='#5d7a76' />
                </button>
                <div ref={mountRef} id="canva"></div>
                <button onClick={prevButton} id="previous" className='btnChangePage'>
                    <FontAwesomeIcon icon={faChevronLeft} size="5x" color='#5d7a76' />
                </button>
                <button onClick={nextButton} id="next" className='btnChangePage'>
                    <FontAwesomeIcon icon={faChevronRight} size="5x" color='#5d7a76' />
                </button>
                <div id="description1" className="descriptionArea"  hidden={description === 0 ? false : true}>
                    <span className="description">{products[productSelectedId].describe[0]}</span>
                </div>
                <div  id="description2" className="descriptionArea" hidden={description === 1 ? false : true}>
                    <span className="description" >{products[productSelectedId].describe[1]}</span>
                </div>
                <div  id="description3" className="descriptionArea" hidden={description === 2 ? false : true}> 
                    <span className="description" >{products[productSelectedId].describe[2]}</span>
                </div>

            </div>

        </div>
    );
}

export default ViewerPage;
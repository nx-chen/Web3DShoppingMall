/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import './style/ProductItemCard.css';
import ClipLoader from "react-spinners/ClipLoader";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const DisplayArea = ({ product, canvasId, sourceId }) => {
    const [isLoading, setIsLoading] = useState(true);
    const mountRef = useRef(null);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 100000);
    const renderer = new THREE.WebGLRenderer({
        antialias: true

    });
    const control = new OrbitControls(camera, renderer.domElement);


    useEffect(() => {
        init();
        let onWindowResize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth / 3, window.innerHeight / 3);
        }

        window.addEventListener("resize", onWindowResize, false);


        return () => mountRef.current?.removeChild(renderer.domElement);
    }, []);


    const init = () => {

        camera.position.x = 2;
        camera.position.z = 3;
        camera.position.y = 3;

        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth / 4, window.innerHeight / 4);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;

        const environment = new RoomEnvironment();
        const pmremGenerator = new THREE.PMREMGenerator(renderer);

        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);

        ambientLight.castShadow = true;
        scene.add(ambientLight);

        scene.background = new THREE.Color(0xffffff);
        scene.environment = pmremGenerator.fromScene(environment).texture;

        setMeuble(product.assetPath);
        animate();

    }

    const setMeuble = (meublePath) => {
        return new Promise((resolve, reject) => {
            const loader = new GLTFLoader()
            loader.load(
                meublePath,
                (gltf) => {
                    console.log(gltf);
                    scene.add(gltf.scene);
                    resolve(setIsLoading(false));
                },
                (xhr) => {
                    console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
                },
                (error) => {
                    console.log(error);
                }
            )
        })
    }

    const animate = () => {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);

        control.update()
    }

    useEffect(() => {

        if (!isLoading) {
            const canvas = document.getElementById(canvasId);
            const ctx = canvas.getContext("2d");
            const image = document.getElementById(sourceId).children[0];
            const dpi = window.devicePixelRatio;

            //create a style object that returns width and height
            let style = {
                height() {
                    return +getComputedStyle(canvas).getPropertyValue('height').slice(0, -2);
                },
                width() {
                    return +getComputedStyle(canvas).getPropertyValue('width').slice(0, -2);
                }
            }
            //set the correct attributes for a crystal clear image!
            canvas.setAttribute('width', style.width() * dpi);
            canvas.setAttribute('height', style.height() * dpi);

            ctx.imageSmoothingEnabled = false;

            // ctx.drawImage(image, -100, 0,canvas.innerWidth,canvas.innerHeight);
            const imageWidth = document.getElementById(sourceId).children[0].width;
            const imageHeight = document.getElementById(sourceId).children[0].height;
            const canvasWidth = document.getElementById(canvasId).width;
            const canvasHeight = document.getElementById(canvasId).height;

            console.log(canvasWidth, "------", canvasHeight);
            console.log(imageWidth, "------", imageHeight);
            //    ctx.drawImage(image, 75, 30, imageWidth / 2,imageHeight / 2, 0, 0,canvasWidth , canvasHeight);
            ctx.drawImage(image, -35, 40);
            //ctx.drawImage(image, 75, 30, 428, 390, 60, 0, 250, 225);
        }
    }, [isLoading])


    return (
        <div className="productItem">
            <div className={!isLoading ? "showMe" : "hideMe"}>
                <canvas id={canvasId} className="canvasProduct"></canvas>
                <div id={sourceId} ref={mountRef} hidden>
                </div>
            </div>
            <div className="loaderArea">
                <div >
                    <ClipLoader
                        color={"#EEEEEE"}
                        loading={isLoading}
                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            </div>
        </div>
    );
}
export default DisplayArea;
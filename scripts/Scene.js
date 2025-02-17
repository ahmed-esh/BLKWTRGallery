import { PerspectiveCamera, Scene, Vector3, WebGLRenderer, AmbientLight, DirectionalLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import * as Skybox from "/BLKWTRGallery/scene/Skybox.js";
import * as Ocean from "/BLKWTRGallery/scene/Ocean.js";
import * as SeaFloor from "/BLKWTRGallery/scene/SeaFloor.js";
import * as Blocks from "/BLKWTRGallery/scene/Blocks.js";
import { axes } from "/BLKWTRGallery/scripts/Debug.js";
import { TextureLoader } from "three";
export const body = document.createElement("div");

export const renderer = new WebGLRenderer();
export const scene = new Scene();
export const camera = new PerspectiveCamera();
export const staticCamera = new PerspectiveCamera();

export const cameraRight = new Vector3();
export const cameraUp = new Vector3();
export const cameraForward = new Vector3();

export let girlModel;
export let crabModel;
export let handsModel;
export let oldmanModel;

export function UpdateCameraRotation()
{
    cameraRight.copy(new Vector3(1, 0, 0).applyQuaternion(camera.quaternion));
    cameraUp.copy(new Vector3(0, 1, 0).applyQuaternion(camera.quaternion));
    cameraForward.copy(new Vector3(0, 0, -1).applyQuaternion(camera.quaternion));
}

export let resMult = 1;
export function SetResolution(value)
{
    resMult = value;
    let width = window.innerWidth * value * window.devicePixelRatio;
    let height = window.innerHeight * value * window.devicePixelRatio;
    if (window.innerWidth < window.innerHeight)
    {
        width = window.innerHeight * value * window.devicePixelRatio;
        height = window.innerWidth * value * window.devicePixelRatio;
        body.style.transform = "rotate(90deg) translate(0%, -100%)";
        body.style.width = window.innerHeight + "px";
        body.style.height = window.innerWidth + "px";
    }
    else
    {
        body.style.transform = "";
        body.style.width = window.innerWidth + "px";
        body.style.height = window.innerHeight + "px";
    }

    renderer.setSize(width, height, false);
}

export let fov = 70;
export function SetFOV(value)
{
    fov = value;
    camera.fov = value;
    camera.updateProjectionMatrix();
}

export let antialias = false;
export function SetAntialias(value)
{
    antialias = value;
    renderer.antialias = antialias;
}

export function Start()
{
    document.body.appendChild(body);

    let width = window.innerWidth * resMult * window.devicePixelRatio;
    let height = window.innerHeight * resMult * window.devicePixelRatio;
    if (window.innerWidth < window.innerHeight)
    {
        width = window.innerHeight * resMult * window.devicePixelRatio;
        height = window.innerWidth * resMult * window.devicePixelRatio;
        body.style.transform = "rotate(90deg) translate(0%, -100%)";
        body.style.width = window.innerHeight + "px";
        body.style.height = window.innerWidth + "px";
    }
    else
    {
        body.style.transform = "";
        body.style.width = window.innerWidth + "px";
        body.style.height = window.innerHeight + "px";
    }
    
    renderer.setSize(width, height, false);
    renderer.antialias = antialias;
    renderer.autoClearColor = false;
    body.appendChild(renderer.domElement);
    
    camera.fov = fov;
    camera.aspect = width / height;
    camera.near = 0.3;
    camera.far = 4000;
    camera.updateProjectionMatrix();
    camera.position.set(0, -9, 0);

    UpdateCameraRotation();

    staticCamera.fov = 60;
    staticCamera.aspect = width / height;
    staticCamera.near = 0.1;
    staticCamera.far = 10;
    staticCamera.updateProjectionMatrix();
    staticCamera.position.set(0, 0, 0);

    const loader = new GLTFLoader();
    // const textureLoader = new TextureLoader();
    
    // Setup Draco loader
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    dracoLoader.setDecoderConfig({ type: 'js' });
    loader.setDRACOLoader(dracoLoader);

    // Add ambient light for overall scene illumination
    const ambientLight = new AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light for shadows and directional illumination
    const directionalLight = new DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Load the GLB model
    loader.load(
        '/BLKWTRGallery/assets/3D/Girl/Fish1.glb',
        function (gltf) {
            girlModel = gltf.scene;
            girlModel.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                    /* if (node.material) {
                        // Load textures based on GLTF file definitions
                        const baseColorTexture = textureLoader.load('/BLKWTRGallery/assets/3D/Girl/textures/initialShadingGroup_baseColor.jpg');
                        const normalTexture = textureLoader.load('/BLKWTRGallery/assets/3D/Girl/textures/initialShadingGroup_normal.png');
                        const metallicRoughnessTexture = textureLoader.load('/BLKWTRGallery/assets/3D/Girl/textures/initialShadingGroup_metallicRoughness.png');

                        // Apply textures and material properties
                        node.material.map = baseColorTexture;
                        node.material.normalMap = normalTexture;
                        node.material.metalnessMap = metallicRoughnessTexture;
                        node.material.roughnessMap = metallicRoughnessTexture;
                        
                        // Set material properties from the GLTF file
                        node.material.metalness = 0.7;
                        node.material.roughness = 0.8;
                        node.material.toneMapped = false;
                        node.material.needsUpdate = true;
                    } */
                }
            });
            girlModel.position.set(15, -9, -3);
            girlModel.scale.set(6.5, 6.5, 6.5);
            
            // Set rotation order to 'YZX' instead of default 'XYZ'
            girlModel.rotation.order = 'YZX';
            
            // Apply rotations (they will now be applied in Y, Z, X order)
            girlModel.rotation.y = -Math.PI * 1.1;
            girlModel.rotation.z = -Math.PI / 3;
            girlModel.rotation.x = -Math.PI / 2;

            scene.add(girlModel);
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened:', error);
        }
    );

    // Load the crab model
    loader.load(
        '/BLKWTRGallery/assets/new assests/crab.glb',
        function (gltf) {
            crabModel = gltf.scene;
            crabModel.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            // Position the crab to the right of the camera
            crabModel.position.set(8, -9, -23);
            crabModel.scale.set(4, 4, 4);
            crabModel.rotation.y = Math.PI / 4; // 45 degrees rotation
            scene.add(crabModel);
        },
        function (xhr) {
            console.log('Crab: ' + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened loading crab:', error);
        }
    );

    // Load the hands model
    loader.load(
        '/BLKWTRGallery/assets/new assests/new_fish.glb',
        function (gltf) {
            handsModel = gltf.scene;
            handsModel.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            // Position the hands behind the camera
            handsModel.position.set(-3.6, -8, 11);
            handsModel.scale.set(1, 1, 1);
            handsModel.rotation.y = Math.PI; // -90 degrees rotation
            scene.add(handsModel);
        },
        function (xhr) {
            console.log('Hands: ' + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened loading hands:', error);
        }
    );

    // Load the oldman model
    loader.load(
        '/BLKWTRGallery/assets/new assests/oldman.glb',
        function (gltf) {
            oldmanModel = gltf.scene;
            oldmanModel.traverse((node) => {
                if (node.isMesh) {
                    node.castShadow = true;
                    node.receiveShadow = true;
                }
            });
            // Position the oldman to the left of the camera
            oldmanModel.position.set(-8, -9, -4);
            oldmanModel.scale.set(6, 6, 6);
            oldmanModel.rotation.y = Math.PI; // 180 degrees rotation
            scene.add(oldmanModel);
        },
        function (xhr) {
            console.log('Oldman: ' + (xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened loading oldman:', error);
        }
    );

    // Enable shadow mapping in renderer
    renderer.shadowMap.enabled = true;

    window.onresize = function()
    {
        width = window.innerWidth * resMult * window.devicePixelRatio;
        height = window.innerHeight * resMult * window.devicePixelRatio;
        if (window.innerWidth < window.innerHeight)
        {
            width = window.innerHeight * resMult * window.devicePixelRatio;
            height = window.innerWidth * resMult * window.devicePixelRatio;
            body.style.transform = "rotate(90deg) translate(0%, -100%)";
            body.style.width = window.innerHeight + "px";
            body.style.height = window.innerWidth + "px";
        }
        else
        {
            body.style.transform = "";
            body.style.width = window.innerWidth + "px";
            body.style.height = window.innerHeight + "px";
        }

        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        staticCamera.aspect = width / height;
        staticCamera.updateProjectionMatrix();
    }

    Skybox.Start();
    scene.add(Skybox.skybox);

    Ocean.Start();
    scene.add(Ocean.surface);

    SeaFloor.Start();
    for (let i = 0; i < SeaFloor.tiles.length; i++)
    {
        scene.add(SeaFloor.tiles[i]);
    }

    Blocks.Start();
    for (let i = 0; i < Blocks.blocks.length; i++)
    {
        scene.add(Blocks.blocks[i]);
    }
}

export function Update()
{
    Skybox.Update();
    Ocean.Update();
    SeaFloor.Update();

    renderer.render(scene, camera);
    renderer.render(axes, staticCamera);
}
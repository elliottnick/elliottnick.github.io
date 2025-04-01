const container = document.getElementById("three-js-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Set renderer size to match container
function updateRendererSize() {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
updateRendererSize();
container.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(0, 10, 10);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 50;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0xd3d3d3 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.receiveShadow = true;
scene.add(floor);



// Computer station class
class ComputerStation {
    constructor(x, z) {
        this.group = new THREE.Group();

        // Desk
        const deskGeo = new THREE.BoxGeometry(1.5, 0.7, 1);
        const deskMat = new THREE.MeshPhongMaterial({ color: 0x4a2f1d });
        const desk = new THREE.Mesh(deskGeo, deskMat);
        desk.position.set(0, 0.35, 0.4);

        // Computer monitor
        const monitorGeo = new THREE.BoxGeometry(1, 0.7, 0.1);
        const monitorMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const monitor = new THREE.Mesh(monitorGeo, monitorMat);
        monitor.position.set(0, 0.7, 0.2);

        // Screen glow
        const screenGeo = new THREE.PlaneGeometry(0.8, 0.5);
        const screenMat = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.3
        });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(0, 0.7, 0.251);

        // Keyboard
        const keyboardGeo = new THREE.BoxGeometry(0.8, 0.05, 0.2);
        const keyboardMat = new THREE.MeshPhongMaterial({ color: 0x222222 });
        const keyboard = new THREE.Mesh(keyboardGeo, keyboardMat);
        keyboard.position.set(0, 0.375, 0.5);

        // Chair
        const chairGroup = new THREE.Group();
        const chairMat = new THREE.MeshPhongMaterial({ color: 0x888888 });
        // Seat
        const seatGeo = new THREE.BoxGeometry(0.5, 0.1, 0.5);
        const seat = new THREE.Mesh(seatGeo, chairMat);
        seat.position.set(0, 0.35, 0);
        // Backrest
        const backrestGeo = new THREE.BoxGeometry(0.5, 0.4, 0.1);
        const backrest = new THREE.Mesh(backrestGeo, chairMat);
        backrest.position.set(0, 0.55, 0.25);
        // Legs
        const legGeo = new THREE.BoxGeometry(0.05, 0.35, 0.05);
        const leg1 = new THREE.Mesh(legGeo, chairMat);
        leg1.position.set(-0.2, 0.175, -0.2);
        const leg2 = new THREE.Mesh(legGeo, chairMat);
        leg2.position.set(0.2, 0.175, -0.2);
        const leg3 = new THREE.Mesh(legGeo, chairMat);
        leg3.position.set(-0.2, 0.175, 0.2);
        const leg4 = new THREE.Mesh(legGeo, chairMat);
        leg4.position.set(0.2, 0.175, 0.2);
        chairGroup.add(seat, backrest, leg1, leg2, leg3, leg4);
        chairGroup.position.set(0, 0, 0.8);

        // Person
        this.personGroup = new THREE.Group();
        const personColors = [0x6666ff, 0xff6666, 0x66ff66, 0xffff66, 0xff66ff, 0x66ffff];
        const personMat = new THREE.MeshPhongMaterial({ color: personColors[Math.floor(Math.random() * personColors.length)] });
        // Torso
        const torsoGeo = new THREE.BoxGeometry(0.4, 0.6, 0.2);
        const torso = new THREE.Mesh(torsoGeo, personMat);
        torso.position.set(0, 0.3, 0);
        // Head
        const headGeo = new THREE.SphereGeometry(0.15, 16, 16);
        const head = new THREE.Mesh(headGeo, personMat);
        head.position.set(0, 0.7, 0);
        // Arms
        const armGeo = new THREE.BoxGeometry(0.1, 0.4, 0.1);
        const leftArm = new THREE.Mesh(armGeo, personMat);
        leftArm.position.set(-0.25, 0.5, 0);
        const rightArm = new THREE.Mesh(armGeo, personMat);
        rightArm.position.set(0.25, 0.5, 0);
        this.personGroup.add(torso, head, leftArm, rightArm);
        this.personGroup.position.set(0, 0.4, 0.8);

        this.group.add(desk, monitor, screen, keyboard, chairGroup, this.personGroup);
        this.group.position.set(x, 0, z);
        scene.add(this.group);

        // Enable shadows for all meshes
        this.group.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        this.time = Math.random() * Math.PI * 2;
    }

    animate(delta) {
        this.time += delta;
        this.personGroup.position.y = 0.4 + Math.sin(this.time * 2) * 0.01;
        this.personGroup.children[2].position.y = 0.5 + Math.sin(this.time * 2) * 0.05; // Left arm
        this.personGroup.children[3].position.y = 0.5 + Math.sin(this.time * 2 + 1) * 0.05; // Right arm
    }
}

// Create computer stations
const stations = [];
for (let x = -4; x <= 4; x += 2) {
    for (let z = -2; z <= 2; z += 2) {
        stations.push(new ComputerStation(x, z));
    }
}

// Camera position
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    const delta = 0.05;
    stations.forEach(station => station.animate(delta));
    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', updateRendererSize);
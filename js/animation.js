const container = document.getElementById("three-js-container");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });

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
scene.add(directionalLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

// Computer station class
class ComputerStation {
    constructor(x, z) {
        this.group = new THREE.Group();

        // Desk
        const deskGeo = new THREE.BoxGeometry(1.5, 0.7, 1);
        const deskMat = new THREE.MeshPhongMaterial({ color: 0x4a2f1d }); // Brown desk
        const desk = new THREE.Mesh(deskGeo, deskMat);
        desk.position.set(0, 0.35, 0.4);

        // Computer monitor
        const monitorGeo = new THREE.BoxGeometry(1, 0.7, 0.1);
        const monitorMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const monitor = new THREE.Mesh(monitorGeo, monitorMat);
        monitor.position.set(0, 0.7, 0.2); // Raised to sit on desk

        // Screen glow
        const screenGeo = new THREE.PlaneGeometry(0.8, 0.5);
        const screenMat = new THREE.MeshBasicMaterial({
            color: 0x00ff00,
            transparent: true,
            opacity: 0.3
        });
        const screen = new THREE.Mesh(screenGeo, screenMat);
        screen.position.set(0, 0.7, 0.251); // Aligned with monitor

        // Person - more humanoid shape
        this.personGroup = new THREE.Group();

        // Torso
        const torsoGeo = new THREE.BoxGeometry(0.4, 0.6, 0.2);
        const personMat = new THREE.MeshPhongMaterial({ color: 0x6666ff });
        const torso = new THREE.Mesh(torsoGeo, personMat);
        torso.position.set(0, 0.3, 0.8);

        // Head
        const headGeo = new THREE.SphereGeometry(0.15, 16, 16);
        const head = new THREE.Mesh(headGeo, personMat);
        head.position.set(0, 0.7, 0.8);

        // Arms (simple boxes)
        const armGeo = new THREE.BoxGeometry(0.1, 0.4, 0.1);
        const leftArm = new THREE.Mesh(armGeo, personMat);
        leftArm.position.set(-0.25, 0.5, 0.8);
        const rightArm = new THREE.Mesh(armGeo, personMat);
        rightArm.position.set(0.25, 0.5, 0.8);

        this.personGroup.add(torso, head, leftArm, rightArm);

        this.group.add(desk, monitor, screen, this.personGroup);
        this.group.position.set(x, 0, z);
        scene.add(this.group);

        this.time = Math.random() * Math.PI * 2;
    }

    animate(delta) {
        this.time += delta;
        // Animate whole person group to simulate typing motion
        this.personGroup.position.y = Math.sin(this.time * 2) * 0.02;
        // Slight arm movement
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

    // Animate computer stations
    const delta = 0.05;
    stations.forEach(station => station.animate(delta));

    renderer.render(scene, camera);
}
animate();

// Handle resize
window.addEventListener('resize', updateRendererSize);
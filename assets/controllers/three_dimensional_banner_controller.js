import {Controller} from '@hotwired/stimulus';
import * as THREE from 'three';

export default class extends Controller {
    connect() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.element.offsetWidth / this.element.offsetHeight, 0.1, 1000);

        this.renderer = new THREE.WebGLRenderer({alpha: true});
        this.renderer.setSize(this.element.offsetWidth, this.element.offsetHeight);
        this.element.appendChild(this.renderer.domElement);

        this.geometry = new THREE.BoxGeometry(3, 3, 3);
        this.edges = new THREE.EdgesGeometry(this.geometry);

        let red  = 0x8338ec;
        let blue  = 0xff006e;
        this.line1 = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({color: red}));
        this.line2 = new THREE.LineSegments(this.edges, new THREE.LineBasicMaterial({color: blue}));

        this.scene.add(this.line1);
        this.scene.add(this.line2);

        this.camera.position.z = 5;

        this.runAnimate = () => {
            this.animate()
        }

        this.runAnimate();

        window.addEventListener("resize", this.resize.bind(this));
    }

    animate() {
        requestAnimationFrame(this.runAnimate);

        this.line1.rotation.x += 0.005;
        this.line1.rotation.y += 0.005;
        this.line1.rotation.z += 0.005;

        this.line2.rotation.x -= 0.005;
        this.line2.rotation.y -= 0.005;
        this.line2.rotation.z -= 0.005;

        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        this.camera.aspect = this.element.offsetWidth / this.element.offsetHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.element.offsetWidth, this.element.offsetHeight);
    }
}

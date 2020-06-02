import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// This class is the top level 3D class and manages drawing and rendering the scene (and simulating it).
// All interaction with react redux is done through its parent RobotSimulator, this class is abstracted from that.
export class Sim3D {
  private scene: THREE.Scene;
  private renderer: THREE.Renderer;

  private camera: THREE.PerspectiveCamera;
  private cameraControls: OrbitControls;

  private isRendering = false;

  constructor(private canvas: HTMLCanvasElement) {
    // Scene
    let scene = (this.scene = new THREE.Scene());
    scene.background = new THREE.Color(0xeeeeee);

    // Renderer
    let renderer = (this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas,
    }));
    renderer.setSize(canvas.width, canvas.height);

    // Camera
    let fov = 80;
    let aspect = canvas.width / canvas.height;
    let near = 0.01;
    let far = 100;
    let camera = (this.camera = new THREE.PerspectiveCamera(
      fov,
      aspect,
      near,
      far
    ));
    camera.position.z += 3;
    camera.position.y += 2;
    this.cameraControls = new OrbitControls(camera, renderer.domElement);

    // Lighting
    let pointLight = new THREE.PointLight(0xffffff, 0.8);
    pointLight.position.x = 3;
    pointLight.position.y = 10;
    pointLight.position.z = 3;
    scene.add(pointLight);

    scene.add(new THREE.AmbientLight(0x333333));

    // Grid
    var helper = new THREE.GridHelper(1, 10);
    helper.scale.addScalar(10);
    scene.add(helper);
  }

  onresize() {
    this.camera.aspect = this.canvas.width / this.canvas.height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.width, this.canvas.height);
  }

  render() {
    this.cameraControls.update();
    this.renderer.render(this.scene, this.camera);
  }

  beginRendering() {
    let r = () => {
      if (!this.isRendering) {
        return;
      }

      window.requestAnimationFrame(r);
      this.render();
    };

    this.isRendering = true;
    r();
  }

  stopRendering() {
    this.isRendering = false;
  }
}

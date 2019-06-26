import * as Panda from "../panda";
import ListenerManager from "../util/ListenerManager";

export default class WebGLBaseDemo {

    constructor() {
        this.canvas = null;
        this.renderer = null;
        this.renderTarget = null;
        this.scene = null;
        this.camera = null;
        this.needRender = false;
        this.listenerManager = new ListenerManager();
    }

    setUp(canvas) {
        this.renderer = Panda.WebGLRendererCreator.create({canvas, antialias: true});
        this.listenerManager.addListener("resize", this.resize.bind(this), window);
        this.canvas = canvas;

        this.scene = new Panda.Scene();
        const camera = this.camera = new Panda.PerspectiveCamera(45, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 5);
        camera.updateMatrix();
        camera.lookAt(new Panda.Vector3(0, 0, 0));

        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

    }

    loadScene() {
    }

    dispose() {
        this.needRender = false;
        this.listenerManager.dispose();
        if (this.renderer) this.renderer.dispose();
        this.renderer = null;
        this.scene.dispose();
        this.camera.dispose();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }

    resize() {
        this.resizeCanvas();
        this.updateCamera(this.canvas.width, this.canvas.height);
    }

    resizeCanvas() {
        let canvas = this.canvas;
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;
    }

    updateCamera(width, height) {
        this.renderer.viewport(0, 0, width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
    }

    startAnimate() {
        this.needRender = true;
        this.animate();
    }

    animate() {
        if (!this.needRender) return;
        this.render();
        requestAnimationFrame(this.animate.bind(this));
    }
}

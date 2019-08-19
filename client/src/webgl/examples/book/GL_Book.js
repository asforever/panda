import {QuadGeometry, ShaderLib, WebglState2} from "../../panda";
import * as glm from "gl-matrix";
import GL_TitlePage from "./pages/GL_TitlePage";
import GL_PbrPage from "./pages/GL_PbrPage";
import GL_ModelPage from "./pages/GL_ModelPage";

export default class GL_Book {
    constructor() {
        //att
        this.canvas = null;
        this.curPage = 0;
        this.state = null;
        this.downPoint = glm.vec2.create();

        this.pages = [];
        this.meshInfo = {};
        this.camera = null;

        //state
        this.isAnimate = false;
        this.isDown = false;

    }

    async run(canvas) {

        this.initContext(canvas);
        await this.initPages();
        this.initEvent();
        this.configContext();

        this.draw();
    }

    initContext(canvas) {
        this.canvas = canvas;
        this.state = new WebglState2(canvas)
    }

    async initPages() {
        const titlePage = new GL_TitlePage(this.state);
        const pbrPage = new GL_PbrPage(this.state);
        const modelPage = new GL_ModelPage(this.state);
        await titlePage.loadTexture();
        await pbrPage.loadTexture();
        await modelPage.loadTexture();

        const pages = [
            titlePage,
            pbrPage,
            modelPage,
        ];
        this.addPages(pages);
    }

    configContext() {
        const canvas = this.canvas, state = this.state, gl = state.getContext();

        gl.enable(gl.CULL_FACE);
        gl.cullFace(gl.BACK);

        //camera
        const bookCamera = this.camera = glm.mat4.perspective(glm.mat4.create(), Math.PI / 2, canvas.width / canvas.height, 0.1, 10);
        const bookCameraView = glm.mat4.lookAt(glm.mat4.create(), glm.vec3.set(glm.vec3.create(), 0, 0, 0.5), glm.vec3.set(glm.vec3.create(), 0, 0, 0), glm.vec3.set(glm.vec3.create(), 0, 1, 0));

        const bookGeometry = new QuadGeometry(canvas.width / canvas.height, 1);
        const bookVAO = state.createVaoFromGeometry(bookGeometry);

        const bookSource = ShaderLib.book;
        const bookProgramInfo = state.createProgramInfo(bookSource.vs.getSource(), bookSource.fs.getSource());

        state.viewport(0, 0, canvas.width, canvas.height);
        state.use(bookProgramInfo.program);
        state.setMat4("view", bookCameraView);
        state.setMat4("projection", bookCamera);
        state.setMat4("model", glm.mat4.create());
        state.setFloat("ratio", bookGeometry.width / bookGeometry.height);
        state.setFloat("iTime", new Date().getTime());
        state.setFloat("width", bookGeometry.width);
        state.setFloat("height", bookGeometry.height);
        state.setTexture2D("iChannel0", this.pages[this.curPage].getTexture(), 0);
        state.setTexture2D("iChannel1", this.pages[this.curPage + 1].getTexture(), 1);
        state.setFloat("ratio", bookGeometry.width / bookGeometry.height);
        state.setVec2("mouse", 0, 0);
        state.setVao(bookVAO);
        this.meshInfo = {
            vao: bookVAO,
            indexLen: bookGeometry.indices.data.length
        };
    }


    initEvent() {
        this.canvas.addEventListener("mousedown", this.onDown, false);
        this.canvas.addEventListener("mousemove", this.onMove, false);
        this.canvas.addEventListener("mouseover", this.onUp, false);
        this.canvas.addEventListener("mouseup", this.onUp, false);

        window.addEventListener("resize", this.onResize, false);
    }


    onDown = (e) => {
        this.isDown = !this.isAnimate;
        //glm.vec2.set(this.downPoint,)
    };

    onMove = (e) => {
        if (!this.isDown) return;
        const ratio = this.canvas.width / this.canvas.height;
        this.setMouse(ratio * e.clientX / window.innerWidth, (1 - e.clientY / window.innerHeight));
    };

    onUp = (e) => {
        this.isDown = false;
        if (this.canvas.width - e.clientX < 0.01
            && this.canvas.height - e.clientY < 0.01) {
            this.usePage(this.curPage + 1);
        }

        if (e.clientX < 0.01
            && e.clientY < 0.01) {
            this.usePage(this.curPage - 1);
        }
    };

    onResize = (e) => {
        const state = this.state;
        const aspect = this.canvas.width / this.canvas.height;
        this.camera = glm.mat4.perspective(glm.mat4.create(), Math.PI / 2, aspect, 0.1, 10);
        this.setSize(aspect, 1);
        state.setMat4("view", this.camera);
    };

    setMouse(x, y) {
        this.state.setVec2("mouse", x, y);
        this.draw();
    }

    addPages(pages) {
        this.pages = pages;
    }

    usePage(page) {
        const state = this.state;
        this.curPage = page;
        state.setTexture2D("iChannel0", this.pages[page].getTexture(), 0);
        state.setTexture2D("iChannel1", this.pages[page + 1].getTexture(), 1);
        state.setVec2("mouse", 0, 0);
    }

    draw() {
        let state = this.state;
        state.drawElements(this.meshInfo.indexLen);
    }


    dispose() {
        this.canvas.removeEventListener("mousedown", this.onDown);
        this.canvas.removeEventListener("mousemove", this.onMove);
        this.canvas.removeEventListener("mouseover", this.onUp);
        this.canvas.removeEventListener("mouseup", this.onUp);

        window.removeEventListener("resize", this.onResize);

        this.pages.forEach(page => {
            page.dispose();
        });
    }
}

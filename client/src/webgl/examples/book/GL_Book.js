import {QuadGeometry, ShaderLib, Vector2, WebglState2} from "../../panda";
import GL_TitlePage from "./pages/GL_TitlePage";
import GL_PbrPage from "./pages/GL_PbrPage";
import GL_ModelPage from "./pages/GL_ModelPage";
import * as glm from "gl-matrix";

export default class GL_Book {
    static Tolerance = 0.01;

    constructor() {
        //att
        this.canvas = null;
        this.curPageIndex = 0;
        this.state = null;
        this.downPoint = new Vector2();

        this.width = 1;
        this.height = 1;

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
        this.width = this.canvas.width;
        this.height = this.canvas.height;
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

        const ratio = bookGeometry.width / bookGeometry.height;
        state.viewport(0, 0, canvas.width, canvas.height);
        state.use(bookProgramInfo.program);
        state.setMat4("view", bookCameraView);
        state.setMat4("projection", bookCamera);
        state.setMat4("model", glm.mat4.create());
        state.setFloat("iTime", new Date().getTime());
        state.setFloat("width", bookGeometry.width);
        state.setFloat("height", bookGeometry.height);
        state.setTexture2D("iChannel0", this.pages[this.curPageIndex].getTexture(), 0);
        state.setTexture2D("iChannel1", this.pages[this.curPageIndex + 1].getTexture(), 1);
        state.setFloat("ratio", ratio);
        state.setVec2("mouse", ratio, 0);
        state.setVao(bookVAO);
        this.meshInfo = {
            vao: bookVAO,
            geometry: bookGeometry,
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
        if (this.isAnimate) return;
        this.isDown = true;
        this.downPoint.set(e.clientX, e.clientY);

        const leftBottom = new Vector2(0, this.height);
        const inLeftBottom = leftBottom.distanceTo(this.downPoint) / this.height < GL_Book.Tolerance;

        if (inLeftBottom) {
            this.usePage(this.curPageIndex - 1);
        } else {

        }
        //    // this.usePage(this.curPageIndex + 1);
//
        //} else if (this.curPageIndex > 0) {
        //    this.isDown = true;
        //}
    };

    onMove = (e) => {
        if (!this.isDown) return;
        const ratio = this.width / this.height;
        this.setMouse(ratio * e.clientX / window.innerWidth, (1 - e.clientY / window.innerHeight));
    };

    onUp = (e) => {
        const leftBottom = new Vector2(0, this.height);
        const upPoint = new Vector2(e.clientX, e.clientY);
        const inLeftBottom = leftBottom.distanceTo(upPoint) / this.height < GL_Book.Tolerance;

        if (inLeftBottom) {
            this.usePage(this.curPageIndex + 1);
        } else {

        }
        this.isDown = false;
    };

    onResize = (e) => {

        const state = this.state;
        const aspect = this.width / this.height;
        this.canvas.width = this.width = this.canvas.clientWidth;
        this.canvas.height = this.height = this.canvas.clientHeight;

        this.camera = glm.mat4.perspective(glm.mat4.create(), Math.PI / 2, aspect, 0.1, 10);
        this.meshInfo.geometry.resetSize(aspect, 1);

        state.viewport(0, 0, this.width, this.height);
        state.setFloat("height", 1);
        state.setFloat("width", aspect);
        state.setFloat("ratio", aspect);
        state.setMat4("projection", this.camera);
        state.updateVaoFromGeometry(this.meshInfo.vao, this.meshInfo.geometry);
        state.setVao(this.meshInfo.vao);
        this.draw();
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
        const curPage = this.pages[page] ? this.pages[page].getTexture() : null;
        const nextPage = this.pages[page + 1] ? this.pages[page + 1].getTexture() : null;

        this.curPageIndex = page;
        state.setTexture2D("iChannel0", curPage, 0);
        state.setTexture2D("iChannel1", nextPage, 1);
        state.setVec2("mouse", 0, 0);
        //this.draw();
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

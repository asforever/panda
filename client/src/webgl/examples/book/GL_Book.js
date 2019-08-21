import {QuadGeometry, ShaderLib, Vector2, WebglState2} from "../../panda";
import GL_TitlePage from "./pages/GL_TitlePage";
import GL_PbrPage from "./pages/GL_PbrPage";
import GL_ModelPage from "./pages/GL_ModelPage";
import * as glm from "gl-matrix";
import GL_NullPage from "./pages/GL_NullPage";

export default class GL_Book {
    static Tolerance = 0.01;
    static ToNextPage = "animate to next";
    static ToLastPage = "animate to last";
    static Stop = "stop";

    constructor() {
        //att
        this.canvas = null;
        this.curPageIndex = 0;
        this.state = null;
        this.mousePoint = new Vector2();

        this.width = 1;
        this.height = 1;

        this.pages = [];
        this.meshInfo = {};
        this.camera = null;

        //state
        this.animateState = GL_Book.Stop;
        this.isDown = false;

    }

    async run(canvas) {

        this.initContext(canvas);
        await this.initPages();
        this.configContext();
        this.initEvent();
        this.draw();
    }

    initContext(canvas) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.mousePoint.set(this.width / this.height, 0);
        this.state = new WebglState2(canvas)
    }

    async initPages() {
        const width = this.width, height = this.height;
        const titlePage = new GL_TitlePage(this.state, width, height);
        const pbrPage = new GL_PbrPage(this.state, width, height);
        const modelPage = new GL_ModelPage(this.state, width, height);
        const nullPage = new GL_NullPage(this.state, width, height);
        await titlePage.loadTexture();
        await pbrPage.loadTexture();
        await modelPage.loadTexture();
        await nullPage.loadTexture();

        const pages = [
            titlePage,
            pbrPage,
            modelPage,
            nullPage
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

        this.animate();
    }


    addPages(pages) {
        this.pages = pages;
    }

    usePage(page) {
        const state = this.state;
        const ratio = this.width / this.height;
        const curPage = this.pages[page] ? this.pages[page].getTexture() : null;
        const nextPage = this.pages[page + 1] ? this.pages[page + 1].getTexture() : null;

        this.curPageIndex = page;
        state.setTexture2D("iChannel0", curPage, 0);
        state.setTexture2D("iChannel1", nextPage, 1);
        state.setVec2("mouse", ratio, 0);
        this.draw();
    }

    updateMouse() {
        this.state.setVec2("mouse", this.mousePoint.x, this.mousePoint.y);
    }

    draw() {
        let state = this.state;
        state.drawElements(this.meshInfo.indexLen);
    }

    animate() {
        const width = this.canvas.clientWidth;
        const ratio = this.width / this.height;
        let dW = Math.sin(Math.PI * this.mousePoint.x / width + 0.01);
        let dH = 0;

        if (this.animateState === GL_Book.ToLastPage) {
            if (this.mousePoint.x < ratio) {
                this.mousePoint.add(new Vector2(dW, dH));
                this.updateMouse();
            } else {
                this.animateState = GL_Book.Stop;
            }
        }

        if (this.animateState === GL_Book.ToNextPage) {
            if (this.mousePoint.x > 0) {
                const neg = ratio / 2 > this.mousePoint.x ? 1 : -1;
                this.mousePoint.sub(new Vector2(dW, neg * dH));
                this.updateMouse();
            } else {
                this.usePage(this.curPageIndex + 1);
                this.animateState = GL_Book.Stop;

            }
        }

        this.draw();
        requestAnimationFrame(this.animate.bind(this))
    }

    onDown = (e) => {
        const isLeft = this.canvas.clientWidth / e.clientX > 2;
        if (this.animateState !== GL_Book.Stop) return;

        if (isLeft) {
            if (this.curPageIndex > 0) {
                this.mousePoint.set(0, 0);
                this.updateMouse();
                this.usePage(this.curPageIndex - 1);
                this.animateState = GL_Book.ToLastPage;
            }
        } else {
            if (this.curPageIndex > this.pages.length - 3) return;
            this.mousePoint.set(this.width / this.height, 0);
            this.updateMouse();
            this.animateState = GL_Book.ToNextPage;
        }

    };

    onMove = (e) => {
    };

    onUp = (e) => {
    };

    onResize = (e) => {
    };

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

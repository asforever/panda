export default class DemoCreator {
    static getInstance() {
        if (!DemoCreator._ins) DemoCreator._ins = new DemoCreator();
        return DemoCreator._ins;
    }

    constructor() {
        this.lastDemo = null;
    }

    create(_demo, canvas) {
        if (this.lastDemo === _demo) return;
        if (this.lastDemo) this.lastDemo.dispose();
        this.lastDemo = _demo;
        this.lastDemo.setUp(canvas);
    }
}
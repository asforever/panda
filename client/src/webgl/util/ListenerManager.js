export default class ListenerManager {
    constructor() {
        this.listens = [];
    }

    addListener(type, handler, target) {
        target.addEventListener(type, handler, false);
        this.listens.push({
            target: target,
            type: type,
            handler: handler
        })
    }

    dispose() {
        this.listens.forEach(listener => {
            listener.target.removeEventListener(listener.type, listener.handler);
        })
    }
}
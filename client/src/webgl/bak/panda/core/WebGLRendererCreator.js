import WebGLRenderer from "./WebGLRenderer";
import WebGLState from "./WebGLState";
import WebGLExtensions from "./extensions/WebGLExtensions";
import WebGLCapabilities from "./capabilities/WebGLCapabilities";
import WebGLCache from "./WebGLCache";

export default class WebGLRendererCreator {
    static create(option) {
        let gl = WebGLState.createContext(option);
        let extensions = new WebGLExtensions(gl);
        let capabilities = new WebGLCapabilities(gl);
        let state = new WebGLState(gl, extensions, capabilities);
        let cache = new WebGLCache();
        return new WebGLRenderer(state, cache);
    }
}

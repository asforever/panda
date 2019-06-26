import ActionType from "./ActionType";

export const webglDemoID = {
    GL_Pbr: "GL_Pbr",
};

export const updateWebGLDemo = ({id, canvas}) => ({
    type: ActionType.UPDATE_WEBGL_DEMO,
    id: id,
    canvas: canvas
});

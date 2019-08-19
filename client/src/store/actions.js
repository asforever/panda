import ActionType from "./ActionType";

export const webglDemoID = {
    GL_Pbr: "GL_Pbr",
    GL_Pbr_Model: "GL_Pbr_Model",
    GL_Book: "GL_Book",
};

export const updateWebGLDemo = ({id, canvas}) => ({
    type: ActionType.UPDATE_WEBGL_DEMO,
    id: id,
    canvas: canvas
});

import ActionType from "../ActionType";
import {webglDemoID} from "../actions";

import DemoCreator from "../../webgl/examples/DemoCreator";

const demoList = [
    {type: webglDemoID.GL_Pbr, moduleName: () => import("../../webgl/examples/GL_Pbr")}
];

const WebGLDemoID = (state = {}, action) => {
    const canvas = action.canvas;
    const creator = DemoCreator.getInstance();
    switch (action.type) {
        case ActionType.UPDATE_WEBGL_DEMO:
            let demoIndex = demoList.findIndex(list => {
                return list.type === action.id;
            });
            if (demoIndex !== -1) {
                demoList[demoIndex].moduleName().then(className => {
                    creator.create(new (className.default)(), canvas);
                });
            }
            return {id: action.id};
        default:
            return state;
    }
};

export default WebGLDemoID;

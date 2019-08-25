const ROOT_URL = process.env.NODE_ENV === "development" ? "http://localhost:9000/" : "http://95.169.9.37:9000/";
export default class WebAPI {
    static ROOT_URL = ROOT_URL;
    static IMAGE = WebAPI.ROOT_URL + "image/";
    static MODEL_OBJ = WebAPI.ROOT_URL + "obj/";
    static MODEL_OBJ_LIST = WebAPI.ROOT_URL + "table/modelObjList";

    static DIFFUSE_CONTAINER = WebAPI.IMAGE + "container.jpg";
    static DIFFUSE_CONTAINER2 = WebAPI.IMAGE + "container2.png";
    static SPECULAR_CONTAINER2 =WebAPI.IMAGE + "container2_specular.png";

    static SKY_BOX_TOP = WebAPI.IMAGE + "skybox/top.jpg";
    static  SKY_BOX_BOTTOM  =WebAPI.IMAGE + "skybox/bottom.jpg";
    static SKY_BOX_LEFT = WebAPI.IMAGE + "skybox/left.jpg";
    static SKY_BOX_RIGHT = WebAPI.IMAGE + "skybox/right.jpg";
    static SKY_BOX_FRONT = WebAPI.IMAGE + "skybox/front.jpg";
    static SKY_BOX_BACK = WebAPI.IMAGE + "skybox/back.jpg";

    static MATRIX = WebAPI.IMAGE + "matrix.jpg";
    static AWESOME_FACE = WebAPI.IMAGE + "awesomeface.png";

}

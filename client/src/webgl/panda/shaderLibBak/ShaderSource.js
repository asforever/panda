export default class ShaderSource {
    constructor(){
        this.source = "";
    }

    addVersion(){
        this.source += "#version 300 es\n";
    }
    addDefine(name,value){
        this.source += "#define "+name + value + "\n";
    }

    addShaderChuck(shaderChuck){
        this.source += shaderChuck;
    }
}
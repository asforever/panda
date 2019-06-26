import * as Panda from "../panda";

import WebGLBaseDemo from "./WebGLBaseDemo";
/*import ResourceManager from "../../resource/ResourceManager";*/

export default class GL_Pbr extends WebGLBaseDemo {
    setUp(canvas) {
        super.setUp(canvas);
        this.meshes = [];
        this.loadScene();
    }

    async loadScene() {
        /* const image = await ResourceManager.getInstance().getImage(ResourceManager.WebAPI.DIFFUSE_CONTAINER2);*/
        this.camera.position.set(25, 0, 0);
        this.camera.updateMatrix();
        this.camera.lookAt(new Panda.Vector3(0, 0, 0));

        this.renderer.state.extensions.get(Panda.WebGLExtensions.OES_STANDARD_DERIVATIVES);
        this.renderer.state.extensions.get(Panda.WebGLExtensions.EXT_SHADER_TEXTURE_LOD);

        //  const texture = new Panda.Texture2D({image: image});

        const row = 5, col = 5, radius = 1;
        const geometry = new Panda.SphereGeometry(radius);

        for (let i = 0; i < row; i++) {
            for (let j = 0; j < col; j++) {
                let x = 0, y = row / 2 * (i - row / 2), z = col / 2 * (j - col / 2);
                const material = new Panda.MeshPbrMaterial({color: new Panda.Color(1, 1, 1)});
                material.metallic = i / row + 0.03;
                material.roughness = j / col + 0.03;
                material.ao = 0.3;
                let mesh = new Panda.Mesh(geometry, material);
                mesh.position.set(x, y, z);
                mesh.rotation.set(0, Math.PI/-3, 0);
                mesh.updateMatrix();
                this.meshes.push(mesh);
                this.scene.add(mesh);
            }
        }

        this.startAnimate();
        this.resize();
    }

    render() {
        this.meshes.forEach(mesh=>{
            mesh.updateMatrix();
        });
        this.renderer.render(this.scene, this.camera);
    }

}

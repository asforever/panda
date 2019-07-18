export default class Webgl2Api {
    //create
    static createWebglContext(canvas) {
        return canvas.getContext('webgl2');
    }

    static loaderShader(gl, type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    static createProgram(gl, vsSource, fsSource) {
        const vertexShader = this.loaderShader(gl, gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loaderShader(gl, gl.FRAGMENT_SHADER, fsSource);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            gl.deleteProgram(shaderProgram);
            console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        Webgl2Api.deleteShader(gl, vertexShader);
        Webgl2Api.deleteShader(gl, fragmentShader);
        return shaderProgram;
    }

    static createUniformsInfo(gl, program) {
        let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        let uniformsInfo = [];
        for (let ii = 0; ii < numUniforms; ++ii) {
            let uniformInfo = gl.getActiveUniform(program, ii);
            if (!uniformInfo) {
                break;
            }
            uniformsInfo.push(uniformInfo);
        }
        return uniformsInfo;
    }

    static createAttributesInfo(gl, program) {
        let numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        let attributesInfo = [];
        for (let ii = 0; ii < numAttribs; ++ii) {
            let attributeInfo = gl.getActiveAttrib(program, ii);
            if (!attributeInfo) {
                break;
            }
            attributesInfo.push(attributeInfo);
        }

        return attributesInfo;

    }

    static createProgramInfo(gl, vsSource, fsSource) {
        const program = this.createProgram(gl, vsSource, fsSource);
        const uniformsInfo = this.createUniformsInfo(gl, program);
        const attributesInfo = this.createAttributesInfo(gl, program);
        return {
            program: program,
            uniformsInfo: uniformsInfo,
            attributesInfo: attributesInfo,
        };
    }

    static createTexture(gl, isCubeTexture = false, ws = gl.CLAMP_TO_EDGE, wt, minF, maxF) {
        const texType = !isCubeTexture ? gl.TEXTURE_2D : gl.TEXTURE_CUBE_MAP;
        const texture = gl.createTexture();

        gl.bindTexture(texType, texture);
        gl.texParameteri(texType, gl.TEXTURE_WRAP_S, ws || gl.CLAMP_TO_EDGE);
        gl.texParameteri(texType, gl.TEXTURE_WRAP_T, wt || gl.CLAMP_TO_EDGE);
        gl.texParameteri(texType, gl.TEXTURE_MIN_FILTER, minF || gl.LINEAR);
        gl.texParameteri(texType, gl.TEXTURE_MAG_FILTER, maxF || gl.LINEAR);
        if (isCubeTexture) gl.texParameteri(texType, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE); //need webgl 2.0
        return texture;
    }

    static createRenderTarget(gl, width, height) {
        const frameBuffer = gl.createFramebuffer();
        const renderBuffer = gl.createRenderbuffer();
        const renderTarget = {
            frameBuffer: frameBuffer,
            renderBuffer: renderBuffer
        };
        this.resizeRenderTarget(gl, renderTarget, width, height);
        return renderTarget;
    }

    static createVaoAndBindAttributes(gl, attributes, indices) {

        const vao = gl.createVertexArray();
        gl.bindVertexArray(vao);

        attributes.forEach((attribute, attributeKey) => {
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, attribute.data, gl.STATIC_DRAW);
            gl.vertexAttribPointer(attributeKey, attribute.componentNum, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(attributeKey);
        });
        if (indices) {
            const buffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices.data, gl.STATIC_DRAW);
        }
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.bindVertexArray(null);
        return vao;
    }

    //update
    static updateTexture2D(gl, texture, image = null, internalformat, width = -1, height = -1, format, type, levels = 0) {
        const level = 0
            , realType = type || gl.UNSIGNED_BYTE
            , realInternalFormat = internalformat || gl.RGBA
            , realFormat = format || gl.RGBA;

        gl.bindTexture(gl.TEXTURE_2D, texture);
        if (width && height > -1) {
            gl.texImage2D(gl.TEXTURE_2D, level, realInternalFormat, width, height, 0, realFormat, realType, image);
        } else {
            gl.texImage2D(gl.TEXTURE_2D, level, realInternalFormat, realFormat, realType, image);
        }
        if (levels > 0 && width > -1 && height > -1) gl.texStorage2D(gl.TEXTURE_2D, levels, realInternalFormat, width, height);
    }

    static updateTextureCube(gl, texture, imageArr = [], internalformat, width = -1, height = -1, format, type, levels = 0) {

        const level = 0
            , realType = type || gl.UNSIGNED_BYTE
            , realInternalFormat = internalformat || gl.RGBA
            , realFormat = format || gl.RGBA;

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, texture);
        if (width > -1 && height > -1) {
            for (let i = 0; i < 6; ++i) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level, realInternalFormat, width, height, 0, realFormat, realType, imageArr[i] || null);
            }
        } else {
            for (let i = 0; i < 6; ++i) {
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X + i, level, realInternalFormat, realFormat, realType, imageArr[i]);
            }
        }
        if (levels > 0 && width > -1 && height > -1) gl.texStorage2D(gl.TEXTURE_CUBE_MAP, levels, realInternalFormat, width, height);
    }

    static bindRenderTargetTexture(gl, renderTarget, texture) {
        const frameBuffer = renderTarget ? renderTarget.frameBuffer : {frameBuffer: null};
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        if (texture) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        }
    }

    static bindRenderTargetTextureCube(gl, renderTarget, texture, uint, mipLevel = 0) {
        const frameBuffer = renderTarget ? renderTarget.frameBuffer : null;
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X + uint, texture, mipLevel);
    }

    static resizeRenderTarget(gl, renderTarget, width = 32, height = 32) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, renderTarget.frameBuffer);
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderTarget.renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderTarget.renderBuffer);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    }

    //dispose
    static deleteShader(gl, shader) {
        gl.deleteShader(shader);
    }
}

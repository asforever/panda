import WebGLExtensions from "./extensions/WebGLExtensions";

export default class WebGLState {
    static createContext({canvas, ...option}) {
        const contextOption = {};
        contextOption.alpha = option.alpha !== undefined ? option.alpha : false;
        contextOption.depth = option.depth !== undefined ? option.depth : true;
        contextOption.stencil = option.stencil !== undefined ? option.stencil : true;
        contextOption.antialias = option.antialias !== undefined ? option.antialias : true;
        contextOption.premultipliedAlpha = option.premultipliedAlpha !== undefined ? option.premultipliedAlpha : true;
        contextOption.preserveDrawingBuffer = option.preserveDrawingBuffer !== undefined ? option.preserveDrawingBuffer : false;
        contextOption.powerPreference = option.powerPreference !== undefined ? option.powerPreference : 'default';
        let gl = canvas.getContext('webgl', contextOption);
        if (!gl) alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return gl;
    }

    constructor(gl, extensions, capabilities) {
        this._gl = gl;
        this.extensions = extensions;
        this.capabilities = capabilities;
        this.textureUnit = 0;
    }

    //init programInfo and setter
    loaderShader(type, source) {
        const gl = this._gl;
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

    getBindPointForSamplerType(type) {
        const gl = this._gl;
        if (type === gl.SAMPLER_2D) return gl.TEXTURE_2D;
        if (type === gl.SAMPLER_CUBE) return gl.TEXTURE_CUBE_MAP;
        return undefined;
    }

    createUniformsSetter(program) {
        this.textureUnit = 0;

        const createUniformSetter = (gl, uniformInfo) => {
            let location = gl.getUniformLocation(program, uniformInfo.name);
            let type = uniformInfo.type;
            // Check if this uniform is an array
            let isArray = (uniformInfo.size > 1 && uniformInfo.name.substr(-3) === "[0]");
            if (type === gl.FLOAT && isArray) {
                return function (v) {
                    gl.uniform1fv(location, v);
                };
            }
            if (type === gl.FLOAT) {
                return function (v) {
                    gl.uniform1f(location, v);
                };
            }
            if (type === gl.FLOAT_VEC2) {
                return function (v) {
                    gl.uniform2fv(location, v);
                };
            }
            if (type === gl.FLOAT_VEC3) {
                return function (v) {
                    gl.uniform3fv(location, v);
                };
            }
            if (type === gl.FLOAT_VEC4) {
                return function (v) {
                    gl.uniform4fv(location, v);
                };
            }
            if (type === gl.INT && isArray) {
                return function (v) {
                    gl.uniform1iv(location, v);
                };
            }
            if (type === gl.INT) {
                return function (v) {
                    gl.uniform1i(location, v);
                };
            }
            if (type === gl.INT_VEC2) {
                return function (v) {
                    gl.uniform2iv(location, v);
                };
            }
            if (type === gl.INT_VEC3) {
                return function (v) {
                    gl.uniform3iv(location, v);
                };
            }
            if (type === gl.INT_VEC4) {
                return function (v) {
                    gl.uniform4iv(location, v);
                };
            }
            if (type === gl.BOOL) {
                return function (v) {
                    gl.uniform1iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC2) {
                return function (v) {
                    gl.uniform2iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC3) {
                return function (v) {
                    gl.uniform3iv(location, v);
                };
            }
            if (type === gl.BOOL_VEC4) {
                return function (v) {
                    gl.uniform4iv(location, v);
                };
            }
            if (type === gl.FLOAT_MAT2) {
                return function (v) {
                    gl.uniformMatrix2fv(location, false, v);
                };
            }
            if (type === gl.FLOAT_MAT3) {
                return function (v) {
                    gl.uniformMatrix3fv(location, false, v);
                };
            }
            if (type === gl.FLOAT_MAT4) {
                return function (v) {
                    gl.uniformMatrix4fv(location, false, v);
                };
            }
            if ((type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) && isArray) {
                let units = [];
                let bindPoint = this.getBindPointForSamplerType(type);
                for (let ii = 0; ii < uniformInfo.size; ++ii) {
                    units.push(++this.textureUnit);
                }
                return (function (units) {
                    return function (textures) {
                        gl.uniform1iv(location, units);
                        textures.forEach(function (texture, index) {
                            gl.activeTexture(gl.TEXTURE0 + units[index]);
                            gl.bindTexture(bindPoint, texture);
                        });
                    };
                }(units));

            }
            if (type === gl.SAMPLER_2D || type === gl.SAMPLER_CUBE) {
                let bindPoint = this.getBindPointForSamplerType(type);
                return (function (unit) {
                    return function (texture) {
                        gl.uniform1i(location, unit);
                        gl.activeTexture(gl.TEXTURE0 + unit);
                        gl.bindTexture(bindPoint, texture);
                    }
                }(++this.textureUnit));
            }
            console.error("unknown type: 0x" + type.toString(16)); // we should never get here.
        };

        const gl = this._gl;
        let uniformSetters = {};
        let numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);

        for (let ii = 0; ii < numUniforms; ++ii) {
            let uniformInfo = gl.getActiveUniform(program, ii);
            if (!uniformInfo) {
                break;
            }
            let name = uniformInfo.name;
            // remove the array suffix.
            if (name.substr(-3) === "[0]") {
                name = name.substr(0, name.length - 3);
            }
            uniformSetters[name] = createUniformSetter(gl, uniformInfo);
        }
        return uniformSetters;
    }

    createAttributeSetters(program) {

        function createAttributeSetter(gl, index) {
            return function (b) {
                gl.bindBuffer(gl.ARRAY_BUFFER, b.buffer);
                gl.enableVertexAttribArray(index);
                gl.vertexAttribPointer(
                    index, b.numComponents || b.size, b.type || gl.FLOAT, b.normalize || false, b.stride || 0, b.offset || 0);
            };
        }

        const gl = this._gl;
        let attribSetters = {};
        let numAttribs = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
        for (let ii = 0; ii < numAttribs; ++ii) {
            let attribInfo = gl.getActiveAttrib(program, ii);
            if (!attribInfo) {
                break;
            }
            let index = gl.getAttribLocation(program, attribInfo.name);
            attribSetters[attribInfo.name] = createAttributeSetter(gl, index);
        }

        return attribSetters;
    }

    createProgram(vsSource, fsSource) {
        const gl = this._gl;
        const vertexShader = this.loaderShader(gl.VERTEX_SHADER, vsSource);
        const fragmentShader = this.loaderShader(gl.FRAGMENT_SHADER, fsSource);
        const shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);
        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            gl.deleteProgram(shaderProgram);
            console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
            return null;
        }
        this.deleteShader(vertexShader);
        this.deleteShader(fragmentShader);
        return shaderProgram;
    }

    useProgram(program) {
        this._gl.useProgram(program);
    }

    createProgramInfo(vsSource, fsSource) {
        const program = this.createProgram(vsSource, fsSource);
        const uniformSetters = this.createUniformsSetter(program);
        const attribSetters = this.createAttributeSetters(program);
        return {
            program: program,
            uniformSetters: uniformSetters,
            attribSetters: attribSetters,
        };
    }

    //create attribute buffer
    getGLTypeForTypedArray(typedArray) {
        const gl = this._gl;
        if (typedArray instanceof Int8Array) {
            return gl.BYTE;
        }
        if (typedArray instanceof Uint8Array) {
            return gl.UNSIGNED_BYTE;
        }
        if (typedArray instanceof Int16Array) {
            return gl.SHORT;
        }
        if (typedArray instanceof Uint16Array) {
            return gl.UNSIGNED_SHORT;
        }
        if (typedArray instanceof Int32Array) {
            return gl.INT;
        }
        if (typedArray instanceof Uint32Array) {
            return gl.UNSIGNED_INT;
        }
        if (typedArray instanceof Float32Array) {
            return gl.FLOAT;
        }
        console.error("unsupported typed array type");
    }

    createBufferFromTypedArray(array, type, drawType) {
        const gl = this._gl;
        type = type || gl.ARRAY_BUFFER;
        let buffer = gl.createBuffer();
        gl.bindBuffer(type, buffer);
        gl.bufferData(type, array, drawType || gl.STATIC_DRAW);
        return buffer;
    }
    updateBufferFromTypedArray(buffer,array, type, drawType) {
        const gl = this._gl;
        type = type || gl.ARRAY_BUFFER;
        gl.bindBuffer(type, buffer);
        gl.bufferData(type, array, drawType || gl.STATIC_DRAW);
        return buffer;
    }

    createVAO() {
        const oes_vao_ext = this.extensions.get(WebGLExtensions.OES_VERTEX_ARRAY_OBJECT);
        return oes_vao_ext.createVertexArrayOES();
    }

    createAttributeBufferArrayInfo(typeArray, numComponents, isIndices) {
        const gl = this._gl;
        const type = isIndices ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
        const size = typeArray.length;
        return {
            buffer: this.createBufferFromTypedArray(typeArray, type),
            numComponents: numComponents,
            size: size,
            isIndices: isIndices,
            type: this.getGLTypeForTypedArray(typeArray),
        }
    }

    updateAttributeBufferArrayInfo(attributeInfo,newTypeArray) {
        const gl = this._gl;
        const type = attributeInfo.isIndices ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;

        this.updateBufferFromTypedArray(
            attributeInfo.buffer
            ,   newTypeArray
            ,   type
        );

        attributeInfo.size = newTypeArray.length;
        return attributeInfo;
    }

    updateSubAttributeBufferArrayInfo(attributeInfo, dstByteOffset,srcData) {
        const gl = this._gl;
        const type = attributeInfo.isIndices ? gl.ELEMENT_ARRAY_BUFFER : gl.ARRAY_BUFFER;
        gl.bindBuffer(type, attributeInfo.buffer);
        gl.bufferSubData(type, dstByteOffset,srcData);
    }

    //bind attribute
    bindVAO(VAO) {
        const oes_vao_ext = this.extensions.get(WebGLExtensions.OES_VERTEX_ARRAY_OBJECT);
        oes_vao_ext.bindVertexArrayOES(VAO);
    }

    setAttributes(setters, attribs) {
        setters = setters.attribSetters || setters;
        Object.keys(attribs).forEach(function (name) {
            let setter = setters[name];
            if (setter) {
                setter(attribs[name]);
            }
        });
    }

    setBuffersAndAttributes(setters, buffers) {
        const gl = this._gl;
        this.setAttributes(setters, buffers.attributes);
        if (buffers.indices) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices.buffer);
    }

    bindVAOAndSetAttributes(setters, attributes, indices,VAO) {
        const gl = this._gl;
        const oes_vao_ext = this.extensions.get(WebGLExtensions.OES_VERTEX_ARRAY_OBJECT);
        oes_vao_ext.bindVertexArrayOES(VAO);//gl.bindVertexArray(vao);//webgl2
        this.setAttributes(setters, attributes);
        if (indices) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indices.buffer);
        }
    }

    //bind uniforms
    setUniforms(setters, values) {
        setters = setters.uniformSetters || setters;
        Object.keys(values).forEach(function (name) {
            let setter = setters[name];
            if (setter) {
                setter(values[name]);
            }
        });
    }

    //texture
    genTexture({wrapS, wrapT, isCubeTexture = false}) {
        const gl = this._gl;
        const texType = !isCubeTexture ? gl.TEXTURE_2D : gl.TEXTURE_CUBE_MAP;
        const texture = gl.createTexture()
            , ws = gl[wrapS]
            , wt = gl[wrapT]
            , min = gl.NEAREST
            , mag = gl.NEAREST;

        gl.bindTexture(texType, texture);
      //  gl.generateMipmap(texType);
        gl.texParameteri(texType, gl.TEXTURE_WRAP_S, ws);
        gl.texParameteri(texType, gl.TEXTURE_WRAP_T, wt);
        gl.texParameteri(texType, gl.TEXTURE_MIN_FILTER, min);
        gl.texParameteri(texType, gl.TEXTURE_MAG_FILTER, mag);
        // gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_R, gl.CLAMP_TO_EDGE); //need webgl 2.0
        return texture;
    }

    updateTexture(texture, image, width = 1, height = 1, border = 0, type, isCubeTexture = false) {
        const gl = this._gl
            ,level = 0
            , internalFormat = type || gl.RGBA
            , srcFormat = type || gl.RGBA
            , srcType = gl.UNSIGNED_BYTE
            , glImage = image||null;

        if(isCubeTexture&&!image)return;
        if(!isCubeTexture){
            gl.bindTexture(gl.TEXTURE_2D, texture);
            if (!glImage) {
                gl.texImage2D(gl.TEXTURE_2D
                    , level, internalFormat, width, height
                    , border, srcFormat, srcType
                    , glImage);

            } else {
                gl.texImage2D(gl.TEXTURE_2D
                    , level
                    , internalFormat
                    , srcFormat
                    , srcType
                    , glImage);
            }
        }else {
            if(glImage instanceof Array){
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, level, internalFormat, srcFormat, srcType, glImage[3]);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, level, internalFormat, srcFormat, srcType, glImage[2]);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, level, internalFormat, srcFormat, srcType, glImage[0]);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, level, internalFormat, srcFormat, srcType, glImage[1]);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, level, internalFormat, srcFormat, srcType, glImage[4]);
                gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, level, internalFormat, srcFormat, srcType, glImage[5]);
            }

        }
    }

    //frameBuffer
    bindFrameBuffer(frameBuffer) {
        this._gl.bindFramebuffer(this._gl.FRAMEBUFFER, frameBuffer);
    }

    genFramebufferTexture(texture) {
        const gl = this._gl;
        const frameBuffer = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        return frameBuffer;
    }

    //renderBuffer
    genRenderBuffer(width, height) {
        const gl = this._gl;
        const renderBuffer = gl.createRenderbuffer();
        gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
        gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA4, width, height);
        gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, renderBuffer);
        return renderBuffer;
    }

    disable(id) {
        this._gl.disable(id);
    }

    enable(id) {
        this._gl.enable(id);
    }

    //
    viewport(left, top, width, height) {
        this._gl.viewport(left, top, width, height);
    }

    setClearColor(r, g, b, a) {
        this._gl.clearColor(r, g, b, a);
    }

    setClearDepth(depth) {
        this._gl.clearDepth(depth);
    }

    setClearStencil(stencil) {
        this._gl.clearStencil(stencil);
    }

    clear() {
        const gl = this._gl;
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
    }

    drawElements(vertexCount) {
        const gl = this._gl;
        const type = gl.UNSIGNED_SHORT;
        const offset = 0;
        gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    }

    //dispose

    deleteVAO(VAO) {
        const ext = this.extensions.get(WebGLExtensions.OES_VERTEX_ARRAY_OBJECT);
        ext.deleteVertexArrayOES(VAO)
    }

    deleteBuffer(buffer) {
        this._gl.deleteBuffer(buffer);
    }

    deleteTexture(textureBuffer) {
        this._gl.deleteTexture(textureBuffer);
    }

    deleteShader(shader) {
        this._gl.deleteShader(shader);
    }

    deleteProgram(program) {
        this._gl.deleteProgram(program);
    }

    deleteFramebuffer(frameBuffer) {
        this._gl.deleteFramebuffer(frameBuffer);
    }

    deleteRenderbuffer(renderBuffer) {
        this._gl.deleteRenderbuffer(renderBuffer);
    }

    disposeContext() {
        this._gl.getExtension('WEBGL_lose_context').loseContext();
    }

}

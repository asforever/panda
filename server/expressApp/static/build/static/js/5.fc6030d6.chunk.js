(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{49:function(e,t,a){"use strict";a.r(t);var r=a(32),n=a.n(r),s=a(33),i=a(2),o=a(3),c=a(36),u=a(7),h=a(6),p=a(8),l=a(35),g=function(){function e(t,a,r){Object(i.a)(this,e),this.state=t,this.texture=null,this.width=a,this.height=r}return Object(o.a)(e,[{key:"update",value:function(){}},{key:"dispose",value:function(){}},{key:"onResize",value:function(e){}}]),e}(),d=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"loadTexture",value:function(){var e=Object(s.a)(n.a.mark(function e(){var t,a,r;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.texture){e.next=6;break}return e.next=3,(new l.a).load("./assets/textures/hdr/skybox.png",void 0,l.a.IMAGE);case 3:t=e.sent,a=this.state,r=a.getContext(),this.texture=a.createTexture2D({image:t,internalFormat:r.RGBA16F,format:r.RGBA,type:r.FLOAT});case 6:return e.abrupt("return",this.texture);case 7:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getTexture",value:function(){return this.texture}}]),t}(g),m=a(37),x=a(14);function T(e,t,a){return(T="undefined"!==typeof Reflect&&Reflect.get?Reflect.get:function(e,t,a){var r=function(e,t){for(;!Object.prototype.hasOwnProperty.call(e,t)&&null!==(e=Object(h.a)(e)););return e}(e,t);if(r){var n=Object.getOwnPropertyDescriptor(r,t);return n.get?n.get.call(a):n.value}})(e,t,a||e)}var f=a(34),v=function(e){function t(e,a,r){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e,a,r))).onResize=function(e){T(Object(h.a)(t.prototype),"onResize",Object(x.a)(n)).call(Object(x.a)(n),e)},n.camera=null,n.sphereMeshInfo=null,n.backgroundMeshInfo=null,n}return Object(p.a)(t,e),Object(o.a)(t,[{key:"loadTexture",value:function(){var e=Object(s.a)(n.a.mark(function e(){var t,a,r,s,i,o,u,h,p,l,g,d,x,T,v,w,M,E,F,I,L,R,_,A,B,b,y,G,P,C,O,N,U,D,k,S,j,V,H,Y,z,q,K,W,X,J,Q,Z,$,ee,te,ae;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.texture){e.next=104;break}return e.next=3,(new c.b).load("./assets/textures/hdr/skybox.png",void 0,c.b.IMAGE);case 3:return t=e.sent,a=new Uint8Array([255,255,255,255]),r=new Uint8Array([255]),e.next=8,(new c.b).load("./assets/textures/pbr/rusted_iron/normal.png",void 0,c.b.IMAGE);case 8:for(s=e.sent,i=new Uint8Array([255]),o=new Uint8Array([255]),u=f.a.perspective(f.a.create(),Math.PI/2,1,.1,10),h=[f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),1,0,0),f.c.set(f.c.create(),0,-1,0)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),-1,0,0),f.c.set(f.c.create(),0,-1,0)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,1,0),f.c.set(f.c.create(),0,0,1)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,-1,0),f.c.set(f.c.create(),0,0,-1)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,0,1),f.c.set(f.c.create(),0,-1,0)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,0,-1),f.c.set(f.c.create(),0,-1,0))],p=f.a.perspective(f.a.create(),Math.PI/3,this.width/this.height,.1,300),l=f.a.lookAt(f.a.create(),f.c.set(f.c.create(),30,0,100),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,-1,0)),g=[30,0,70],d=new c.a,x=new c.g,T=new c.j(5,64,64),v=[f.c.set(f.c.create(),0,0,30),f.c.set(f.c.create(),30,30,30),f.c.set(f.c.create(),-30,-30,30),f.c.set(f.c.create(),30,-30,30)],w=[f.c.set(f.c.create(),300,300,300),f.c.set(f.c.create(),300,300,300),f.c.set(f.c.create(),300,300,300),f.c.set(f.c.create(),300,300,300)],M=this.state,(E=M.getContext()).getExtension("EXT_color_buffer_float"),E.enable(E.CULL_FACE),E.cullFace(E.FRONT),F=M.createVaoFromGeometry(d),I=M.createVaoFromGeometry(x),L=M.createVaoFromGeometry(T),R=M.createRenderTarget(512,512),_=M.createTexture2D({image:a,width:1,height:1,internalFormat:E.RGBA,format:E.RGBA,type:E.UNSIGNED_BYTE}),A=M.createTexture2D({image:r,width:1,height:1,internalFormat:E.LUMINANCE,format:E.LUMINANCE,type:E.UNSIGNED_BYTE}),B=M.createTexture2D({image:s,internalFormat:E.RGBA,format:E.RGBA,type:E.UNSIGNED_BYTE}),b=M.createTexture2D({image:i,width:1,height:1,internalFormat:E.LUMINANCE,format:E.LUMINANCE,type:E.UNSIGNED_BYTE}),y=M.createTexture2D({image:o,width:1,height:1,internalFormat:E.LUMINANCE,format:E.LUMINANCE,type:E.UNSIGNED_BYTE}),G=M.createTexture2D({image:t,internalFormat:E.RGBA16F,format:E.RGBA,type:E.FLOAT}),P=M.createTextureCube({internalFormat:E.RGBA16F,format:E.RGBA,type:E.FLOAT,width:512,height:512,minF:E.LINEAR_MIPMAP_LINEAR}),C=M.createTextureCube({internalFormat:E.RGBA16F,format:E.RGBA,type:E.FLOAT,width:32,height:32}),O=M.createTextureCube({internalFormat:E.RGBA16F,format:E.RGBA,type:E.FLOAT,width:128,height:128,minF:E.LINEAR_MIPMAP_LINEAR,levels:5}),N=M.createTexture2D({internalFormat:E.RG16F,format:E.RG,type:E.FLOAT,width:512,height:512}),this.texture=M.createTexture2D({internalFormat:E.RGBA16F,format:E.RGBA,type:E.FLOAT,width:this.width,height:this.height}),U=c.i.pbr,D=c.i.brdf,k=c.i.background,S=c.i.prefilter,j=c.i.convert_2d_to_cubemap,V=c.i.irradiance_convolution,H=M.createProgramInfo(U.vs.getSource(),U.fs.getSource()),Y=M.createProgramInfo(D.vs.getSource(),D.fs.getSource()),z=M.createProgramInfo(k.vs.getSource(),k.fs.getSource()),q=M.createProgramInfo(S.vs.getSource(),S.fs.getSource()),K=M.createProgramInfo(j.vs.getSource(),j.fs.getSource()),W=M.createProgramInfo(V.vs.getSource(),V.fs.getSource()),M.enableDepthTest(E.DEPTH_TEST),M.setClearColor(0,0,0,1),M.viewport(0,0,512,512),M.use(K.program),M.setMat4("projection",u),M.setInt("equirectangularMap",0),M.setTexture2D(G,0),M.setVao(F),X=0;X<6;++X)M.setCubeRenderTarget(R,P,X),M.setMat4("view",h[X]),M.clear(E.COLOR_BUFFER_BIT|E.DEPTH_BUFFER_BIT),M.drawElements(36);for(M.generateMipmap(E.TEXTURE_CUBE_MAP,P),M.unBindRenderTarget(),M.use(W.program),M.viewport(0,0,32,32),M.setMat4("projection",u),M.setInt("environmentMap",0),M.setTextureCube(P,0),M.setVao(F),M.resizeRenderTarget(R,32,32),M.clear(E.COLOR_BUFFER_BIT|E.DEPTH_BUFFER_BIT),J=0;J<6;++J)M.setMat4("view",h[J]),M.setCubeRenderTarget(R,C,J),M.drawElements(36);for(M.unBindRenderTarget(),M.use(q.program),M.setMat4("projection",u),M.setVao(F),M.setInt("environmentMap",0),5,Q=0;Q<5;++Q)for(Z=128*Math.pow(.5,Q),$=128*Math.pow(.5,Q),ee=Q/4,M.viewport(0,0,Z,$),M.resizeRenderTarget(R,Z,$),M.setFloat("roughness",ee),te=0;te<6;++te)M.setMat4("view",h[te]),M.setTextureCube(P,0),M.setCubeRenderTarget(R,O,te,Q),M.clear(E.COLOR_BUFFER_BIT|E.DEPTH_BUFFER_BIT),M.drawElements(36);for(M.unBindRenderTarget(),E.cullFace(E.BACK),M.use(Y.program),M.viewport(0,0,512,512),M.setVao(I),M.resizeRenderTarget(R,512,512),M.setRenderTarget(R,N),M.clear(E.COLOR_BUFFER_BIT|E.DEPTH_BUFFER_BIT),M.drawElements(x.indices.data.length),M.unBindRenderTarget(),M.clear(E.COLOR_BUFFER_BIT|E.DEPTH_BUFFER_BIT),E.cullFace(E.FRONT),M.use(H.program),M.resizeRenderTarget(R,this.width,this.height),M.viewport(0,0,this.width,this.height),M.setVao(L),M.setMat4("projection",p),M.setMat4("view",l),M.setVec3.apply(M,["camPos"].concat(g)),M.setFloat("opacity",1),M.setInt("irradianceMap",0),M.setInt("prefilterMap",1),M.setInt("brdfLUT",2),M.setInt("albedoMap",3),M.setInt("normalMap",4),M.setInt("aoMap",5),M.setInt("metallicMap",6),M.setInt("roughnessMap",5),ae=0;ae<v.length;++ae)M.setVec3.apply(M,["pointLightPositions["+ae+"]"].concat(Object(m.a)(v[ae]))),M.setVec3.apply(M,["pointLightColors["+ae+"]"].concat(Object(m.a)(w[ae])));M.use(z.program),M.setMat4("view",l),M.setMat4("projection",p),this.sphereMeshInfo=new c.c({program:H.program,vao:L,geometry:T,textures:{irradianceMap:new c.k({textureGL:C}),prefilterMap:new c.k({textureGL:O}),brdfLUTMap:new c.k({textureGL:N}),albedoMap:new c.k({textureGL:_}),normalMap:new c.k({textureGL:B}),aoMap:new c.k({textureGL:A}),metallicMap:new c.k({textureGL:b,image:i}),roughnessMap:new c.k({textureGL:y,image:o})},renderTarget:new c.h({target:R,texture:this.texture})}),this.backgroundMeshInfo=new c.c({program:z.program,vao:F,geometry:d,textures:{environmentMap:new c.l({textureGL:P})}}),this.update();case 104:return e.abrupt("return",this.texture);case 105:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getTexture",value:function(){return this.texture}},{key:"update",value:function(){var e=this.state,t=e.getContext(),a=this.sphereMeshInfo,r=this.backgroundMeshInfo,n=a.renderTarget,s=a.vao,i=a.geometry,o=a.textures,c=a.geometry.radius,u=o.irradianceMap.textureGL,h=o.prefilterMap.textureGL,p=o.brdfLUTMap.textureGL,l=o.albedoMap.textureGL,g=o.normalMap.textureGL,d=o.aoMap.textureGL,m=o.metallicMap.image,x=o.metallicMap.textureGL,T=o.roughnessMap.image,v=o.roughnessMap.textureGL,w=r.textures.environmentMap.textureGL,M=f.a.create();f.a.translate(M,M,f.c.set(f.c.create(),0,5*-c/2,0));var E=f.c.set(f.c.create(),c,0,0),F=f.c.set(f.c.create(),0,c,0);t.enable(t.CULL_FACE),t.cullFace(t.FRONT),e.setRenderTarget(n.target,n.texture),e.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),e.use(a.program),e.setVao(s),e.setTextureCube(u,0),e.setTextureCube(h,1),e.setTexture2D(p,2),e.setTexture2D(l,3),e.setTexture2D(g,4),e.setTexture2D(d,5);for(var I=0;I<6;I++){m[0]=42.5*I,e.updateTexture2D({textureBuffer:x,image:m,width:1,height:1,internalFormat:t.LUMINANCE,format:t.LUMINANCE,type:t.UNSIGNED_BYTE}),e.setTexture2D(x,6);for(var L=f.c.scale(f.c.create(),E,I),R=0;R<6;R++){T[0]=42.5*R,e.updateTexture2D({textureBuffer:v,image:T,width:1,height:1,internalFormat:t.LUMINANCE,format:t.LUMINANCE,type:t.UNSIGNED_BYTE}),f.a.rotate(M,M,Math.PI/4*Math.sin((new Date).getTime()/1e4),f.c.set(f.c.create(),0,1,0)),e.setTexture2D(v,7);var _=f.c.add(f.c.create(),L,f.c.scale(f.c.create(),F,R)),A=f.a.translate(f.a.create(),M,_);e.setMat4("model",A),e.drawElements(i.indices.data.length)}}e.use(r.program),e.setVao(r.vao),e.setTextureCube(w),e.drawElements(r.geometry.indices.data.length),e.unBindRenderTarget()}}]),t}(g),w=a(38),M=function(e){function t(e,a,r){var n;return Object(i.a)(this,t),(n=Object(u.a)(this,Object(h.a)(t).call(this,e,a,r))).opaqueMesh=null,n.transparentMesh=null,n}return Object(p.a)(t,e),Object(o.a)(t,[{key:"loadTexture",value:function(){var e=Object(s.a)(n.a.mark(function e(){var t,a,r,s,i,o,u,h,p,g,d,x,T,v,M,E,F,I,L,R,_,A,B,b,y,G,P,C,O,N,U,D,k,S,j,V,H,Y,z,q,K,W,X,J,Q,Z,$,ee,te,ae,re,ne=this;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(this.texture){e.next=120;break}return e.next=3,(new c.d).load("./assets/model/lantern/lantern_obj.obj");case 3:return t=e.sent,e.next=6,(new l.a).load("./assets/textures/hdr/skybox.png",void 0,l.a.IMAGE);case 6:return a=e.sent,e.next=9,(new l.a).load("./assets/model/lantern/textures/lantern_Base_Color.jpg",void 0,l.a.IMAGE);case 9:return r=e.sent,e.next=12,(new l.a).load("./assets/model/lantern/textures/lantern_Mixed_AO.jpg",void 0,l.a.IMAGE);case 12:return s=e.sent,e.next=15,(new l.a).load("./assets/model/lantern/textures/lantern_Normal_OpenGL.jpg",void 0,l.a.IMAGE);case 15:return i=e.sent,e.next=18,(new l.a).load("./assets/model/lantern/textures/lantern_Metallic.jpg",void 0,l.a.IMAGE);case 18:return o=e.sent,e.next=21,(new l.a).load("./assets/model/lantern/textures/lantern_Roughness.jpg",void 0,l.a.IMAGE);case 21:for(u=e.sent,this.width=window.innerWidth,this.height=window.innerHeight,h=f.a.perspective(f.a.create(),Math.PI/2,1,.1,10),p=[f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),1,0,0),f.c.set(f.c.create(),0,-1,0)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),-1,0,0),f.c.set(f.c.create(),0,-1,0)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,1,0),f.c.set(f.c.create(),0,0,1)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,-1,0),f.c.set(f.c.create(),0,0,-1)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,0,1),f.c.set(f.c.create(),0,-1,0)),f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,0,-1),f.c.set(f.c.create(),0,-1,0))],g=f.a.perspective(f.a.create(),Math.PI/3,this.width/this.height,.1,400),d=f.a.lookAt(f.a.create(),f.c.set(f.c.create(),80,80,80),f.c.set(f.c.create(),0,50,0),f.c.set(f.c.create(),0,1,0)),x=[80,80,80],T=new c.a,v=new c.g,M=(new c.f).parse(new c.e,t),E=[f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),-30,30,30),f.c.set(f.c.create(),30,30,30),f.c.set(f.c.create(),-30,-30,30),f.c.set(f.c.create(),30,-30,30)],F=[f.c.set(f.c.create(),300,300,0),f.c.set(f.c.create(),1e3,0,300),f.c.set(f.c.create(),300,0,300),f.c.set(f.c.create(),300,300,300),f.c.set(f.c.create(),300,0,300)],I=this.state,(L=I.getContext()).getExtension("EXT_color_buffer_float"),L.enable(L.CULL_FACE),L.cullFace(L.FRONT),R=I.createVaoFromGeometry(T),_=I.createVaoFromGeometry(v),A=this.captureRenderTarget=I.createRenderTarget(512,512),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,!0),B=I.createTexture2D({image:r,width:2048,height:2048,internalFormat:L.RGB,format:L.RGB,type:L.UNSIGNED_BYTE}),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,!0),b=I.createTexture2D({image:s,width:1,height:1,internalFormat:L.LUMINANCE,format:L.LUMINANCE,type:L.UNSIGNED_BYTE}),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,!0),y=I.createTexture2D({image:i,internalFormat:L.RGB,format:L.RGB,type:L.UNSIGNED_BYTE}),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,!0),G=I.createTexture2D({image:o,width:1,height:1,internalFormat:L.LUMINANCE,format:L.LUMINANCE,type:L.UNSIGNED_BYTE}),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,!0),P=I.createTexture2D({image:u,width:1,height:1,internalFormat:L.LUMINANCE,format:L.LUMINANCE,type:L.UNSIGNED_BYTE}),C=I.createTexture2D({image:a,internalFormat:L.RGBA16F,format:L.RGBA,type:L.FLOAT}),O=I.createTextureCube({internalFormat:L.RGBA16F,format:L.RGBA,type:L.FLOAT,width:512,height:512,minF:L.LINEAR_MIPMAP_LINEAR}),N=I.createTextureCube({internalFormat:L.RGBA16F,format:L.RGBA,type:L.FLOAT,width:32,height:32}),U=I.createTextureCube({internalFormat:L.RGBA16F,format:L.RGBA,type:L.FLOAT,width:128,height:128,minF:L.LINEAR_MIPMAP_LINEAR,levels:5}),D=I.createTexture2D({internalFormat:L.RG16F,format:L.RG,type:L.FLOAT,width:512,height:512}),this.texture=I.createTexture2D({internalFormat:L.RGBA16F,format:L.RGBA,type:L.FLOAT,width:this.width,height:this.height}),k=c.i.pbr,S=c.i.brdf,j=c.i.prefilter,V=c.i.convert_2d_to_cubemap,H=c.i.irradiance_convolution,Y=I.createProgramInfo(k.vs.getSource(),k.fs.addDefine("NORMAL_MAP").addDefine("POINT_LIGHT_NUMBER",5).getSource()),z=I.createProgramInfo(S.vs.getSource(),S.fs.getSource()),q=I.createProgramInfo(j.vs.getSource(),j.fs.getSource()),K=I.createProgramInfo(V.vs.getSource(),V.fs.getSource()),W=I.createProgramInfo(H.vs.getSource(),H.fs.getSource()),I.enableDepthTest(L.DEPTH_TEST),I.setClearColor(0,0,0,1),I.viewport(0,0,512,512),I.use(K.program),I.setMat4("projection",h),I.setInt("equirectangularMap",0),I.setTexture2D(C,0),I.setVao(R),X=0;X<6;++X)I.setCubeRenderTarget(A,O,X),I.setMat4("view",p[X]),I.clear(L.COLOR_BUFFER_BIT|L.DEPTH_BUFFER_BIT),I.drawElements(36);for(I.generateMipmap(L.TEXTURE_CUBE_MAP,O),I.unBindRenderTarget(),I.use(W.program),I.viewport(0,0,32,32),I.setMat4("projection",h),I.setInt("environmentMap",0),I.setTextureCube(O,0),I.setVao(R),I.resizeRenderTarget(A,32,32),I.clear(L.COLOR_BUFFER_BIT|L.DEPTH_BUFFER_BIT),J=0;J<6;++J)I.setMat4("view",p[J]),I.setCubeRenderTarget(A,N,J),I.drawElements(36);for(I.unBindRenderTarget(),I.use(q.program),I.setMat4("projection",h),I.setVao(R),I.setInt("environmentMap",0),5,Q=0;Q<5;++Q)for(Z=128*Math.pow(.5,Q),$=128*Math.pow(.5,Q),ee=Q/4,I.viewport(0,0,Z,$),I.resizeRenderTarget(A,Z,$),I.setFloat("roughness",ee),te=0;te<6;++te)I.setMat4("view",p[te]),I.setTextureCube(O,0),I.setCubeRenderTarget(A,U,te,Q),I.clear(L.COLOR_BUFFER_BIT|L.DEPTH_BUFFER_BIT),I.drawElements(36);for(I.unBindRenderTarget(),L.cullFace(L.BACK),I.use(z.program),I.viewport(0,0,512,512),I.setVao(_),I.resizeRenderTarget(A,512,512),I.setRenderTarget(A,D),I.clear(L.COLOR_BUFFER_BIT|L.DEPTH_BUFFER_BIT),I.drawElements(v.indices.data.length),I.unBindRenderTarget(),L.disable(L.CULL_FACE),I.use(Y.program),I.viewport(0,0,this.width,this.height),I.resizeRenderTarget(A,this.width,this.height),I.setMat4("projection",g),I.setMat4("view",d),I.setVec3.apply(I,["camPos"].concat(x)),I.setFloat("opacity",1),I.setInt("irradianceMap",0),I.setInt("prefilterMap",1),I.setInt("brdfLUT",2),I.setInt("albedoMap",3),I.setInt("normalMap",4),I.setInt("aoMap",5),I.setInt("metallicMap",6),I.setInt("roughnessMap",7),I.setTexture2D(P,7),I.setMat4("model",f.a.create()),I.clear(L.COLOR_BUFFER_BIT|L.DEPTH_BUFFER_BIT),ae=0;ae<E.length;++ae)I.setVec3.apply(I,["pointLightPositions["+ae+"]"].concat(Object(m.a)(E[ae]))),I.setVec3.apply(I,["pointLightColors["+ae+"]"].concat(Object(m.a)(F[ae])));re={irradianceMap:new w.a({textureGL:N}),prefilterMap:new w.a({textureGL:U}),brdfLUTMap:new w.a({textureGL:D}),albedoMap:new w.a({textureGL:B}),normalMap:new w.a({textureGL:y}),aoMap:new w.a({textureGL:b}),metallicMap:new w.a({textureGL:G,image:o}),roughnessMap:new w.a({textureGL:P,image:u})},this.opaqueMesh=new c.c({program:Y.program,vao:[],geometry:[],renderTarget:new c.h({target:A,texture:this.texture}),textures:re}),this.transparentMesh=new c.c({program:Y.program,vao:[],geometry:[],renderTarget:new c.h({target:A,texture:this.texture}),textures:re}),M.children.forEach(function(e,t){"glass lantern"===e.name?(ne.transparentMesh.geometry.push(e.geometry),ne.transparentMesh.vao.push(I.createVaoFromGeometry(e.geometry))):(ne.opaqueMesh.geometry.push(e.geometry),ne.opaqueMesh.vao.push(I.createVaoFromGeometry(e.geometry)))});case 120:return this.update(),e.abrupt("return",this.texture);case 122:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"update",value:function(){var e=this.state,t=e.getContext(),a=this.opaqueMesh.program,r=this.opaqueMesh.renderTarget,n=this.opaqueMesh.modelMatrix,s=this.opaqueMesh.textures;e.use(a),t.disable(t.CULL_FACE),e.setRenderTarget(r.target,r.texture),e.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),n.rotationByAxis(Math.PI/180,new c.n(0,1,0)),e.setMat4("model",n.data),e.setTextureCube(s.irradianceMap.textureGL,0),e.setTextureCube(s.prefilterMap.textureGL,1),e.setTexture2D(s.brdfLUTMap.textureGL,2),e.setTexture2D(s.albedoMap.textureGL,3),e.setTexture2D(s.normalMap.textureGL,4),e.setTexture2D(s.aoMap.textureGL,5),e.setTexture2D(s.metallicMap.textureGL,6),e.setTexture2D(s.roughnessMap.textureGL,7),t.disable(t.BLEND),e.setFloat("opacity",1);var i=this.opaqueMesh.geometry;this.opaqueMesh.vao.forEach(function(t,a){e.setVao(t),e.drawArray(i[a].attributes.position.data.length/3)}),t.enable(t.BLEND),e.setFloat("opacity",.8),t.blendEquation(t.FUNC_ADD),t.blendFuncSeparate(t.SRC_ALPHA,t.ONE_MINUS_SRC_ALPHA,t.ONE,t.ONE);var o=this.transparentMesh.geometry;this.transparentMesh.vao.forEach(function(t,a){e.setVao(t),e.drawArray(o[a].attributes.position.data.length/3)}),t.disable(t.BLEND),e.unBindRenderTarget()}},{key:"getTexture",value:function(){return this.texture}}]),t}(g),E=function(e){function t(){return Object(i.a)(this,t),Object(u.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(o.a)(t,[{key:"loadTexture",value:function(){var e=Object(s.a)(n.a.mark(function e(){var t;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.texture||(t=this.state,this.texture=t.createTexture2D({image:new Uint8Array([0,0,0,255]),width:1,height:1})),e.abrupt("return",this.texture);case 2:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"getTexture",value:function(){return this.texture}},{key:"update",value:function(){}}]),t}(g);a.d(t,"default",function(){return F});var F=function(){function e(){var t=this;Object(i.a)(this,e),this.onDown=function(a){var r=t.canvas.clientWidth/a.clientX>2;if(t.animateState===e.Stop)if(r)t.curPageIndex>0&&(t.mousePoint.set(0,0),t.updateMouse(),t.usePage(t.curPageIndex-1,!1),t.animateState=e.ToLastPage);else{if(t.curPageIndex>t.pages.length-3)return;t.mousePoint.set(t.width/t.height,0),t.updateMouse(),t.animateState=e.ToNextPage}},this.onMove=function(e){},this.onUp=function(e){},this.onResize=function(e){},this.canvas=null,this.curPageIndex=0,this.state=null,this.mousePoint=new c.m,this.width=1,this.height=1,this.pages=[],this.meshInfo={},this.camera=null,this.animateState=e.Stop,this.isDown=!1}return Object(o.a)(e,[{key:"run",value:function(){var e=Object(s.a)(n.a.mark(function e(t){return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return this.initContext(t),e.next=3,this.initPages();case 3:this.configContext(),this.initEvent(),this.draw();case 6:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"initContext",value:function(e){this.canvas=e,this.width=this.canvas.width,this.height=this.canvas.height,this.mousePoint.set(this.width/this.height,0),this.state=new c.o(e)}},{key:"initPages",value:function(){var e=Object(s.a)(n.a.mark(function e(){var t,a,r,s,i,o,c;return n.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.width,a=this.height,r=new d(this.state,t,a),e.next=4,r.loadTexture();case 4:return s=new v(this.state,t,a),e.next=7,s.loadTexture();case 7:return i=new M(this.state,t,a),e.next=10,i.loadTexture();case 10:return o=new E(this.state,t,a),e.next=13,o.loadTexture();case 13:c=[s,i,o],this.addPages(c);case 15:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"configContext",value:function(){var e=this.canvas,t=this.state,a=t.getContext();t.setClearColor(0,0,0,1),a.enable(a.CULL_FACE),a.cullFace(a.BACK),this.camera=f.a.perspective(f.a.create(),Math.PI/2,e.width/e.height,.1,10);var r=f.a.lookAt(f.a.create(),f.c.set(f.c.create(),0,0,.5),f.c.set(f.c.create(),0,0,0),f.c.set(f.c.create(),0,1,0)),n=new c.g(e.width/e.height,1),s=t.createVaoFromGeometry(n),i=c.i.book,o=t.createProgramInfo(i.vs.getSource(),i.fs.getSource()),u=n.width/n.height;t.viewport(0,0,e.width,e.height),t.use(o.program),t.setMat4("view",r),t.setMat4("projection",this.camera),t.setMat4("model",f.a.create()),t.setFloat("iTime",(new Date).getTime()),t.setFloat("width",n.width),t.setFloat("height",n.height),t.setInt("iChannel0",0),t.setInt("iChannel1",1),t.setTexture2D(this.pages[this.curPageIndex].getTexture(),0),t.setTexture2D(this.pages[this.curPageIndex+1].getTexture(),1),t.setFloat("ratio",u),t.setVec2("mouse",u,0),t.setVao(s),this.meshInfo=new c.c({program:o.program,vao:s,geometry:n})}},{key:"initEvent",value:function(){this.canvas.addEventListener("mousedown",this.onDown,!1),this.canvas.addEventListener("mousemove",this.onMove,!1),this.canvas.addEventListener("mouseover",this.onUp,!1),this.canvas.addEventListener("mouseup",this.onUp,!1),window.addEventListener("resize",this.onResize,!1),this.animate()}},{key:"addPages",value:function(e){this.pages=e}},{key:"usePage",value:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],a=this.state,r=this.pages[e]?this.pages[e].getTexture():null,n=this.pages[e+1]?this.pages[e+1].getTexture():null;this.curPageIndex=e,a.setTexture2D(r,0),a.setTexture2D(n,1),t?this.resetRightMouse():this.resetLeftMouse()}},{key:"resetLeftMouse",value:function(){this.mousePoint.set(0,0),this.updateMouse()}},{key:"resetRightMouse",value:function(){var e=this.width/this.height;this.mousePoint.set(e,0),this.updateMouse()}},{key:"updateMouse",value:function(){this.state.setVec2("mouse",this.mousePoint.x,this.mousePoint.y)}},{key:"draw",value:function(){var e=this.state,t=e.getContext();this.pages[this.curPageIndex].update(),t.cullFace(t.BACK),e.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT),e.use(this.meshInfo.program),e.setVao(this.meshInfo.vao),e.drawElements(this.meshInfo.geometry.indices.data.length)}},{key:"animate",value:function(){var t=this.canvas.clientWidth,a=this.width/this.height,r=2*Math.sin(Math.PI*this.mousePoint.x/t+.01);if(this.animateState===e.ToLastPage&&(this.mousePoint.x<a?(this.mousePoint.add(new c.m(r,.003)),this.updateMouse()):(this.resetRightMouse(),this.animateState=e.Stop)),this.animateState===e.ToNextPage)if(this.mousePoint.x>0){var n=a/2>this.mousePoint.x?1:-1;this.mousePoint.sub(new c.m(r,.003*n)),this.updateMouse()}else this.usePage(this.curPageIndex+1),this.animateState=e.Stop;this.draw(),requestAnimationFrame(this.animate.bind(this))}},{key:"dispose",value:function(){this.canvas.removeEventListener("mousedown",this.onDown),this.canvas.removeEventListener("mousemove",this.onMove),this.canvas.removeEventListener("mouseover",this.onUp),this.canvas.removeEventListener("mouseup",this.onUp),window.removeEventListener("resize",this.onResize),this.pages.forEach(function(e){e.dispose()})}}]),e}();F.Tolerance=.01,F.ToNextPage="animate to next",F.ToLastPage="animate to last",F.Stop="stop"}}]);
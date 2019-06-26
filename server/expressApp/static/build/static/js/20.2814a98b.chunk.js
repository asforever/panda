(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{50:function(e,t,n){"use strict";var a=n(46),r=n.n(a),i=n(47),o=n(4),s=n(5),c=function e(){Object(o.a)(this,e)};c.TEXT="text",c.IMAGE="image";var l=function e(){Object(o.a)(this,e)};l.IMAGE=(l.ROOT_URL="http://95.169.6.128:9000/")+"image/",l.MODEL_OBJ=l.ROOT_URL+"obj/",l.MODEL_OBJ_LIST=l.ROOT_URL+"table/modelObjList",l.DIFFUSE_CONTAINER=l.IMAGE+"container.jpg",l.DIFFUSE_CONTAINER2=l.IMAGE+"container2.png",l.SPECULAR_CONTAINER2=l.IMAGE+"container2_specular.png",l.SKY_BOX_TOP=l.IMAGE+"skybox/top.jpg",l.SKY_BOX_BOTTOM=l.IMAGE+"skybox/bottom.jpg",l.SKY_BOX_LEFT=l.IMAGE+"skybox/left.jpg",l.SKY_BOX_RIGHT=l.IMAGE+"skybox/right.jpg",l.SKY_BOX_FRONT=l.IMAGE+"skybox/front.jpg",l.SKY_BOX_BACK=l.IMAGE+"skybox/back.jpg",l.MATRIX=l.IMAGE+"matrix.jpg",l.AWESOME_FACE=l.IMAGE+"awesomeface.png",n.d(t,"a",function(){return u});var u=function(){function e(){Object(o.a)(this,e),this.images={},this.objModels={}}return Object(s.a)(e,null,[{key:"getInstance",value:function(){return this._ins||(this._ins=new e),this._ins}}]),Object(s.a)(e,[{key:"getModelObj",value:function(){var e=Object(i.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.objModels[t]){e.next=2;break}return e.abrupt("return",this.objModels[t]);case 2:return e.next=4,this.fetch(t,void 0,c.TEXT);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"getImage",value:function(){var e=Object(i.a)(r.a.mark(function e(t){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!this.images[t]){e.next=2;break}return e.abrupt("return",this.images[t]);case 2:return e.next=4,this.fetch(t,void 0,c.IMAGE);case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()},{key:"fetch",value:function(e){function t(t,n,a){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(e,t,n){var a=this,r=Object.assign(t||{},{cache:"no-cache",credentials:"same-origin",headers:{"content-type":"application/json"},method:"GET",mode:"cors",redirect:"follow",referrer:"no-referrer"});return new Promise(function(t){fetch(e,r).then(function(r){switch(n){case c.TEXT:r.text().then(function(e){t(e)});break;case c.IMAGE:r.blob().then(function(n){var r=new Image;window.test=URL.createObjectURL(n),r.src=URL.createObjectURL(n),r.onload=function(){a.images[e]=r,t(r)}});break;default:t(r.json())}})})})}]),e}();u.WebAPI=l},55:function(e,t,n){"use strict";n.d(t,"a",function(){return i});var a=n(4),r=n(5),i=function(){function e(){Object(a.a)(this,e),this.listens=[]}return Object(r.a)(e,[{key:"addListener",value:function(e,t,n){n.addEventListener(e,t,!1),this.listens.push({target:n,type:e,handler:t})}},{key:"dispose",value:function(){this.listens.forEach(function(e){e.target.removeEventListener(e.type,e.handler)})}}]),e}()},80:function(e,t,n){"use strict";n.r(t);var a=n(4),r=n(14),i=n(13),o=n(51),s=n(5),c=n(15),l=n(56);window.THREE=l,n(57),n(58);var u=l,h=n(55),d=function(){function e(){Object(a.a)(this,e),this.canvas=null,this.renderer=null,this.scene=null,this.camera=null,this.needRender=!1,this.listenerManager=new h.a}return Object(s.a)(e,[{key:"setUp",value:function(e){this.renderer=new u.WebGLRenderer({canvas:e}),this.scene=new u.Scene;var t=this.camera=new u.PerspectiveCamera(45,e.clientWidth/e.clientHeight,1,1e4);t.position.set(200,300,500),t.lookAt(new u.Vector3(0,0,0)),this.canvas=e,e.width=e.clientWidth,e.height=e.clientHeight,this.listenerManager.addListener("resize",this.resize.bind(this),window),this.loadScene(),this.resize(),this.animate()}},{key:"loadScene",value:function(){}},{key:"dispose",value:function(){this.needRender=!1,this.listenerManager.dispose(),this.renderer&&this.renderer.dispose()}},{key:"render",value:function(){this.renderer.render(this.scene,this.camera)}},{key:"resize",value:function(){var e=this.canvas,t=e.width=e.clientWidth,n=e.height=e.clientHeight;this.renderer.setSize(t,n,!1),this.camera.aspect=t/n,this.camera.updateProjectionMatrix(),this.needRender||this.render()}},{key:"animate",value:function(){this.needRender&&(this.render(),requestAnimationFrame(this.animate.bind(this)))}}]),e}(),f=n(50);n.d(t,"default",function(){return v});var v=function(e){function t(e){var n;return Object(a.a)(this,t),(n=Object(r.a)(this,Object(i.a)(t).call(this,e))).meshes=[],n.needRender=!0,n}return Object(c.a)(t,e),Object(s.a)(t,null,[{key:"generateTexture",value:function(){var e=document.createElement("canvas");e.width=256,e.height=256;for(var t=e.getContext("2d"),n=0;n<2e4;++n)t.fillStyle="rgba(255,"+Math.floor(255*Math.random())+","+Math.floor(255*Math.random())+",1)",t.fillRect(Math.random()*e.width,Math.random()*e.height,2,2);return e}}]),Object(s.a)(t,[{key:"loadScene",value:function(){var e=this,n=new u.Texture;n.wrapS=n.wrapT=u.RepeatWrapping,n.needsUpdate=!0,f.a.getInstance().getImage(t.COLOR_MAP).then(function(e){n.image=e});var a=new u.Texture(t.generateTexture());a.wrapS=a.wrapT=u.RepeatWrapping,a.needsUpdate=!0,f.a.getInstance().getModelObj(t.MODEL_NAME).then(function(t){var r=(new u.OBJLoader).parse(t);r.traverse(function(t){if(t instanceof u.Mesh)for(var i=0;i<60;i++){var o={color:{type:"c",value:new u.Color(16777215)},hairMap:{type:"t",value:a},colorMap:{type:"t",value:n},offset:{type:"f",value:i/60},globalTime:{type:"f",value:(new Date).getTime()},gravity:{type:"v3",value:new u.Vector3(0,-.98,0)}},s=t.geometry,c=new u.ShaderMaterial({uniforms:o,vertexShader:'uniform float offset;\nuniform float globalTime;\nuniform vec3 gravity;\nvarying vec2 vUv;\nvarying vec3 vNormal;\nconst float spacing = 32.0;\nvoid main() {\nvec3 displacement = vec3(0.0,0.0,0.0);\nvec3 forceDirection = vec3(0.0,0.0,0.0);\n// "wind"\nforceDirection.x = sin(globalTime+position.x*0.05) * 0.5;\nforceDirection.y = cos(globalTime*0.7+position.y*0.04) * 0.5;\nforceDirection.z = sin(globalTime*0.7+position.y*0.04) * 0.5;\n// "gravity"\ndisplacement = gravity + forceDirection;\nfloat displacementFactor = pow(offset, 3.0);\nvec3 aNormal = normal;\naNormal.xyz += displacement*displacementFactor;\n// move outwards depending on offset(layer) and normal+force+gravity\nvec3 animated = vec3( position.x, position.y, position.z )+(normalize(aNormal)*offset*spacing);\nvNormal = normalize(normal*aNormal);\nvUv = uv*20.0;\nvec4 mvPosition = modelViewMatrix * vec4( animated, 1.0 );\n\ngl_Position = projectionMatrix * mvPosition;\n\n}\n',fragmentShader:"uniform sampler2D hairMap;\nuniform sampler2D colorMap;\nuniform vec3 color;\nuniform float offset;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvoid main() {\nvec4 hairColor = texture2D(hairMap, vec2(vUv.s, vUv.t));\nvec4 col = texture2D(colorMap, vec2(vUv.s*0.2, vUv.t*0.2));\n// discard no hairs + above the max length\nif (hairColor.a <= 0.0 || hairColor.g < offset) {\ndiscard;\n}\n// darker towards bottom of the hair\nfloat shadow = mix(0.0,hairColor.b*1.2,offset);\n// light\nvec3 light = vec3(0.1,1.0,0.3);\nfloat d = pow(max(0.25,dot(vNormal.xyz, light))*2.75, 1.4);\ngl_FragColor = vec4(color*col.xyz*d*shadow, 1.0);\n\n}\n",depthTest:!0,depthWrite:!0,fog:!1,transparent:!0}),l=new u.Mesh(s,c);l.matrixAutoUpdate=!1,l.frustumCulled=!1,e.meshes.push(l),r.add(l)}}),e.scene.add(r)})}},{key:"animate",value:function(){for(var e=0;e<this.meshes.length;e++)this.meshes[e].material.uniforms.globalTime.value=Math.sin((new Date).getTime()/500);Object(o.a)(Object(i.a)(t.prototype),"animate",this).call(this)}}]),t}(d);v.MODEL_NAME=f.a.WebAPI.MODEL_OBJ+"Annie/Annie.obj",v.COLOR_MAP=f.a.WebAPI.MODEL_OBJ+"Annie/AnnieFur.jpg"}}]);
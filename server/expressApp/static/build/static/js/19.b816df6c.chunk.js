(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{46:function(t,e,r){t.exports=r(48)},47:function(t,e,r){"use strict";function n(t,e,r,n,o,i,a){try{var c=t[i](a),s=c.value}catch(u){return void r(u)}c.done?e(s):Promise.resolve(s).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise(function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,s,"next",t)}function s(t){n(a,o,i,c,s,"throw",t)}c(void 0)})}}r.d(e,"a",function(){return o})},48:function(t,e,r){var n=function(){return this||"object"===typeof self&&self}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r(49),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(a){n.regeneratorRuntime=void 0}},49:function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag",u="object"===typeof t,h=e.regeneratorRuntime;if(h)u&&(t.exports=h);else{(h=e.regeneratorRuntime=u?t.exports:{}).wrap=b;var f="suspendedStart",l="suspendedYield",p="executing",g="completed",y={},d={};d[a]=function(){return this};var m=Object.getPrototypeOf,v=m&&m(m(S([])));v&&v!==n&&o.call(v,a)&&(d=v);var w=_.prototype=E.prototype=Object.create(d);x.prototype=w.constructor=_,_.constructor=x,_[s]=x.displayName="GeneratorFunction",h.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},h.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,s in t||(t[s]="GeneratorFunction")),t.prototype=Object.create(w),t},h.awrap=function(t){return{__await:t}},I(j.prototype),j.prototype[c]=function(){return this},h.AsyncIterator=j,h.async=function(t,e,r,n){var o=new j(b(t,e,r,n));return h.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},I(w),w[s]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},h.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},h.values=S,k.prototype={constructor:k,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(T),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var s=o.call(a,"catchLoc"),u=o.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),T(r),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;T(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:S(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),y}}}function b(t,e,r,n){var o=e&&e.prototype instanceof E?e:E,i=Object.create(o.prototype),a=new k(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===g){if("throw"===o)throw i;return M()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=L(a,r);if(c){if(c===y)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=g,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var s=O(t,e,r);if("normal"===s.type){if(n=r.done?g:l,s.arg===y)continue;return{value:s.arg,done:r.done}}"throw"===s.type&&(n=g,r.method="throw",r.arg=s.arg)}}}(t,r,a),i}function O(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function E(){}function x(){}function _(){}function I(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function j(t){var e;this._invoke=function(r,n){function i(){return new Promise(function(e,i){!function e(r,n,i,a){var c=O(t[r],t,n);if("throw"!==c.type){var s=c.arg,u=s.value;return u&&"object"===typeof u&&o.call(u,"__await")?Promise.resolve(u.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(u).then(function(t){s.value=t,i(s)},function(t){return e("throw",t,i,a)})}a(c.arg)}(r,n,e,i)})}return e=e?e.then(i,i):i()}}function L(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,L(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=O(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function A(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function T(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function k(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(A,this),this.reset(!0)}function S(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:M}}function M(){return{value:r,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},50:function(t,e,r){"use strict";var n=r(46),o=r.n(n),i=r(47),a=r(5),c=r(6),s=function t(){Object(a.a)(this,t)};s.TEXT="text",s.IMAGE="image";var u=function t(){Object(a.a)(this,t)};u.IMAGE=(u.ROOT_URL="http://95.169.6.128:9000/")+"image/",u.MODEL_OBJ=u.ROOT_URL+"obj/",u.MODEL_OBJ_LIST=u.ROOT_URL+"table/modelObjList",u.DIFFUSE_CONTAINER=u.IMAGE+"container.jpg",u.DIFFUSE_CONTAINER2=u.IMAGE+"container2.png",u.SPECULAR_CONTAINER2=u.IMAGE+"container2_specular.png",u.SKY_BOX_TOP=u.IMAGE+"skybox/top.jpg",u.SKY_BOX_BOTTOM=u.IMAGE+"skybox/bottom.jpg",u.SKY_BOX_LEFT=u.IMAGE+"skybox/left.jpg",u.SKY_BOX_RIGHT=u.IMAGE+"skybox/right.jpg",u.SKY_BOX_FRONT=u.IMAGE+"skybox/front.jpg",u.SKY_BOX_BACK=u.IMAGE+"skybox/back.jpg",u.MATRIX=u.IMAGE+"matrix.jpg",u.AWESOME_FACE=u.IMAGE+"awesomeface.png",r.d(e,"a",function(){return h});var h=function(){function t(){Object(a.a)(this,t),this.images={},this.objModels={}}return Object(c.a)(t,null,[{key:"getInstance",value:function(){return this._ins||(this._ins=new t),this._ins}}]),Object(c.a)(t,[{key:"getModelObj",value:function(){var t=Object(i.a)(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.objModels[e]){t.next=2;break}return t.abrupt("return",this.objModels[e]);case 2:return t.next=4,this.fetch(e,void 0,s.TEXT);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"getImage",value:function(){var t=Object(i.a)(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.images[e]){t.next=2;break}return t.abrupt("return",this.images[e]);case 2:return t.next=4,this.fetch(e,void 0,s.IMAGE);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"fetch",value:function(t){function e(e,r,n){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t,e,r){var n=this,o=Object.assign(e||{},{cache:"no-cache",credentials:"same-origin",headers:{"content-type":"application/json"},method:"GET",mode:"cors",redirect:"follow",referrer:"no-referrer"});return new Promise(function(e){fetch(t,o).then(function(o){switch(r){case s.TEXT:o.text().then(function(t){e(t)});break;case s.IMAGE:o.blob().then(function(r){var o=new Image;window.test=URL.createObjectURL(r),o.src=URL.createObjectURL(r),o.onload=function(){n.images[t]=o,e(o)}});break;default:e(o.json())}})})})}]),t}();h.WebAPI=u},77:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return d});var n=r(46),o=r.n(n),i=r(47),a=r(5),c=r(6),s=r(16),u=r(14),h=r(51),f=r(15),l=r(53),p=r(52),g=r(50),y=r(54),d=function(t){function e(){return Object(a.a)(this,e),Object(s.a)(this,Object(u.a)(e).apply(this,arguments))}return Object(f.a)(e,t),Object(c.a)(e,[{key:"setUp",value:function(t){var r=this;Object(h.a)(Object(u.a)(e.prototype),"setUp",this).call(this,t),this.lastTime=(new Date).getTime(),this.loadScene().then(function(){r.startAnimate(),r.resize()})}},{key:"loadScene",value:function(){var t=Object(i.a)(o.a.mark(function t(){var e,r,n,i,a,c,s,u,h,f,l,d,m,v,w;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,g.a.getInstance().getImage(g.a.WebAPI.SKY_BOX_TOP);case 2:return e=t.sent,t.next=5,g.a.getInstance().getImage(g.a.WebAPI.SKY_BOX_BOTTOM);case 5:return r=t.sent,t.next=8,g.a.getInstance().getImage(g.a.WebAPI.SKY_BOX_LEFT);case 8:return n=t.sent,t.next=11,g.a.getInstance().getImage(g.a.WebAPI.SKY_BOX_RIGHT);case 11:return i=t.sent,t.next=14,g.a.getInstance().getImage(g.a.WebAPI.SKY_BOX_FRONT);case 14:return a=t.sent,t.next=17,g.a.getInstance().getImage(g.a.WebAPI.SKY_BOX_BACK);case 17:return c=t.sent,t.next=20,g.a.getInstance().getImage(g.a.WebAPI.AWESOME_FACE);case 20:s=t.sent,this.camera.position.set(-7,7,10),this.camera.updateMatrix(),this.camera.lookAt(new p.v(0,0,0)),u=[e,r,n,i,a,c],h=new p.t({image:u}),(f=new p.e).dir=new p.v(0,-.6,-1.5),l=new p.a,this.scene.add(f),this.scene.add(l),(d=new p.s({image:s})).wrapS=d.wrapT=y.a.CLAMP_TO_EDGE,m=new p.c(3,3,3),(v=new p.l({map:d,envMap:h,cullFace:!1})).reflect=.8,this.mesh=new p.f(m,v),this.scene.add(this.mesh),(w=this.mesh.geometry.attributes.position).addSubData(new p.b(0,new Float32Array([-1.5,0,3,1.5,0,3]))),w.addSubData(new p.b(240,new Float32Array([-3,0,-1.5,-3,0,1.5])));case 41:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){this.mesh.rotation.x+=.01,this.mesh.rotation.y+=.01,this.mesh.updateMatrix(),this.renderer.render(this.scene,this.camera)}}]),e}(l.a)}}]);
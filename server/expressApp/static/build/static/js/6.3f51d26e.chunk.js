(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{46:function(t,e,r){t.exports=r(48)},47:function(t,e,r){"use strict";function n(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void r(s)}c.done?e(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise(function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)})}}r.d(e,"a",function(){return o})},48:function(t,e,r){var n=function(){return this||"object"===typeof self&&self}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r(49),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(a){n.regeneratorRuntime=void 0}},49:function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag",s="object"===typeof t,h=e.regeneratorRuntime;if(h)s&&(t.exports=h);else{(h=e.regeneratorRuntime=s?t.exports:{}).wrap=b;var f="suspendedStart",l="suspendedYield",p="executing",y="completed",g={},d={};d[a]=function(){return this};var v=Object.getPrototypeOf,m=v&&v(v(T([])));m&&m!==n&&o.call(m,a)&&(d=m);var w=j.prototype=E.prototype=Object.create(d);x.prototype=w.constructor=j,j.constructor=x,j[u]=x.displayName="GeneratorFunction",h.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},h.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,j):(t.__proto__=j,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(w),t},h.awrap=function(t){return{__await:t}},_(L.prototype),L.prototype[c]=function(){return this},h.AsyncIterator=L,h.async=function(t,e,r,n){var o=new L(b(t,e,r,n));return h.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},_(w),w[u]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},h.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},h.values=T,A.prototype={constructor:A,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(M),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),s=o.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),M(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;M(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:T(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),g}}}function b(t,e,r,n){var o=e&&e.prototype instanceof E?e:E,i=Object.create(o.prototype),a=new A(n||[]);return i._invoke=function(t,e,r){var n=f;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return R()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=I(a,r);if(c){if(c===g)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=O(t,e,r);if("normal"===u.type){if(n=r.done?y:l,u.arg===g)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function O(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function E(){}function x(){}function j(){}function _(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function L(t){var e;this._invoke=function(r,n){function i(){return new Promise(function(e,i){!function e(r,n,i,a){var c=O(t[r],t,n);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"===typeof s&&o.call(s,"__await")?Promise.resolve(s.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(s).then(function(t){u.value=t,i(u)},function(t){return e("throw",t,i,a)})}a(c.arg)}(r,n,e,i)})}return e=e?e.then(i,i):i()}}function I(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,I(t,e),"throw"===e.method))return g;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=O(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,g;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,g):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,g)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function M(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function T(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:R}}function R(){return{value:r,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},50:function(t,e,r){"use strict";var n=r(46),o=r.n(n),i=r(47),a=r(4),c=r(5),u=function t(){Object(a.a)(this,t)};u.TEXT="text",u.IMAGE="image";var s=function t(){Object(a.a)(this,t)};s.IMAGE=(s.ROOT_URL="http://95.169.6.128:9000/")+"image/",s.MODEL_OBJ=s.ROOT_URL+"obj/",s.MODEL_OBJ_LIST=s.ROOT_URL+"table/modelObjList",s.DIFFUSE_CONTAINER=s.IMAGE+"container.jpg",s.DIFFUSE_CONTAINER2=s.IMAGE+"container2.png",s.SPECULAR_CONTAINER2=s.IMAGE+"container2_specular.png",s.SKY_BOX_TOP=s.IMAGE+"skybox/top.jpg",s.SKY_BOX_BOTTOM=s.IMAGE+"skybox/bottom.jpg",s.SKY_BOX_LEFT=s.IMAGE+"skybox/left.jpg",s.SKY_BOX_RIGHT=s.IMAGE+"skybox/right.jpg",s.SKY_BOX_FRONT=s.IMAGE+"skybox/front.jpg",s.SKY_BOX_BACK=s.IMAGE+"skybox/back.jpg",s.MATRIX=s.IMAGE+"matrix.jpg",s.AWESOME_FACE=s.IMAGE+"awesomeface.png",r.d(e,"a",function(){return h});var h=function(){function t(){Object(a.a)(this,t),this.images={},this.objModels={}}return Object(c.a)(t,null,[{key:"getInstance",value:function(){return this._ins||(this._ins=new t),this._ins}}]),Object(c.a)(t,[{key:"getModelObj",value:function(){var t=Object(i.a)(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.objModels[e]){t.next=2;break}return t.abrupt("return",this.objModels[e]);case 2:return t.next=4,this.fetch(e,void 0,u.TEXT);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"getImage",value:function(){var t=Object(i.a)(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.images[e]){t.next=2;break}return t.abrupt("return",this.images[e]);case 2:return t.next=4,this.fetch(e,void 0,u.IMAGE);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"fetch",value:function(t){function e(e,r,n){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t,e,r){var n=this,o=Object.assign(e||{},{cache:"no-cache",credentials:"same-origin",headers:{"content-type":"application/json"},method:"GET",mode:"cors",redirect:"follow",referrer:"no-referrer"});return new Promise(function(e){fetch(t,o).then(function(o){switch(r){case u.TEXT:o.text().then(function(t){e(t)});break;case u.IMAGE:o.blob().then(function(r){var o=new Image;window.test=URL.createObjectURL(r),o.src=URL.createObjectURL(r),o.onload=function(){n.images[t]=o,e(o)}});break;default:e(o.json())}})})})}]),t}();h.WebAPI=s},63:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return g});var n=r(46),o=r.n(n),i=r(47),a=r(4),c=r(5),u=r(14),s=r(13),h=r(51),f=r(15),l=r(52),p=r(53),y=r(50),g=function(t){function e(){return Object(a.a)(this,e),Object(u.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(f.a)(e,t),Object(c.a)(e,[{key:"setUp",value:function(t){var r=this;Object(h.a)(Object(s.a)(e.prototype),"setUp",this).call(this,t),this.loadScene().then(function(){r.resize()})}},{key:"loadScene",value:function(){var t=Object(i.a)(o.a.mark(function t(){var e,r,n,i,a;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return this.needRender=!0,t.next=3,y.a.getInstance().getImage(y.a.WebAPI.DIFFUSE_CONTAINER2);case 3:e=t.sent,r=new p.q({image:e}),n=new p.g({map:r}),i=new p.s,(a=this.mesh=new p.f(i,n)).position.set(1,0,0),a.rotation.set(0,0,Math.PI/4),a.updateMatrix(),this.scene.add(a),this.startAnimate();case 13:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()},{key:"render",value:function(){this.mesh.position.set(Math.sin((new Date).getTime()/1e3),0,0),this.mesh.rotation.set(0,0,Math.sin((new Date).getTime()/1e3)*Math.PI),this.mesh.updateMatrix(),this.renderer.render(this.scene,this.camera)}}]),e}(l.a)}}]);
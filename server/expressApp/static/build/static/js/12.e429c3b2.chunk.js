(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{46:function(t,e,r){t.exports=r(48)},47:function(t,e,r){"use strict";function n(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(s){return void r(s)}c.done?e(u):Promise.resolve(u).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise(function(o,i){var a=t.apply(e,r);function c(t){n(a,o,i,c,u,"next",t)}function u(t){n(a,o,i,c,u,"throw",t)}c(void 0)})}}r.d(e,"a",function(){return o})},48:function(t,e,r){var n=function(){return this||"object"===typeof self&&self}()||Function("return this")(),o=n.regeneratorRuntime&&Object.getOwnPropertyNames(n).indexOf("regeneratorRuntime")>=0,i=o&&n.regeneratorRuntime;if(n.regeneratorRuntime=void 0,t.exports=r(49),o)n.regeneratorRuntime=i;else try{delete n.regeneratorRuntime}catch(a){n.regeneratorRuntime=void 0}},49:function(t,e){!function(e){"use strict";var r,n=Object.prototype,o=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",u=i.toStringTag||"@@toStringTag",s="object"===typeof t,f=e.regeneratorRuntime;if(f)s&&(t.exports=f);else{(f=e.regeneratorRuntime=s?t.exports:{}).wrap=b;var h="suspendedStart",l="suspendedYield",p="executing",y="completed",d={},g={};g[a]=function(){return this};var v=Object.getPrototypeOf,m=v&&v(v(R([])));m&&m!==n&&o.call(m,a)&&(g=m);var w=j.prototype=E.prototype=Object.create(g);x.prototype=w.constructor=j,j.constructor=x,j[u]=x.displayName="GeneratorFunction",f.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===x||"GeneratorFunction"===(e.displayName||e.name))},f.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,j):(t.__proto__=j,u in t||(t[u]="GeneratorFunction")),t.prototype=Object.create(w),t},f.awrap=function(t){return{__await:t}},_(L.prototype),L.prototype[c]=function(){return this},f.AsyncIterator=L,f.async=function(t,e,r,n){var o=new L(b(t,e,r,n));return f.isGeneratorFunction(e)?o:o.next().then(function(t){return t.done?t.value:o.next()})},_(w),w[u]="Generator",w[a]=function(){return this},w.toString=function(){return"[object Generator]"},f.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},f.values=R,M.prototype={constructor:M,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(A),!t)for(var e in this)"t"===e.charAt(0)&&o.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return n("end");if(a.tryLoc<=this.prev){var u=o.call(a,"catchLoc"),s=o.call(a,"finallyLoc");if(u&&s){if(this.prev<a.catchLoc)return n(a.catchLoc,!0);if(this.prev<a.finallyLoc)return n(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return n(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return n(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&o.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),d},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),A(r),d}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;A(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:R(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),d}}}function b(t,e,r,n){var o=e&&e.prototype instanceof E?e:E,i=Object.create(o.prototype),a=new M(n||[]);return i._invoke=function(t,e,r){var n=h;return function(o,i){if(n===p)throw new Error("Generator is already running");if(n===y){if("throw"===o)throw i;return T()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=I(a,r);if(c){if(c===d)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=p;var u=O(t,e,r);if("normal"===u.type){if(n=r.done?y:l,u.arg===d)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n=y,r.method="throw",r.arg=u.arg)}}}(t,r,a),i}function O(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(n){return{type:"throw",arg:n}}}function E(){}function x(){}function j(){}function _(t){["next","throw","return"].forEach(function(e){t[e]=function(t){return this._invoke(e,t)}})}function L(t){var e;this._invoke=function(r,n){function i(){return new Promise(function(e,i){!function e(r,n,i,a){var c=O(t[r],t,n);if("throw"!==c.type){var u=c.arg,s=u.value;return s&&"object"===typeof s&&o.call(s,"__await")?Promise.resolve(s.__await).then(function(t){e("next",t,i,a)},function(t){e("throw",t,i,a)}):Promise.resolve(s).then(function(t){u.value=t,i(u)},function(t){return e("throw",t,i,a)})}a(c.arg)}(r,n,e,i)})}return e=e?e.then(i,i):i()}}function I(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,I(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=O(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function k(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function A(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function M(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function R(t){if(t){var e=t[a];if(e)return e.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var n=-1,i=function e(){for(;++n<t.length;)if(o.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=r,e.done=!0,e};return i.next=i}}return{next:T}}function T(){return{value:r,done:!0}}}(function(){return this||"object"===typeof self&&self}()||Function("return this")())},50:function(t,e,r){"use strict";var n=r(46),o=r.n(n),i=r(47),a=r(5),c=r(6),u=function t(){Object(a.a)(this,t)};u.TEXT="text",u.IMAGE="image";var s=function t(){Object(a.a)(this,t)};s.IMAGE=(s.ROOT_URL="http://95.169.6.128:9000/")+"image/",s.MODEL_OBJ=s.ROOT_URL+"obj/",s.MODEL_OBJ_LIST=s.ROOT_URL+"table/modelObjList",s.DIFFUSE_CONTAINER=s.IMAGE+"container.jpg",s.DIFFUSE_CONTAINER2=s.IMAGE+"container2.png",s.SPECULAR_CONTAINER2=s.IMAGE+"container2_specular.png",s.SKY_BOX_TOP=s.IMAGE+"skybox/top.jpg",s.SKY_BOX_BOTTOM=s.IMAGE+"skybox/bottom.jpg",s.SKY_BOX_LEFT=s.IMAGE+"skybox/left.jpg",s.SKY_BOX_RIGHT=s.IMAGE+"skybox/right.jpg",s.SKY_BOX_FRONT=s.IMAGE+"skybox/front.jpg",s.SKY_BOX_BACK=s.IMAGE+"skybox/back.jpg",s.MATRIX=s.IMAGE+"matrix.jpg",s.AWESOME_FACE=s.IMAGE+"awesomeface.png",r.d(e,"a",function(){return f});var f=function(){function t(){Object(a.a)(this,t),this.images={},this.objModels={}}return Object(c.a)(t,null,[{key:"getInstance",value:function(){return this._ins||(this._ins=new t),this._ins}}]),Object(c.a)(t,[{key:"getModelObj",value:function(){var t=Object(i.a)(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.objModels[e]){t.next=2;break}return t.abrupt("return",this.objModels[e]);case 2:return t.next=4,this.fetch(e,void 0,u.TEXT);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"getImage",value:function(){var t=Object(i.a)(o.a.mark(function t(e){return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!this.images[e]){t.next=2;break}return t.abrupt("return",this.images[e]);case 2:return t.next=4,this.fetch(e,void 0,u.IMAGE);case 4:return t.abrupt("return",t.sent);case 5:case"end":return t.stop()}},t,this)}));return function(e){return t.apply(this,arguments)}}()},{key:"fetch",value:function(t){function e(e,r,n){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(t,e,r){var n=this,o=Object.assign(e||{},{cache:"no-cache",credentials:"same-origin",headers:{"content-type":"application/json"},method:"GET",mode:"cors",redirect:"follow",referrer:"no-referrer"});return new Promise(function(e){fetch(t,o).then(function(o){switch(r){case u.TEXT:o.text().then(function(t){e(t)});break;case u.IMAGE:o.blob().then(function(r){var o=new Image;window.test=URL.createObjectURL(r),o.src=URL.createObjectURL(r),o.onload=function(){n.images[t]=o,e(o)}});break;default:e(o.json())}})})})}]),t}();f.WebAPI=s},70:function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return d});var n=r(46),o=r.n(n),i=r(47),a=r(5),c=r(6),u=r(16),s=r(14),f=r(51),h=r(15),l=r(53),p=r(52),y=r(50),d=function(t){function e(){return Object(a.a)(this,e),Object(u.a)(this,Object(s.a)(e).apply(this,arguments))}return Object(h.a)(e,t),Object(c.a)(e,[{key:"setUp",value:function(t){var r=this;Object(f.a)(Object(s.a)(e.prototype),"setUp",this).call(this,t),this.loadScene().then(function(){r.resize()})}},{key:"resize",value:function(){Object(f.a)(Object(s.a)(e.prototype),"resize",this).call(this),this.render()}},{key:"loadScene",value:function(){var t=Object(i.a)(o.a.mark(function t(){var e,r,n,i,a,c,u,s,f,h,l;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,y.a.getInstance().getImage(y.a.WebAPI.DIFFUSE_CONTAINER2);case 2:e=t.sent,r=new p.s({image:e}),this.camera.position.set(2,2,5),this.camera.updateMatrix(),this.camera.lookAt(new p.v(0,0,0)),n=new p.c(1,1,1),i=new p.g({map:r}),(a=new p.f(n,i)).position.z-=2,a.updateMatrix(),this.scene.add(a),c=new p.c(1.03,1.03,1.03),u=new p.g({map:r}),s=new p.f(c,u),this.scene.add(s),u.transparent=!0,u.opacity=.5,f=new p.c(1.03,1.03,1.03),h=new p.g({map:r,color:new p.d(0,1,1)}),(l=new p.f(f,h)).position.z+=2,l.updateMatrix(),this.scene.add(l),h.transparent=!0,h.opacity=.3;case 27:case"end":return t.stop()}},t,this)}));return function(){return t.apply(this,arguments)}}()}]),e}(l.a)}}]);
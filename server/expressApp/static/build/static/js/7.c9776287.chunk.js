(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{65:function(e,t,i){"use strict";i.r(t),i.d(t,"default",function(){return u});var s=i(4),n=i(5),a=i(14),h=i(13),r=i(51),c=i(15),o=i(52),d=i(53),u=function(e){function t(){return Object(s.a)(this,t),Object(a.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(n.a)(t,[{key:"setUp",value:function(e){Object(r.a)(Object(h.a)(t.prototype),"setUp",this).call(this,e),this.loadScene(),this.resize()}},{key:"loadScene",value:function(){this.camera.position.set(0,0,10),this.camera.updateMatrix(),this.camera.lookAt(new d.t(0,0,0));var e=new d.e,t=new d.a;e.dir=new d.t(0,-1,-1),t.intensity=.2,e.intensity=.8,this.scene.add(e),this.scene.add(t);var i=new d.k,s=new d.c;this.mesh=new d.f(s,i),this.scene.add(this.mesh),this.startAnimate()}},{key:"render",value:function(){this.mesh&&(this.mesh.rotation.x+=.01,this.mesh.rotation.y+=.01,this.mesh.updateMatrix(),this.renderer.render(this.scene,this.camera))}}]),t}(o.a)}}]);
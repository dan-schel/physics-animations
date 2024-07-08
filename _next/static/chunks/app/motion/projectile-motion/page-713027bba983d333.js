(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[27],{8829:function(e,t,n){Promise.resolve().then(n.bind(n,4990))},5351:function(e,t,n){"use strict";function o(e){return e/180*Math.PI}n.d(t,{I:function(){return o}})},4865:function(e,t,n){"use strict";function o(e,t,n,o,l,r,s){let a=o-t,c=l-n;i(e,t,n,Math.atan2(c,a),Math.sqrt(a*a+c*c),r,s)}function i(e,t,n,o,i,l,r){let s=Math.abs(i);if(s<.5*l)return;e.save(),e.translate(t,n),e.rotate(i<0?o+Math.PI:o);let a=Math.min(4*l,.75*s),c=4*l;e.strokeStyle=r,e.lineWidth=l,e.fillStyle=r,e.beginPath(),e.moveTo(0,0),e.lineTo(s-.75*a,0),e.stroke(),e.beginPath(),e.moveTo(s,0),e.lineTo(s-a,-.5*c),e.lineTo(s-a,.5*c),e.fill(),e.restore()}n.d(t,{M:function(){return i},x:function(){return o}})},9405:function(e,t,n){"use strict";n.d(t,{U:function(){return x}});var o=n(2361),i=n(6358);class l extends i.Pp{define(){return[i.$_.boolean(l.velocityComponents,"Show velocity components",!0),i.$_.boolean(l.velocity,"Show total velocity",!1),i.$_.boolean(l.netForce,"Show net force",!1),i.$_.boolean(l.dimensions,"Show 1-dimensional movement",!1)]}}l.velocity="velocity",l.velocityComponents="velocity-components",l.netForce="net-force",l.dimensions="dimensions";var r=n(7126),s=n(4865),a=n(824),c=n(1455);let h=a.BO,u=a.AY,f=a.AY,m=a.$C,v=a.$R,y=a.ek,d=a.Q6,p=a.iB,b=a.BO,P=a.cK;class M extends r._{render(e,t,n,o){var i;e.save(),(0,c.C)(e,n,300,200),e.translate(150,100),e.translate(-125,70);let l={x:10*Math.cos(i=-this.motion.angle)- -5*Math.sin(i),y:10*Math.sin(i)+-5*Math.cos(i)},r=this.motion.positionX(t)+l.x,s=-this.motion.positionY(t)+l.y,a=s<9;this._renderDimensions(e,o,r,s,a),a&&(e.fillStyle=f,e.beginPath(),e.ellipse(r,s,3,3,0,0,2*Math.PI),e.fill()),this._renderCannon(e,t),e.strokeStyle=h,e.lineWidth=6,e.beginPath(),e.moveTo(-20,9),e.lineTo(270,9),e.stroke(),a&&this._renderArrows(e,t,o,r,s),e.restore()}_renderCannon(e,t){e.save(),e.rotate(-this.motion.angle),e.fillStyle=u,e.beginPath(),e.rect(-8-(t>.2?0:-16*t*(t-.2)/.04000000000000001),-9,22,8),e.fill(),e.fillStyle=a.Oq,e.beginPath(),e.ellipse(0,0,8,8,0,0,2*Math.PI),e.fill(),e.fillStyle=u,e.beginPath(),e.ellipse(0,0,6,6,0,0,2*Math.PI),e.fill(),e.restore()}_renderArrows(e,t,n,o,i){let r=n.requireBoolean(l.velocity),a=n.requireBoolean(l.velocityComponents),c=n.requireBoolean(l.netForce);if(a){let n=o+.5*this.motion.velocityX(t),l=i-.5*this.motion.velocityY(t);(0,s.x)(e,o,i,n,i,2,v),(0,s.x)(e,o,i,o,l,2,y)}if(r){let n=o+.5*this.motion.velocityX(t),l=i-.5*this.motion.velocityY(t);(0,s.x)(e,o,i,n,l,2,m)}if(c){let n=o+.5*this.motion.accelerationX(t),l=i-.5*this.motion.accelerationY(t);(0,s.x)(e,o,i,n,l,2,d)}}_renderDimensions(e,t,n,o,i){t.requireBoolean(l.dimensions)&&(i&&(e.strokeStyle=b,e.lineWidth=1,e.beginPath(),e.moveTo(-25,o),e.lineTo(275,o),e.stroke(),e.beginPath(),e.moveTo(n,-170),e.lineTo(n,30),e.stroke()),(0,s.x)(e,125,30,-25,30,2,p),(0,s.x)(e,125,30,275,30,2,p),(0,s.x)(e,-25,-70,-25,-170,2,p),(0,s.x)(e,-25,-70,-25,30,2,p),i&&(e.fillStyle=P,e.beginPath(),e.ellipse(n,30,4,4,0,0,2*Math.PI),e.fill(),e.beginPath(),e.ellipse(-25,o,4,4,0,0,2*Math.PI),e.fill()))}constructor(e){super(),this.motion=e}}class _ extends o.r{static fromObject(e){let{title:t,description:n,href:o,duration:i,autoLoop:l,motion:r}=e;return new _(t,n,o,i,l,new M(r))}constructor(e,t,n,o,i,r){super(e,t,n,o,i,new l,r)}}var g=n(5351);let x=_.fromObject({title:"Projectile motion",description:"Assuming no air resistance, gravity is the only force on the cannonball once fired.",href:"/motion/projectile-motion",duration:4,autoLoop:!0,motion:function(e,t,n){let o=108*Math.cos(e),i=108*Math.sin(e);return{angle:e,positionX:e=>o*e,positionY:e=>i*e-25*e**2,velocityX:e=>o,velocityY:e=>i-50*e,accelerationX:e=>0,accelerationY:e=>-50}}((0,g.I)(45),0,50)})},4990:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return r}});var o=n(7437),i=n(8886),l=n(9405);function r(){return(0,o.jsx)(i.Z,{animation:l.U})}}},function(e){e.O(0,[437,645,478,23,744],function(){return e(e.s=8829)}),_N_E=e.O()}]);
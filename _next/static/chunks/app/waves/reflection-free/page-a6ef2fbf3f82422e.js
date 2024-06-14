(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[971],{220:function(e,t,n){Promise.resolve().then(n.bind(n,2230))},4096:function(e,t,n){"use strict";function r(e,t,n){return(r,o)=>{let i=-r/(e/Math.PI)+o*t;return i<0||i>Math.PI?0:-Math.sin(i)*n}}function o(e,t,n){return(r,o)=>{let i=-(1-r)/(e/Math.PI)+o*t;return i<0||i>Math.PI?0:-Math.sin(i)*n}}function i(e,t,n){return(r,o)=>{let i=-r/(e/Math.PI)+o*t;return i<0?0:-Math.sin(i)*n}}function l(e){return(t,n)=>e(2-t,n)}function s(e){return(t,n)=>-e(2-t,n)}n.d(t,{SC:function(){return l},_S:function(){return i},dC:function(){return r},k4:function(){return o},vr:function(){return s}})},7481:function(e,t,n){"use strict";n.d(t,{O:function(){return g}});var r=n(2361),o=n(7126),i=n(824),l=n(1455),s=n(6358);class u extends s.Pp{define(){return[s.$_.boolean(u.superposition,"Show superposition",!0),s.$_.boolean(u.components,"Show wave components",!1),s.$_.boolean(u.particles,"Show particles",!1),s.$_.boolean(u.longitudinal,"Show particles as longitudinal",!1),...null!=this.rulersOption?[s.$_.boolean(u.rulers,this.rulersOption,!1)]:[]]}constructor(e){super(),this.rulersOption=e}}u.superposition="superposition",u.components="components",u.particles="particles",u.longitudinal="longitudinal",u.rulers="rulers";let a=i.AY,c=i.sY,f=[i.Q6,i.ek],h=i.BO;class p extends o._{render(e,t,n,r){var o;let i=r.requireBoolean(u.superposition),s=r.requireBoolean(u.components),p=r.requireBoolean(u.particles),v=r.requireBoolean(u.longitudinal),g=null!==(o=r.getBoolean(u.rulers))&&void 0!==o&&o;if(e.save(),(0,l.C)(e,n,500,250),e.translate(0,125),g&&(e.strokeStyle=h,e.lineWidth=1,this.rulers.forEach(t=>{let{x:n}=w(t,0,0);e.beginPath(),e.moveTo(n,-125),e.lineTo(n,125),e.stroke()}),e.beginPath(),e.moveTo(w(0,0,0).x,0),e.lineTo(w(1,0,0).x,0),e.stroke()),s){let n=this.waves.length;this.waves.forEach((r,o)=>{d(e,r,t,f[o%f.length],"none","none",2*o-2*n/2)})}let b=(e,t)=>{let n=0;for(let r of this.waves)n+=r(e,t);return n};if(i){let n=v&&p;d(e,b,t,a,n?"none":this.leftEnd,n?"none":this.rightEnd,0)}if(p){let n=v||!i;!function(e,t,n,r,o,i,l){e.fillStyle=r;let s=i?0:1,u=l?21:20;for(let r=s;r<u;r++){let i=r/20,{x:l,y:s}=w(i,0,0);o?l+=48*t(i,n):s+=125*t(i,n),e.beginPath(),e.ellipse(l,s,5,5,0,0,2*Math.PI),e.fill()}}(e,b,t,c,v,"none"===this.leftEnd||n,"none"===this.rightEnd||n)}e.restore()}constructor(e,t,n,r){super(),this.waves=e,this.leftEnd=t,this.rightEnd=n,this.rulers=r}}function d(e,t,n,r,o,i,l){e.strokeStyle=r,e.lineWidth=2,e.beginPath();for(let r=0;r<100;r++){let o=r/99,{x:i,y:s}=w(o,t(o,n),l);0===r?e.moveTo(i,s):e.lineTo(i,s)}if(e.stroke(),"none"!==o){let{x:r,y:i}=w(0,t(0,n),l);v(e,r,i,"free"===o)}if("none"!==i){let{x:r,y:o}=w(1,t(1,n),l);v(e,r,o,"free"===i)}}function v(e,t,n,r){r?(e.strokeStyle=c,e.fillStyle=i.Oq,e.beginPath(),e.ellipse(t,n,10,10,0,0,2*Math.PI),e.fill(),e.stroke()):(e.fillStyle=c,e.beginPath(),e.ellipse(t,n,10,10,0,0,2*Math.PI),e.fill())}function w(e,t,n){return{x:10+480*e,y:125*t+n}}class g extends r.r{static fromObject(e){let{title:t,description:n,href:r,duration:o,autoLoop:i,waves:l,leftEnd:s,rightEnd:a,rulers:c=[],rulersOptionText:f="Show rulers"}=e;return new g(t,n,r,o,i,new u(c.length>0?f:null),new p(l,s,a,c))}constructor(e,t,n,r,o,i,l){super(e,t,n,r,o,i,l)}}},5679:function(e,t,n){"use strict";n.d(t,{k:function(){return o}});var r=n(4096);let o=n(7481).O.fromObject({title:"Reflection (free end)",description:"The wave reflects when it reaches the end of the rope, which can freely move.",href:"/waves/reflection-free",duration:7,autoLoop:!0,waves:[(0,r.dC)(.2,5,.3),(0,r.SC)((0,r.dC)(.2,5,.3))],leftEnd:"none",rightEnd:"free"})},2230:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return l}});var r=n(7437),o=n(6),i=n(5679);function l(){return(0,r.jsx)(o.Z,{animation:i.k})}}},function(e){e.O(0,[437,673,478,23,744],function(){return e(e.s=220)}),_N_E=e.O()}]);
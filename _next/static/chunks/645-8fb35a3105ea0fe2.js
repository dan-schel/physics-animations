(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[645],{6358:function(t,e,n){"use strict";n.d(e,{$_:function(){return i},Pp:function(){return s}});class i{static boolean(t,e,n){return new i(t,e,"boolean",n)}constructor(t,e,n,i){this.id=t,this.displayName=e,this.type=n,this.defaultValue=i}}class s{define(){return[]}get definitions(){if(null==this._definitions){var t;let e=this.define();if((t=e.map(t=>t.id)).length!==function(t,e){if(null==e)return[...new Set(t)];let n=[];for(let i of t)n.some(t=>e(t,i))||n.push(i);return n}(t,void 0).length)throw Error("Option definition IDs are not unique.");s._validate(s._createDefaultValuesRecord(e),e),this._definitions=e}return this._definitions}validate(t){s._validate(t,this.definitions)}getDefaultValues(){return new o(this,s._createDefaultValuesRecord(this.definitions))}static _validate(t,e){for(let n of e)if("boolean"===n.type){if("boolean"!=typeof t[n.id])throw Error('Expected boolean for option "'.concat(n.id,'".'))}else throw Error('Unknown option type "'.concat(n.type,'".'))}static _createDefaultValuesRecord(t){let e={};for(let n of t)e[n.id]=n.defaultValue;return e}constructor(){this._definitions=null}}class o{get(t){var e;return null!==(e=this.options[t])&&void 0!==e?e:null}getBoolean(t){var e;return null!==(e=this.options[t])&&void 0!==e?e:null}requireBoolean(t){let e=this.getBoolean(t);if(null===e)throw Error('There is no option with ID "'.concat(t,'".'));return e}with(t,e){let n={...this.options};return n[t]=e,new o(this.shape,n)}constructor(t,e){this.shape=t,this.options=e,t.validate(e)}}},7126:function(t,e,n){"use strict";n.d(e,{_:function(){return i}});class i{}},2361:function(t,e,n){"use strict";n.d(e,{r:function(){return i}});class i{constructor(t,e,n,i,s,o,r){this.title=t,this.description=e,this.href=n,this.duration=i,this.autoLoop=s,this.options=o,this.renderer=r}}},824:function(t,e,n){"use strict";n.d(e,{$C:function(){return f},$R:function(){return p},AY:function(){return o},BO:function(){return c},Oq:function(){return i},Q6:function(){return u},cK:function(){return l},ek:function(){return h},f7:function(){return d},iB:function(){return r},n7:function(){return a},sY:function(){return s}});let i="#0f1115",s="#ffffff",o="#bfc3d0",r="#8690a1",a="#576073",c="#2f3644",l="#66b3ff",u="#d02020",h="#00a000",d=l,p="#2060d0",f="#00b0b0"},1455:function(t,e,n){"use strict";n.d(e,{C:function(){return s}});var i=n(824);function s(t,e,n,s){let o=arguments.length>4&&void 0!==arguments[4]&&arguments[4],r=e.isDesktopLayout?2*e.remSize:1*e.remSize,a=Math.min((e.canvasWidth-2*r)/n,(e.canvasHeight-4*e.remSize)/s);t.scale(a,a);let c=e.canvasWidth/a-n,l=e.canvasHeight/a-s;return t.translate(c/2,l/2),o&&(t.strokeStyle=i.BO,t.lineWidth=2,t.beginPath(),t.rect(1,1,n-2,s-2),t.stroke()),{...e,extraWidth:c,extraHeight:l}}},8886:function(t,e,n){"use strict";n.d(e,{Z:function(){return R}});var i=n(7437),s=n(2265),o=n(9568),r=n.n(o);function a(t){let{animation:e,time:n,optionValues:o,className:a}=t,l=(0,s.useRef)(null),[u,h]=(0,s.useState)(null);return(0,s.useEffect)(()=>{if(null!=l.current){let t=new c(l.current);return h(t),()=>t.destroy()}},[l]),(0,s.useEffect)(()=>{null==u||u.render(e,n,o)},[u,e,n,o]),(0,i.jsx)("div",{className:"".concat(r().wrapper," ").concat(null!=a?a:""),children:(0,i.jsx)("canvas",{ref:l})})}class c{destroy(){this.resizeObserver.disconnect()}resize(){var t;let e=this.parent.getBoundingClientRect(),n=e.width,i=e.height,s=window.devicePixelRatio/(null!==(t=this.ctx.backingStorePixelRatio)&&void 0!==t?t:1);this.canvas.style.width="".concat(n,"px"),this.canvas.style.height="".concat(i,"px"),this.canvas.width=n*s,this.canvas.height=i*s;let o=parseInt(window.getComputedStyle(document.documentElement).fontSize),r=document.documentElement.getBoundingClientRect().width;this.canvasMetrics={canvasWidth:n,canvasHeight:i,dpiRatio:s,remSize:o,isDesktopLayout:r>=60*o},null!=this.lastRender&&this.render(this.lastRender.animation,this.lastRender.time,this.lastRender.optionValues)}render(t,e,n){if(null==this.canvasMetrics)return;let{canvasWidth:i,canvasHeight:s,dpiRatio:o}=this.canvasMetrics;this.ctx.save(),this.ctx.clearRect(0,0,i*o,s*o),this.ctx.scale(o,o),t.renderer.render(this.ctx,e,this.canvasMetrics,n),this.ctx.restore(),this.lastRender={animation:t,time:e,optionValues:n}}constructor(t){this.canvas=t,this.canvasMetrics=null,this.lastRender=null;let e=t.getContext("2d");if(null===e)throw Error("Failed to get 2D context for canvas.");this.ctx=e;let n=this.canvas.parentElement;if(null==n)throw Error("Failed to get the parent element of the canvas.");this.parent=n,this.resizeObserver=new ResizeObserver(()=>this.resize()),this.resizeObserver.observe(this.parent),this.resize()}}var l=n(1272),u=n.n(l);function h(t){let{title:e,description:n,className:s}=t;return(0,i.jsxs)("div",{className:"".concat(u().header," ").concat(null!=s?s:""),children:[(0,i.jsx)("h1",{children:e}),null!=n&&(0,i.jsx)("p",{children:n})]})}var d=n(5067),p=n.n(d),f=n(289);function m(t){let{animation:e,optionValues:n,setOptionValues:o,className:r}=t,[a,c]=(0,s.useState)(!0);return(0,i.jsxs)("div",{className:"".concat(p().menu," ").concat(null!=r?r:""," ").concat(a?p().expanded:""),children:[0===e.options.definitions.length&&(0,i.jsx)("p",{className:p().empty,children:"(No customisation options)"}),e.options.definitions.length>0&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("button",{className:p().expandButton,onClick:function(){c(t=>!t)},children:[(0,i.jsx)("p",{children:"Customise animation"}),(0,i.jsx)(f.A,{className:a?p().down:p().up})]}),a&&(0,i.jsx)("div",{className:p().options,children:e.options.definitions.map(t=>(0,i.jsx)(v,{definition:t,value:n.get(t.id),onChange:e=>o(n.with(t.id,e))},t.id))})]})]})}function v(t){let{definition:e,value:n,onChange:s}=t;if("boolean"===e.type)return(0,i.jsx)(_,{definition:e,value:n,onChange:s});throw Error('Unrecognized option type "'.concat(e.type,'".'))}function _(t){let{definition:e,value:n,onChange:s}=t;return(0,i.jsxs)("label",{className:p().switch,children:[(0,i.jsx)("input",{type:"checkbox",checked:n,onChange:t=>s(t.target.checked),autoComplete:"off"}),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:p().switchGraphic}),(0,i.jsx)("div",{className:p().switchContent,children:(0,i.jsx)("p",{children:e.displayName})})]})]})}var x=n(9371),w=n(4685),g=n.n(w);function j(t){return(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",...t,children:(0,i.jsx)("path",{fill:"currentColor",d:"M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V5q0-.425.288-.712T19 4t.713.288T20 5v5q0 .425-.288.713T19 11h-5q-.425 0-.712-.288T13 10t.288-.712T14 9h3.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.7 0 3.113-.862t2.187-2.313q.2-.35.563-.487t.737-.013q.4.125.575.525t-.025.75q-1.025 2-2.925 3.2T12 20"})})}function y(t){return(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",...t,children:(0,i.jsx)("path",{fill:"currentColor",d:"M8 5.14v14l11-7z"})})}function b(t){return(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",...t,children:(0,i.jsx)("path",{fill:"currentColor",d:"M14 19h4V5h-4M6 19h4V5H6z"})})}function k(t){let{animation:e,time:n,setTime:o,className:r}=t,[a,c]=(0,s.useState)(!1);return(0,s.useEffect)(()=>{let t=t=>{t.target instanceof HTMLBodyElement&&("Space"===t.code&&(t.repeat||c(t=>!t),t.preventDefault()),"ArrowLeft"===t.code&&(t.ctrlKey?o(0):o(t=>(0,x.uZ)(t-.5,0,e.duration)),t.preventDefault()),"ArrowRight"===t.code&&(t.ctrlKey?o(e.duration):o(t=>(0,x.uZ)(t+.5,0,e.duration)),t.preventDefault()))};return window.addEventListener("keydown",t),()=>window.removeEventListener("keydown",t)},[c,o,e]),(0,i.jsxs)("div",{className:"".concat(g().controls," ").concat(null!=r?r:""),children:[(0,i.jsx)("button",{className:g().playPause,onClick:function(){c(t=>!t)},children:a?(0,i.jsx)(y,{}):(0,i.jsx)(b,{})}),(0,i.jsx)("button",{className:g().reset,onClick:function(){o(0)},children:(0,i.jsx)(j,{})}),(0,i.jsx)(C,{animation:e,time:n,setTime:o,paused:a})]})}function C(t){let{animation:e,time:n,setTime:o,paused:r}=t,[a,c]=(0,s.useState)(!1),l=1e3*(0,x.uZ)(n/e.duration,0,1),u=(0,s.useRef)();function h(){c(!1)}return(0,s.useEffect)(()=>{if(r||a){u.current=void 0;return}let t=null,n=i=>{let s=null==t?0:i-t;e.autoLoop?o(t=>(t+s/1e3)%e.duration):o(t=>t+s/1e3),t=i,u.current=requestAnimationFrame(n)};return u.current=requestAnimationFrame(n),()=>{u.current&&cancelAnimationFrame(u.current)}},[r,a,o,e]),(0,i.jsx)("input",{className:g().seekbar,type:"range",min:0,max:1e3,value:l,onChange:function(t){o(parseInt(t.target.value)/1e3*e.duration)},onPointerDown:function(){c(!0)},onPointerLeave:h,onPointerCancel:h,onPointerUp:h})}var N=n(6681),E=n.n(N);function R(t){var e;let{animation:n}=t,[o,r]=(0,s.useState)(0),[c,l]=(0,s.useState)(n.options.getDefaultValues());return(0,i.jsxs)("div",{className:E().page,children:[(0,i.jsx)(h,{className:E().header,title:n.title,description:null!==(e=n.description)&&void 0!==e?e:void 0}),(0,i.jsx)(a,{className:E().canvas,animation:n,time:o,optionValues:c}),(0,i.jsx)(k,{className:E().playback,animation:n,time:o,setTime:r}),(0,i.jsx)(m,{className:E().options,animation:n,optionValues:c,setOptionValues:l})]})}},289:function(t,e,n){"use strict";n.d(e,{A:function(){return s}});var i=n(7437);function s(t){return(0,i.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",viewBox:"0 0 24 24",...t,children:(0,i.jsx)("path",{fill:"currentColor",d:"M15.54 11.29L9.88 5.64a1 1 0 0 0-1.42 0a1 1 0 0 0 0 1.41l4.95 5L8.46 17a1 1 0 0 0 0 1.41a1 1 0 0 0 .71.3a1 1 0 0 0 .71-.3l5.66-5.65a1 1 0 0 0 0-1.47"})})}n(2265)},9371:function(t,e,n){"use strict";function i(t,e,n){return Math.min(Math.max(t,Math.min(e,n)),Math.max(e,n))}function s(t,e,n,s,o){return i((t-e)/(n-e)*(o-s)+s,s,o)}n.d(e,{qq:function(){return s},uZ:function(){return i}})},9568:function(t){t.exports={wrapper:"animation-canvas_wrapper__oOkUE"}},1272:function(t){t.exports={header:"animation-header_header__egXAr"}},6681:function(t){t.exports={page:"animation-page_page__trcHH",header:"animation-page_header__u9O62",canvas:"animation-page_canvas__vNtoP",playback:"animation-page_playback__97Yym",options:"animation-page_options__5vYnt"}},5067:function(t){t.exports={menu:"customise-panel_menu__FvICR",expandButton:"customise-panel_expandButton__oroyL",empty:"customise-panel_empty__b1l2I",up:"customise-panel_up__unYij",down:"customise-panel_down__Cc2AW",options:"customise-panel_options__y2EPg",expanded:"customise-panel_expanded__q1s8j",switch:"customise-panel_switch__Z4guo",switchContent:"customise-panel_switchContent__NrBKk",switchGraphic:"customise-panel_switchGraphic___fxLE","odometer-in":"customise-panel_odometer-in__O1FQj","odometer-out":"customise-panel_odometer-out__qxeHW"}},4685:function(t){t.exports={controls:"playback-controls_controls__wFkfs",playPause:"playback-controls_playPause__uhHVg",reset:"playback-controls_reset__7jfM1",seekbar:"playback-controls_seekbar__pzvTE","odometer-in":"playback-controls_odometer-in__JuO65","odometer-out":"playback-controls_odometer-out__VDJQZ"}}}]);
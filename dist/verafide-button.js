/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const t="undefined"!=typeof window&&null!=window.customElements&&void 0!==window.customElements.polyfillWrapFlushCallback,i=(t,i,s=null)=>{for(;i!==s;){const s=i.nextSibling;t.removeChild(i),i=s}},s=`{{lit-${String(Math.random()).slice(2)}}}`,e=`\x3c!--${s}--\x3e`,n=new RegExp(`${s}|${e}`);class o{constructor(t,i){this.parts=[],this.element=i;const e=[],o=[],h=document.createTreeWalker(i.content,133,null,!1);let l=0,d=-1,u=0;const{strings:p,values:{length:f}}=t;for(;u<f;){const t=h.nextNode();if(null!==t){if(d++,1===t.nodeType){if(t.hasAttributes()){const i=t.attributes,{length:s}=i;let e=0;for(let t=0;t<s;t++)r(i[t].name,"$lit$")&&e++;for(;e-- >0;){const i=p[u],s=a.exec(i)[2],e=s.toLowerCase()+"$lit$",o=t.getAttribute(e);t.removeAttribute(e);const r=o.split(n);this.parts.push({type:"attribute",index:d,name:s,strings:r}),u+=r.length-1}}"TEMPLATE"===t.tagName&&(o.push(t),h.currentNode=t.content)}else if(3===t.nodeType){const i=t.data;if(i.indexOf(s)>=0){const s=t.parentNode,o=i.split(n),h=o.length-1;for(let i=0;i<h;i++){let e,n=o[i];if(""===n)e=c();else{const t=a.exec(n);null!==t&&r(t[2],"$lit$")&&(n=n.slice(0,t.index)+t[1]+t[2].slice(0,-"$lit$".length)+t[3]),e=document.createTextNode(n)}s.insertBefore(e,t),this.parts.push({type:"node",index:++d})}""===o[h]?(s.insertBefore(c(),t),e.push(t)):t.data=o[h],u+=h}}else if(8===t.nodeType)if(t.data===s){const i=t.parentNode;null!==t.previousSibling&&d!==l||(d++,i.insertBefore(c(),t)),l=d,this.parts.push({type:"node",index:d}),null===t.nextSibling?t.data="":(e.push(t),d--),u++}else{let i=-1;for(;-1!==(i=t.data.indexOf(s,i+1));)this.parts.push({type:"node",index:-1}),u++}}else h.currentNode=o.pop()}for(const t of e)t.parentNode.removeChild(t)}}const r=(t,i)=>{const s=t.length-i.length;return s>=0&&t.slice(s)===i},h=t=>-1!==t.index,c=()=>document.createComment(""),a=/([ \x09\x0a\x0c\x0d])([^\0-\x1F\x7F-\x9F "'>=/]+)([ \x09\x0a\x0c\x0d]*=[ \x09\x0a\x0c\x0d]*(?:[^ \x09\x0a\x0c\x0d"'`<>=]*|"[^"]*|'[^']*))$/;function l(t,i){const{element:{content:s},parts:e}=t,n=document.createTreeWalker(s,133,null,!1);let o=u(e),r=e[o],h=-1,c=0;const a=[];let l=null;for(;n.nextNode();){h++;const t=n.currentNode;for(t.previousSibling===l&&(l=null),i.has(t)&&(a.push(t),null===l&&(l=t)),null!==l&&c++;void 0!==r&&r.index===h;)r.index=null!==l?-1:r.index-c,o=u(e,o),r=e[o]}a.forEach(t=>t.parentNode.removeChild(t))}const d=t=>{let i=11===t.nodeType?0:1;const s=document.createTreeWalker(t,133,null,!1);for(;s.nextNode();)i++;return i},u=(t,i=-1)=>{for(let s=i+1;s<t.length;s++){const i=t[s];if(h(i))return s}return-1};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const p=new WeakMap,f=t=>"function"==typeof t&&p.has(t),w={},m={};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class y{constructor(t,i,s){this.t=[],this.template=t,this.processor=i,this.options=s}update(t){let i=0;for(const s of this.t)void 0!==s&&s.setValue(t[i]),i++;for(const t of this.t)void 0!==t&&t.commit()}_clone(){const i=t?this.template.element.content.cloneNode(!0):document.importNode(this.template.element.content,!0),s=[],e=this.template.parts,n=document.createTreeWalker(i,133,null,!1);let o,r=0,c=0,a=n.nextNode();for(;r<e.length;)if(o=e[r],h(o)){for(;c<o.index;)c++,"TEMPLATE"===a.nodeName&&(s.push(a),n.currentNode=a.content),null===(a=n.nextNode())&&(n.currentNode=s.pop(),a=n.nextNode());if("node"===o.type){const t=this.processor.handleTextExpression(this.options);t.insertAfterNode(a.previousSibling),this.t.push(t)}else this.t.push(...this.processor.handleAttributeExpressions(a,o.name,o.strings,this.options));r++}else this.t.push(void 0),r++;return t&&(document.adoptNode(i),customElements.upgrade(i)),i}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const b=` ${s} `;class v{constructor(t,i,s,e){this.strings=t,this.values=i,this.type=s,this.processor=e}getHTML(){const t=this.strings.length-1;let i="",n=!1;for(let o=0;o<t;o++){const t=this.strings[o],r=t.lastIndexOf("\x3c!--");n=(r>-1||n)&&-1===t.indexOf("--\x3e",r+1);const h=a.exec(t);i+=null===h?t+(n?b:e):t.substr(0,h.index)+h[1]+h[2]+"$lit$"+h[3]+s}return i+=this.strings[t],i}getTemplateElement(){const t=document.createElement("template");return t.innerHTML=this.getHTML(),t}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const g=t=>null===t||!("object"==typeof t||"function"==typeof t),x=t=>Array.isArray(t)||!(!t||!t[Symbol.iterator]);class S{constructor(t,i,s){this.dirty=!0,this.element=t,this.name=i,this.strings=s,this.parts=[];for(let t=0;t<s.length-1;t++)this.parts[t]=this._createPart()}_createPart(){return new _(this)}_getValue(){const t=this.strings,i=t.length-1;let s="";for(let e=0;e<i;e++){s+=t[e];const i=this.parts[e];if(void 0!==i){const t=i.value;if(g(t)||!x(t))s+="string"==typeof t?t:String(t);else for(const i of t)s+="string"==typeof i?i:String(i)}}return s+=t[i],s}commit(){this.dirty&&(this.dirty=!1,this.element.setAttribute(this.name,this._getValue()))}}class _{constructor(t){this.value=void 0,this.committer=t}setValue(t){t===w||g(t)&&t===this.value||(this.value=t,f(t)||(this.committer.dirty=!0))}commit(){for(;f(this.value);){const t=this.value;this.value=w,t(this)}this.value!==w&&this.committer.commit()}}class k{constructor(t){this.value=void 0,this.i=void 0,this.options=t}appendInto(t){this.startNode=t.appendChild(c()),this.endNode=t.appendChild(c())}insertAfterNode(t){this.startNode=t,this.endNode=t.nextSibling}appendIntoPart(t){t.s(this.startNode=c()),t.s(this.endNode=c())}insertAfterPart(t){t.s(this.startNode=c()),this.endNode=t.endNode,t.endNode=this.startNode}setValue(t){this.i=t}commit(){if(null===this.startNode.parentNode)return;for(;f(this.i);){const t=this.i;this.i=w,t(this)}const t=this.i;t!==w&&(g(t)?t!==this.value&&this.o(t):t instanceof v?this.h(t):t instanceof Node?this.l(t):x(t)?this.u(t):t===m?(this.value=m,this.clear()):this.o(t))}s(t){this.endNode.parentNode.insertBefore(t,this.endNode)}l(t){this.value!==t&&(this.clear(),this.s(t),this.value=t)}o(t){const i=this.startNode.nextSibling,s="string"==typeof(t=null==t?"":t)?t:String(t);i===this.endNode.previousSibling&&3===i.nodeType?i.data=s:this.l(document.createTextNode(s)),this.value=t}h(t){const i=this.options.templateFactory(t);if(this.value instanceof y&&this.value.template===i)this.value.update(t.values);else{const s=new y(i,t.processor,this.options),e=s._clone();s.update(t.values),this.l(e),this.value=s}}u(t){Array.isArray(this.value)||(this.value=[],this.clear());const i=this.value;let s,e=0;for(const n of t)s=i[e],void 0===s&&(s=new k(this.options),i.push(s),0===e?s.appendIntoPart(this):s.insertAfterPart(i[e-1])),s.setValue(n),s.commit(),e++;e<i.length&&(i.length=e,this.clear(s&&s.endNode))}clear(t=this.startNode){i(this.startNode.parentNode,t.nextSibling,this.endNode)}}class ${constructor(t,i,s){if(this.value=void 0,this.i=void 0,2!==s.length||""!==s[0]||""!==s[1])throw new Error("Boolean attributes can only contain a single expression");this.element=t,this.name=i,this.strings=s}setValue(t){this.i=t}commit(){for(;f(this.i);){const t=this.i;this.i=w,t(this)}if(this.i===w)return;const t=!!this.i;this.value!==t&&(t?this.element.setAttribute(this.name,""):this.element.removeAttribute(this.name),this.value=t),this.i=w}}class C extends S{constructor(t,i,s){super(t,i,s),this.single=2===s.length&&""===s[0]&&""===s[1]}_createPart(){return new P(this)}_getValue(){return this.single?this.parts[0].value:super._getValue()}commit(){this.dirty&&(this.dirty=!1,this.element[this.name]=this._getValue())}}class P extends _{}let O=!1;(()=>{try{const t={get capture(){return O=!0,!1}};window.addEventListener("test",t,t),window.removeEventListener("test",t,t)}catch(t){}})();class j{constructor(t,i,s){this.value=void 0,this.i=void 0,this.element=t,this.eventName=i,this.eventContext=s,this.p=t=>this.handleEvent(t)}setValue(t){this.i=t}commit(){for(;f(this.i);){const t=this.i;this.i=w,t(this)}if(this.i===w)return;const t=this.i,i=this.value,s=null==t||null!=i&&(t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive),e=null!=t&&(null==i||s);s&&this.element.removeEventListener(this.eventName,this.p,this.m),e&&(this.m=A(t),this.element.addEventListener(this.eventName,this.p,this.m)),this.value=t,this.i=w}handleEvent(t){"function"==typeof this.value?this.value.call(this.eventContext||this.element,t):this.value.handleEvent(t)}}const A=t=>t&&(O?{capture:t.capture,passive:t.passive,once:t.once}:t.capture)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */;function M(t){let i=E.get(t.type);void 0===i&&(i={stringsArray:new WeakMap,keyString:new Map},E.set(t.type,i));let e=i.stringsArray.get(t.strings);if(void 0!==e)return e;const n=t.strings.join(s);return e=i.keyString.get(n),void 0===e&&(e=new o(t,t.getTemplateElement()),i.keyString.set(n,e)),i.stringsArray.set(t.strings,e),e}const E=new Map,T=new WeakMap;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */const V=new
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
class{handleAttributeExpressions(t,i,s,e){const n=i[0];if("."===n){return new C(t,i.slice(1),s).parts}return"@"===n?[new j(t,i.slice(1),e.eventContext)]:"?"===n?[new $(t,i.slice(1),s)]:new S(t,i,s).parts}handleTextExpression(t){return new k(t)}};
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */"undefined"!=typeof window&&(window.litHtmlVersions||(window.litHtmlVersions=[])).push("1.2.1");const U=(t,...i)=>new v(t,i,"html",V)
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */,N=(t,i)=>`${t}--${i}`;let R=!0;void 0===window.ShadyCSS?R=!1:void 0===window.ShadyCSS.prepareTemplateDom&&(console.warn("Incompatible ShadyCSS version detected. Please update to at least @webcomponents/webcomponentsjs@2.0.2 and @webcomponents/shadycss@1.3.1."),R=!1);const q=t=>i=>{const e=N(i.type,t);let n=E.get(e);void 0===n&&(n={stringsArray:new WeakMap,keyString:new Map},E.set(e,n));let r=n.stringsArray.get(i.strings);if(void 0!==r)return r;const h=i.strings.join(s);if(r=n.keyString.get(h),void 0===r){const s=i.getTemplateElement();R&&window.ShadyCSS.prepareTemplateDom(s,t),r=new o(i,s),n.keyString.set(h,r)}return n.stringsArray.set(i.strings,r),r},z=["html","svg"],F=new Set,I=(t,i,s)=>{F.add(t);const e=s?s.element:document.createElement("template"),n=i.querySelectorAll("style"),{length:o}=n;if(0===o)return void window.ShadyCSS.prepareTemplateStyles(e,t);const r=document.createElement("style");for(let t=0;t<o;t++){const i=n[t];i.parentNode.removeChild(i),r.textContent+=i.textContent}(t=>{z.forEach(i=>{const s=E.get(N(i,t));void 0!==s&&s.keyString.forEach(t=>{const{element:{content:i}}=t,s=new Set;Array.from(i.querySelectorAll("style")).forEach(t=>{s.add(t)}),l(t,s)})})})(t);const h=e.content;s?function(t,i,s=null){const{element:{content:e},parts:n}=t;if(null==s)return void e.appendChild(i);const o=document.createTreeWalker(e,133,null,!1);let r=u(n),h=0,c=-1;for(;o.nextNode();){for(c++,o.currentNode===s&&(h=d(i),s.parentNode.insertBefore(i,s));-1!==r&&n[r].index===c;){if(h>0){for(;-1!==r;)n[r].index+=h,r=u(n,r);return}r=u(n,r)}}}(s,r,h.firstChild):h.insertBefore(r,h.firstChild),window.ShadyCSS.prepareTemplateStyles(e,t);const c=h.querySelector("style");if(window.ShadyCSS.nativeShadow&&null!==c)i.insertBefore(c.cloneNode(!0),i.firstChild);else if(s){h.insertBefore(r,h.firstChild);const t=new Set;t.add(r),l(s,t)}};window.JSCompiler_renameProperty=(t,i)=>t;const J={toAttribute(t,i){switch(i){case Boolean:return t?"":null;case Object:case Array:return null==t?t:JSON.stringify(t)}return t},fromAttribute(t,i){switch(i){case Boolean:return null!==t;case Number:return null===t?null:Number(t);case Object:case Array:return JSON.parse(t)}return t}},L=(t,i)=>i!==t&&(i==i||t==t),W={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:L};class B extends HTMLElement{constructor(){super(),this._updateState=0,this._instanceProperties=void 0,this._updatePromise=new Promise(t=>this._enableUpdatingResolver=t),this._changedProperties=new Map,this._reflectingProperties=void 0,this.initialize()}static get observedAttributes(){this.finalize();const t=[];return this._classProperties.forEach((i,s)=>{const e=this._attributeNameForProperty(s,i);void 0!==e&&(this._attributeToPropertyMap.set(e,s),t.push(e))}),t}static _ensureClassProperties(){if(!this.hasOwnProperty(JSCompiler_renameProperty("_classProperties",this))){this._classProperties=new Map;const t=Object.getPrototypeOf(this)._classProperties;void 0!==t&&t.forEach((t,i)=>this._classProperties.set(i,t))}}static createProperty(t,i=W){if(this._ensureClassProperties(),this._classProperties.set(t,i),i.noAccessor||this.prototype.hasOwnProperty(t))return;const s="symbol"==typeof t?Symbol():`__${t}`,e=this.getPropertyDescriptor(t,s,i);void 0!==e&&Object.defineProperty(this.prototype,t,e)}static getPropertyDescriptor(t,i,s){return{get(){return this[i]},set(s){const e=this[t];this[i]=s,this._requestUpdate(t,e)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this._classProperties&&this._classProperties.get(t)||W}static finalize(){const t=Object.getPrototypeOf(this);if(t.hasOwnProperty("finalized")||t.finalize(),this.finalized=!0,this._ensureClassProperties(),this._attributeToPropertyMap=new Map,this.hasOwnProperty(JSCompiler_renameProperty("properties",this))){const t=this.properties,i=[...Object.getOwnPropertyNames(t),..."function"==typeof Object.getOwnPropertySymbols?Object.getOwnPropertySymbols(t):[]];for(const s of i)this.createProperty(s,t[s])}}static _attributeNameForProperty(t,i){const s=i.attribute;return!1===s?void 0:"string"==typeof s?s:"string"==typeof t?t.toLowerCase():void 0}static _valueHasChanged(t,i,s=L){return s(t,i)}static _propertyValueFromAttribute(t,i){const s=i.type,e=i.converter||J,n="function"==typeof e?e:e.fromAttribute;return n?n(t,s):t}static _propertyValueToAttribute(t,i){if(void 0===i.reflect)return;const s=i.type,e=i.converter;return(e&&e.toAttribute||J.toAttribute)(t,s)}initialize(){this._saveInstanceProperties(),this._requestUpdate()}_saveInstanceProperties(){this.constructor._classProperties.forEach((t,i)=>{if(this.hasOwnProperty(i)){const t=this[i];delete this[i],this._instanceProperties||(this._instanceProperties=new Map),this._instanceProperties.set(i,t)}})}_applyInstanceProperties(){this._instanceProperties.forEach((t,i)=>this[i]=t),this._instanceProperties=void 0}connectedCallback(){this.enableUpdating()}enableUpdating(){void 0!==this._enableUpdatingResolver&&(this._enableUpdatingResolver(),this._enableUpdatingResolver=void 0)}disconnectedCallback(){}attributeChangedCallback(t,i,s){i!==s&&this._attributeToProperty(t,s)}_propertyToAttribute(t,i,s=W){const e=this.constructor,n=e._attributeNameForProperty(t,s);if(void 0!==n){const t=e._propertyValueToAttribute(i,s);if(void 0===t)return;this._updateState=8|this._updateState,null==t?this.removeAttribute(n):this.setAttribute(n,t),this._updateState=-9&this._updateState}}_attributeToProperty(t,i){if(8&this._updateState)return;const s=this.constructor,e=s._attributeToPropertyMap.get(t);if(void 0!==e){const t=s.getPropertyOptions(e);this._updateState=16|this._updateState,this[e]=s._propertyValueFromAttribute(i,t),this._updateState=-17&this._updateState}}_requestUpdate(t,i){let s=!0;if(void 0!==t){const e=this.constructor,n=e.getPropertyOptions(t);e._valueHasChanged(this[t],i,n.hasChanged)?(this._changedProperties.has(t)||this._changedProperties.set(t,i),!0!==n.reflect||16&this._updateState||(void 0===this._reflectingProperties&&(this._reflectingProperties=new Map),this._reflectingProperties.set(t,n))):s=!1}!this._hasRequestedUpdate&&s&&(this._updatePromise=this._enqueueUpdate())}requestUpdate(t,i){return this._requestUpdate(t,i),this.updateComplete}async _enqueueUpdate(){this._updateState=4|this._updateState;try{await this._updatePromise}catch(t){}const t=this.performUpdate();return null!=t&&await t,!this._hasRequestedUpdate}get _hasRequestedUpdate(){return 4&this._updateState}get hasUpdated(){return 1&this._updateState}performUpdate(){this._instanceProperties&&this._applyInstanceProperties();let t=!1;const i=this._changedProperties;try{t=this.shouldUpdate(i),t?this.update(i):this._markUpdated()}catch(i){throw t=!1,this._markUpdated(),i}t&&(1&this._updateState||(this._updateState=1|this._updateState,this.firstUpdated(i)),this.updated(i))}_markUpdated(){this._changedProperties=new Map,this._updateState=-5&this._updateState}get updateComplete(){return this._getUpdateComplete()}_getUpdateComplete(){return this._updatePromise}shouldUpdate(t){return!0}update(t){void 0!==this._reflectingProperties&&this._reflectingProperties.size>0&&(this._reflectingProperties.forEach((t,i)=>this._propertyToAttribute(i,this[i],t)),this._reflectingProperties=void 0),this._markUpdated()}updated(t){}firstUpdated(t){}}B.finalized=!0;
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
const D=(t,i)=>"method"===i.kind&&i.descriptor&&!("value"in i.descriptor)?Object.assign(Object.assign({},i),{finisher(s){s.createProperty(i.key,t)}}):{kind:"field",key:Symbol(),placement:"own",descriptor:{},initializer(){"function"==typeof i.initializer&&(this[i.key]=i.initializer.call(this))},finisher(s){s.createProperty(i.key,t)}};function H(t){return(i,s)=>void 0!==s?((t,i,s)=>{i.constructor.createProperty(s,t)})(t,i,s):D(t,i)}
/**
@license
Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/const K="adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Q=Symbol();class G{constructor(t,i){if(i!==Q)throw new Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t}get styleSheet(){return void 0===this._styleSheet&&(K?(this._styleSheet=new CSSStyleSheet,this._styleSheet.replaceSync(this.cssText)):this._styleSheet=null),this._styleSheet}toString(){return this.cssText}}
/**
 * @license
 * Copyright (c) 2017 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */
(window.litElementVersions||(window.litElementVersions=[])).push("2.3.1");const X={};class Y extends B{static getStyles(){return this.styles}static _getUniqueStyles(){if(this.hasOwnProperty(JSCompiler_renameProperty("_styles",this)))return;const t=this.getStyles();if(void 0===t)this._styles=[];else if(Array.isArray(t)){const i=(t,s)=>t.reduceRight((t,s)=>Array.isArray(s)?i(s,t):(t.add(s),t),s),s=i(t,new Set),e=[];s.forEach(t=>e.unshift(t)),this._styles=e}else this._styles=[t]}initialize(){super.initialize(),this.constructor._getUniqueStyles(),this.renderRoot=this.createRenderRoot(),window.ShadowRoot&&this.renderRoot instanceof window.ShadowRoot&&this.adoptStyles()}createRenderRoot(){return this.attachShadow({mode:"open"})}adoptStyles(){const t=this.constructor._styles;0!==t.length&&(void 0===window.ShadyCSS||window.ShadyCSS.nativeShadow?K?this.renderRoot.adoptedStyleSheets=t.map(t=>t.styleSheet):this._needsShimAdoptedStyleSheets=!0:window.ShadyCSS.ScopingShim.prepareAdoptedCssText(t.map(t=>t.cssText),this.localName))}connectedCallback(){super.connectedCallback(),this.hasUpdated&&void 0!==window.ShadyCSS&&window.ShadyCSS.styleElement(this)}update(t){const i=this.render();super.update(t),i!==X&&this.constructor.render(i,this.renderRoot,{scopeName:this.localName,eventContext:this}),this._needsShimAdoptedStyleSheets&&(this._needsShimAdoptedStyleSheets=!1,this.constructor._styles.forEach(t=>{const i=document.createElement("style");i.textContent=t.cssText,this.renderRoot.appendChild(i)}))}render(){return X}}Y.finalized=!0,Y.render=(t,s,e)=>{if(!e||"object"!=typeof e||!e.scopeName)throw new Error("The `scopeName` option is required.");const n=e.scopeName,o=T.has(s),r=R&&11===s.nodeType&&!!s.host,h=r&&!F.has(n),c=h?document.createDocumentFragment():s;if(((t,s,e)=>{let n=T.get(s);void 0===n&&(i(s,s.firstChild),T.set(s,n=new k(Object.assign({templateFactory:M},e))),n.appendInto(s)),n.setValue(t),n.commit()})(t,c,Object.assign({templateFactory:q(n)},e)),h){const t=T.get(c);T.delete(c);const e=t.value instanceof y?t.value.template:void 0;I(n,c,e),i(s,s.firstChild),s.appendChild(c),T.set(s,t)}!o&&r&&window.ShadyCSS.styleElement(s.host)};var Z=function(t,i,s,e){for(var n,o=arguments.length,r=o<3?i:null===e?e=Object.getOwnPropertyDescriptor(i,s):e,h=t.length-1;h>=0;h--)(n=t[h])&&(r=(o<3?n(r):o>3?n(i,s,r):n(i,s))||r);return o>3&&r&&Object.defineProperty(i,s,r),r};let tt=class extends Y{constructor(){super(),this.hostname="https://app.verafide.io",this.template=U``,this.background="",this.newQr={token:""},this.verifiedText="Loading",this.verifiedClass="loading",this.redirect="",this.loading=!1,this.error=!1}async initQr(){const{redirect:t}=await this.createPresentationRequest();return t}firstUpdated(t){fetch(`${this.hostname}/apps/validate/${this.appKey}`).then(t=>{this.loading=!1,this.verifiedText="Verify with Verafide",t.ok||t.json().then(t=>{this.verifiedText=t.message,this.verifiedClass="failed",this.error=!0})}),super.firstUpdated(t)}closeOverlay(){this.background=""}render(){return U`
            <button
                class="verify ${this.verifiedClass}"
                href="${this.redirect}"
                target="VerifyVC"
                ?disabled=${this.error||this.loading}
                @click=${()=>this.openVerify()}
            >
                ${this.verifiedText}
            </button>
            ${this.background?U`<div class="background ${this.background}">
                <p>Don't see the secure Verafide window?</p>
                <button
                    type="button"
                    @click=${()=>this.openVerify()}
                >Open window</button>
                <button
                    type="button"
                    style="position: absolute; font-size: 1.3em; top: 10px; right: 10px; background: 0; border: 0; color: #fff;"
                    @click=${()=>this.closeOverlay()}
                >Close</button>
            </div>`:""}
        `}async openVerify(){if(!this.windowObjectReference||this.windowObjectReference.closed){this.background="show";const t=await this.initQr(),i=400,s=500,e=window.outerWidth/2-i/2+window.screenX,n=window.outerHeight/2-s/2+window.screenY;this.poll(this.newQr.token),this.windowObjectReference=window.open(t,"VerifyVC","scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width="+i+",height="+s+",left="+e+",top="+n)}else this.windowObjectReference.focus()}poll(t){}emitEvent(t,i){const s=new CustomEvent("verification",{detail:{verified:t,credential:i},bubbles:!0,composed:!0});window.dispatchEvent(s)}async createPresentationRequest(){const t={appKey:this.appKey};return(await this.sendPostRequest("/present/app",t)).json()}updatePresentationRequest(t){const i={token:this.newQr.token,state:t};this.sendPostRequest("/present/update",i)}sendPostRequest(t,i){return fetch(this.hostname+t,{method:"POST",body:JSON.stringify(i),headers:{"Content-Type":"application/json"}})}};var it;tt.styles=((t,...i)=>{const s=i.reduce((i,s,e)=>i+(t=>{if(t instanceof G)return t.cssText;if("number"==typeof t)return t;throw new Error(`Value passed to 'css' function must be a 'css' function result: ${t}. Use 'unsafeCSS' to pass non-literal values, but\n            take care to ensure page security.`)})(s)+t[e+1],t[0]);return new G(s,Q)})`
        :host {
            font-family: sans-serif;
            color: #333;
            margin: 0px;
        }

        h1 {
            margin-top: 100px;
            text-align: center;
        }

        p {
            text-align: center;
        }

        .verify {
            margin: 0 auto;
            margin: 0 auto;
            text-align: center;
            background-color: rgb(26, 32, 67);
            font-weight: bold;
            color: white;
            font-size: 13px;
            padding: 10px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 1.5s ease;
            border: 0px solid;
        }

        .verify.confirming {
            transition: background-color 1.5s ease;
            background-color: #ffab3e;
        }

        .verify.verified {
            transition: background-color 1.5s ease;
            background-color: #11b75d;
        }

        .verify.failed {
            transition: background-color 1.5s ease;
            background-color: #d43636;
        }

        .verify:disabled {
            cursor: 'not-allowed';
        }

        .background {
            position: fixed;
            top: 0px;
            left: 0px;
            bottom: 0px;
            background: rgba(0, 0, 0, 0.7);
            width: 100%;
            opacity: 0;
            transition: opacity 1s;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            color: white;
            z-index:999999;
        }

        .background button {
            cursor: pointer;
        }

        .background.show {
            transition: opacity 1s;
            opacity: 1;
        }

    `,Z([H()],tt.prototype,"appKey",void 0),Z([H()],tt.prototype,"hostname",void 0),Z([H()],tt.prototype,"windowObjectReference",void 0),Z([H()],tt.prototype,"template",void 0),Z([H()],tt.prototype,"background",void 0),Z([H()],tt.prototype,"newQr",void 0),Z([H()],tt.prototype,"intervalLoop",void 0),Z([H()],tt.prototype,"verifiedText",void 0),Z([H()],tt.prototype,"verifiedClass",void 0),Z([H()],tt.prototype,"redirect",void 0),Z([H()],tt.prototype,"loading",void 0),Z([H()],tt.prototype,"error",void 0),tt=Z([(it="verafide-button",t=>"function"==typeof t?((t,i)=>(window.customElements.define(t,i),i))(it,t):((t,i)=>{const{kind:s,elements:e}=i;return{kind:s,elements:e,finisher(i){window.customElements.define(t,i)}}})(it,t))],tt);export{tt as VerafideButton};

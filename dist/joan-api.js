!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.joanApi=t():e.joanApi=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);const r=n(1),o=n(2);class c{static configure({clientId:e,secret:t}){c.prototype.clientId=e,c.prototype.secret=t}static async getToken(){const{clientId:e,secret:t}=c.prototype;if(null===e||null===t)throw new Error("Have not configured api credentials.");return new Promise((n,i)=>{r("https://portal.getjoan.com/api/token/",{body:"grant_type=client_credentials",headers:{Authorization:`Basic ${o.encode(`${e}:${t}`)}`,"Content-Type":"application/x-www-form-urlencoded"},method:"POST"}).then(e=>{if(e.ok)return e;i(e.statusText)}).then(e=>e.json()).then(e=>{c.prototype.credentials=e;let t=new Date;t.setSeconds(t.getSeconds()+e.expires_in),c.prototype.expiry=t,n(!0)})})}static async initialize(){const{credentials:e,expiry:t}=c.prototype;(!e||!e.access_token||t<new Date)&&await c.getToken()}static async me(){return c.getReq("me")}static async users(){return c.getReq("users")}static async events(){return c.getReq("events")}static async rooms(){return c.getReq("rooms")}static async devices(){return c.getReq("devices")}static async book(e){await c.initialize();const{access_token:t}=c.prototype.credentials;return new Promise((n,o)=>{r("https://portal.getjoan.com/api/v1.0/events/book/",{body:JSON.stringify(e),headers:{Accept:"*/*",Authorization:`Bearer ${t}`,"Content-Type":"application/json"},method:"POST"}).then(e=>{if(e.ok)return e;o(e.statusText)}).then(e=>e.json()).then(e=>n(e)).catch(e=>o(e))})}static async cancel(e){await c.initialize();const{access_token:t}=c.prototype.credentials;return new Promise((n,o)=>{r("https://portal.getjoan.com/api/v1.0/events/cancel/",{body:JSON.stringify(e),headers:{Accept:"*/*",Authorization:`Bearer ${t}`,"Content-Type":"application/json"},method:"POST"}).then(e=>(console.log("getreq",e),e)).then(e=>{e.ok?n(e):o(e.statusText)}).catch(e=>o(e))})}static async getReq(e="me"){await c.initialize();const{access_token:t}=c.prototype.credentials;return new Promise((n,o)=>{r(`https://portal.getjoan.com/api/v1.0/${e}`,{headers:{Authorization:`Bearer ${t}`},method:"GET"}).then(e=>{if(e.ok)return e;console.log("not ok"),o(e.statusText)}).then(e=>e.json()).then(e=>n(e)).catch(e=>o(e))})}}t.default=c},function(e,t,n){"use strict";var r=function(){if("undefined"!=typeof self)return self;if("undefined"!=typeof window)return window;if(void 0!==r)return r;throw new Error("unable to locate global object")}();e.exports=t=r.fetch,t.default=r.fetch.bind(r),t.Headers=r.Headers,t.Request=r.Request,t.Response=r.Response},function(e,t,n){(function(e,r){var o;/*! http://mths.be/base64 v0.1.0 by @mathias | MIT license */!function(c){var i=t,a=(e&&e.exports,"object"==typeof r&&r);a.global!==a&&a.window;var s=function(e){this.message=e};(s.prototype=new Error).name="InvalidCharacterError";var u=function(e){throw new s(e)},d="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l=/[\t\n\f\r ]/g,p={encode:function(e){e=String(e),/[^\0-\xFF]/.test(e)&&u("The string to be encoded contains characters outside of the Latin1 range.");for(var t,n,r,o,c=e.length%3,i="",a=-1,s=e.length-c;++a<s;)t=e.charCodeAt(a)<<16,n=e.charCodeAt(++a)<<8,r=e.charCodeAt(++a),i+=d.charAt((o=t+n+r)>>18&63)+d.charAt(o>>12&63)+d.charAt(o>>6&63)+d.charAt(63&o);return 2==c?(t=e.charCodeAt(a)<<8,n=e.charCodeAt(++a),i+=d.charAt((o=t+n)>>10)+d.charAt(o>>4&63)+d.charAt(o<<2&63)+"="):1==c&&(o=e.charCodeAt(a),i+=d.charAt(o>>2)+d.charAt(o<<4&63)+"=="),i},decode:function(e){var t=(e=String(e).replace(l,"")).length;t%4==0&&(t=(e=e.replace(/==?$/,"")).length),(t%4==1||/[^+a-zA-Z0-9/]/.test(e))&&u("Invalid character: the string to be decoded is not correctly encoded.");for(var n,r,o=0,c="",i=-1;++i<t;)r=d.indexOf(e.charAt(i)),n=o%4?64*n+r:r,o++%4&&(c+=String.fromCharCode(255&n>>(-2*o&6)));return c},version:"0.1.0"};void 0===(o=function(){return p}.call(t,n,t,e))||(e.exports=o)}()}).call(this,n(3)(e),n(4))},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children||(e.children=[]),Object.defineProperty(e,"loaded",{enumerable:!0,get:function(){return e.l}}),Object.defineProperty(e,"id",{enumerable:!0,get:function(){return e.i}}),e.webpackPolyfill=1),e}},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n}])}));
(()=>{"use strict";const e="tt-media-progressive",t="tt-assets",n=("undefined"!=typeof window&&window.innerHeight,Math.round(425),new Set(["newMessage","newScheduledMessage","deleteMessages","deleteScheduledMessages","deleteHistory"]),new Set(["image/png","image/gif","image/jpeg"])),s=new Set(["video/mp4"]);new Set(["audio/mp3","audio/ogg","audio/wav","audio/mpeg","audio/flac","audio/aac","audio/m4a","audio/mp4","audio/x-m4a"]),new Set([...n,...s]),new Set(["AU","BD","CA","CO","EG","HN","IE","IN","JO","MX","MY","NI","NZ","PH","PK","SA","SV","US"]);const a=e=>new Promise((t=>{setTimeout((()=>t()),e)})),i=524288,o=new Map;async function r(e,t){const n=t.url.includes("/download/")?(await self.clients.matchAll()).find((e=>"window"===e.type&&"top-level"===e.frameType)):await self.clients.get(e.clientId);if(!n)return;const s=function(e){let t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];do{t=String(Math.random()).replace("0.","id")}while(e[t]);return n&&(e[t]=!0),t}(o),i={};let r=!1;const c=Promise.race([a(6e4).then((()=>r?void 0:Promise.reject(new Error("ERROR_PART_TIMEOUT")))),new Promise(((e,t)=>{Object.assign(i,{resolve:e,reject:t})}))]);return o.set(s,i),c.catch((()=>{})).finally((()=>{o.delete(s),r=!0})),n.postMessage({type:"requestPart",messageId:s,params:t}),c}self.addEventListener("message",(e=>{const{type:t,messageId:n,result:s}=e.data;if("partResponse"===t){const e=o.get(n);e&&e.resolve(s)}}));const c=1048576;class l{constructor(){var e,t;t=void 0,(e="queue")in this?Object.defineProperty(this,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):this[e]=t,this.queue=[]}push(e){this.queue.push(e)}async pop(){return await this.queue.shift()}get size(){return this.queue.length}}async function u(e){const n=await d((async()=>{const n=await self.caches.open(t),s=await n.match(e.request);return{cache:n,cached:s}}),3e3),{cache:s,cached:a}=n||{};if(s&&a){if(a.ok)return a;await s.delete(e.request)}const i=await fetch(e.request);return i.ok&&s&&s.put(e.request,i.clone()),i}async function d(e,t){let n=!1;try{return await Promise.race([a(t).then((()=>n?void 0:Promise.reject(new Error("TIMEOUT")))),e()])}catch(e){return void console.error(e)}finally{n=!0}}var f,h;(h=f||(f={})).True="1",h.False="0";let p=(new Date).valueOf();const w=new Set,g={};function m(e){return e.custom.from_id?e.custom.from_id:e.custom.chat_id||e.custom.channel_id?`-${e.custom.chat_id||e.custom.channel_id}`:void 0}function y(e){if(e.custom.msg_id)return parseInt(e.custom.msg_id,10)}async function v(){const e=new URL(self.registration.scope).origin;return(await self.clients.matchAll({type:"window"})).filter((t=>new URL(t.url).origin===e))}async function R(e){const t=(await v())[0];t&&t.postMessage({type:"playNotificationSound",payload:{id:e}})}function I(e){let{chatId:t,messageId:n,body:s,title:a,icon:i,reaction:o,isSilent:r,shouldReplaceHistory:c}=e;const l=(new Date).valueOf()-p<1e3,u={body:s,data:{chatId:t,messageId:n,reaction:o,count:1,shouldReplaceHistory:c},icon:i||"icon-192x192.png",badge:"icon-192x192.png",tag:String(l?0:t||0),vibrate:[200,100,200]};return Promise.all([o||r?void 0:R(String(n)||t||""),self.registration.showNotification(a,u)])}async function b(e,t){if(t.chatId&&(e.postMessage({type:"focusMessage",payload:t}),!e.focused))try{await e.focus()}catch(e){}}self.addEventListener("sync",(()=>{p=Date.now()}));const S=new Set(["/","/rlottie-wasm.wasm","/webp_wasm.wasm"]),T=/[\da-f]{20}.*\.(js|css|woff2?|svg|png|jpg|jpeg|tgs|json|wasm)$/;self.addEventListener("install",(e=>{e.waitUntil(self.skipWaiting())})),self.addEventListener("activate",(e=>{e.waitUntil(Promise.race([a(3e3),Promise.all([self.caches.delete(t),self.clients.claim()])]))})),self.addEventListener("fetch",(n=>{const{url:s}=n.request;if(s.includes("/progressive/"))return n.respondWith(async function(t){const{url:n}=t.request,s=t.request.headers.get("range"),a=/^bytes=(\d+)-(\d+)?$/g.exec(s||""),o=Number(a[1]);let c=Number(a[2]);if((!c||c-o+1>i)&&(c=o+i-1),0===o&&1===c){const e=t.request.url.match(/fileSize=(\d+)&mimeType=([\w/]+)/),n=e&&Number(e[1]),s=null==e?void 0:e[2];if(n&&s)return new Response(new Uint8Array(2).buffer,{status:206,statusText:"Partial Content",headers:[["Content-Range",`bytes 0-1/${n}`],["Accept-Ranges","bytes"],["Content-Length","2"],["Content-Type",s]]})}const l=`${n}?start=${o}&end=${c}`,[u,d]=await async function(t){const n=await self.caches.open(e);return Promise.all([n.match(`${t}&type=arrayBuffer`).then((e=>e?e.arrayBuffer():void 0)),n.match(`${t}&type=headers`).then((e=>e?e.json():void 0))])}(l);if(u)return new Response(u,{status:206,statusText:"Partial Content",headers:d});let f;try{f=await r(t,{url:n,start:o,end:c})}catch(e){}if(!f)return new Response("",{status:500,statusText:"Failed to fetch progressive part"});const{arrayBuffer:h,fullSize:p,mimeType:w}=f,g=Math.min(c-o+1,h.byteLength);c=o+g-1;const m=h.slice(0,g),y=[["Content-Range",`bytes ${o}-${c}/${p}`],["Accept-Ranges","bytes"],["Content-Length",String(g)],["Content-Type",w]];return g<=524288&&c<2097151&&async function(t,n,s){const a=await self.caches.open(e);Promise.all([a.put(new Request(`${t}&type=arrayBuffer`),new Response(n)),a.put(new Request(`${t}&type=headers`),new Response(JSON.stringify(s)))])}(l,m,y),new Response(m,{status:206,statusText:"Partial Content",headers:y})}(n)),!0;if(s.includes("/download/"))return n.respondWith(async function(e){const{url:t}=e.request;let n;try{n=await r(e,{url:t,start:0,end:65536})}catch(e){}if(!n)return new Response("",{status:500,statusText:"Failed to fetch file to download"});const s=e.request.url.match(/filename=(.*)/),a=s?`filename="${decodeURIComponent(s[1])}"`:"",{fullSize:i,mimeType:o}=n,u=[["Content-Length",String(i)],["Content-Type",o],["Content-Disposition",`attachment; ${a}`]],d=new l,f=n=>(d.push(r(e,{url:t,start:n,end:n+c-1}).then((e=>null==e?void 0:e.arrayBuffer))),n+c);let h=0;const p=new ReadableStream({start(){for(let e=0;e<8&&!(h>=i);e++)h=f(h)},async pull(e){const t=await d.pop();t?(e.enqueue(new Uint8Array(t)),t.byteLength<c?e.close():h<i&&(h=f(h))):e.close()}});return new Response(p,{status:200,statusText:"OK",headers:u})}(n)),!0;if(s.startsWith("http")){if(S.has(new URL(s).pathname))return n.respondWith(async function(e){const n=await d((()=>fetch(e.request)),3e3);if(null==n||!n.ok)return u(e);const s=n.clone();return self.caches.open(t).then((t=>null==t?void 0:t.put(e.request,s))),n}(n)),!0;if(s.match(T))return n.respondWith(u(n)),!0}return!1})),self.addEventListener("push",(function(e){const t=function(e){try{return e.data.json()}catch(e){return}}(e);if(!t||t.mute===f.True)return;const n=function(e){var t;let n=e.title||"Telegram WebZ";const s=(null===(t=e.custom)||void 0===t?void 0:t.silent)===f.True;return s&&(n+=" 🔕"),{chatId:m(e),messageId:y(e),body:e.description,isSilent:s,title:n}}(t);w.has(n.messageId)?w.delete(n.messageId):e.waitUntil(I(n))})),self.addEventListener("notificationclick",(function(e){const t=self.registration.scope;e.notification.close();const{data:n}=e.notification;e.waitUntil((async()=>{const e=await v();if(await Promise.all(e.map((e=>(g[e.id]=n,b(e,n))))),self.clients.openWindow&&!(e.length>0)){g[0]=n;try{const e=await self.clients.openWindow(t);e&&(g[e.id]=n)}catch(e){}}})())})),self.addEventListener("message",(function(e){if(!e.data)return;const t=e.source;if("clientReady"===e.data.type){const n=g[t.id]||g[0];n&&(delete g[t.id],delete g[0],e.waitUntil(b(t,n)))}if("showMessageNotification"===e.data.type){const t=e.data.payload;e.waitUntil((async()=>(t.chatId&&(await self.registration.getNotifications({tag:t.chatId})).forEach((e=>e.close())),w.add(t.messageId),I(t)))())}"closeMessageNotifications"===e.data.type&&e.waitUntil(async function(e){let{chatId:t,lastReadInboxMessageId:n}=e;const s=await self.registration.getNotifications(),a=n||Number.MAX_VALUE;s.forEach((e=>{("0"===e.tag||e.data.chatId===t&&e.data.messageId<=a)&&e.close()}))}(e.data.payload))}))})();
//# sourceMappingURL=1516.4f8ddd6561abe9eeee92.js.map
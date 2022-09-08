"use strict";(self.webpackChunkpractica_docs=self.webpackChunkpractica_docs||[]).push([[7018],{3905:(t,n,e)=>{e.d(n,{Zo:()=>c,kt:()=>k});var l=e(7294);function r(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}function o(t,n){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(t);n&&(l=l.filter((function(n){return Object.getOwnPropertyDescriptor(t,n).enumerable}))),e.push.apply(e,l)}return e}function i(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{};n%2?o(Object(e),!0).forEach((function(n){r(t,n,e[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):o(Object(e)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(e,n))}))}return t}function s(t,n){if(null==t)return{};var e,l,r=function(t,n){if(null==t)return{};var e,l,r={},o=Object.keys(t);for(l=0;l<o.length;l++)e=o[l],n.indexOf(e)>=0||(r[e]=t[e]);return r}(t,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(l=0;l<o.length;l++)e=o[l],n.indexOf(e)>=0||Object.prototype.propertyIsEnumerable.call(t,e)&&(r[e]=t[e])}return r}var a=l.createContext({}),u=function(t){var n=l.useContext(a),e=n;return t&&(e="function"==typeof t?t(n):i(i({},n),t)),e},c=function(t){var n=u(t.components);return l.createElement(a.Provider,{value:n},t.children)},p={inlineCode:"code",wrapper:function(t){var n=t.children;return l.createElement(l.Fragment,{},n)}},d=l.forwardRef((function(t,n){var e=t.components,r=t.mdxType,o=t.originalType,a=t.parentName,c=s(t,["components","mdxType","originalType","parentName"]),d=u(e),k=r,m=d["".concat(a,".").concat(k)]||d[k]||p[k]||o;return e?l.createElement(m,i(i({ref:n},c),{},{components:e})):l.createElement(m,i({ref:n},c))}));function k(t,n){var e=arguments,r=n&&n.mdxType;if("string"==typeof t||r){var o=e.length,i=new Array(o);i[0]=d;var s={};for(var a in n)hasOwnProperty.call(n,a)&&(s[a]=n[a]);s.originalType=t,s.mdxType="string"==typeof t?t:r,i[1]=s;for(var u=2;u<o;u++)i[u]=e[u];return l.createElement.apply(null,i)}return l.createElement.apply(null,e)}d.displayName="MDXCreateElement"},2697:(t,n,e)=>{e.r(n),e.d(n,{assets:()=>a,contentTitle:()=>i,default:()=>p,frontMatter:()=>o,metadata:()=>s,toc:()=>u});var l=e(7462),r=(e(7294),e(3905));const o={sidebar_position:3,sidebar_label:"OpenAPI"},i="Decision: Choosing **_OpenAPI** generator tooling",s={unversionedId:"decisions/openapi",id:"decisions/openapi",title:"Decision: Choosing **_OpenAPI** generator tooling",description:"\ud83d\udcd4 What is it - A decision data and discussion about the right OpenAPI tools and approach",source:"@site/docs/decisions/openapi.md",sourceDirName:"decisions",slug:"/decisions/openapi",permalink:"/decisions/openapi",draft:!1,editUrl:"https://github.com/practicajs/practica/tree/main/docs/docs/decisions/openapi.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3,sidebar_label:"OpenAPI"},sidebar:"tutorialSidebar",previous:{title:"Monorepo",permalink:"/decisions/monorepo"},next:{title:"Coming soon: Features and practices",permalink:"/features"}},a={},u=[],c={toc:u};function p(t){let{components:n,...e}=t;return(0,r.kt)("wrapper",(0,l.Z)({},c,e,{components:n,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"decision-choosing-_openapi-generator-tooling"},"Decision: Choosing ",(0,r.kt)("strong",{parentName:"h1"},"_OpenAPI")," generator tooling"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\ud83d\udcd4 What is it")," - A decision data and discussion about the right OpenAPI tools and approach"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\u23f0 Status")," - Open, closed in June 1st 2022"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\ud83d\udcc1 Corresponding discussion")," - ",(0,r.kt)("a",{parentName:"p",href:"https://github.com/practicajs/practica/issues/67"},"Here")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\ud83c\udfafBottom-line: our recommendation")," - TBD"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\ud83d\udcca Detailed comparison table")),(0,r.kt)("table",{width:"80%",valign:"top"},(0,r.kt)("tr",null,(0,r.kt)("td",null),(0,r.kt)("td",null,(0,r.kt)("h1",null,"tsoa")),(0,r.kt)("td",null,(0,r.kt)("h1",null,"JSON Schema")),(0,r.kt)("td",null,(0,r.kt)("h1",null,"Other option 1")),(0,r.kt)("td",null,(0,r.kt)("h1",null,"Other option 2"))),(0,r.kt)("tr",null,(0,r.kt)("td",{colspan:"5",align:"center"},(0,r.kt)("h2",null,"Executive Summary"))),(0,r.kt)("tr",{valign:"top"},(0,r.kt)("td",null,"Some dimension"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"1ms"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/almost-full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"5ms"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/almost-full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"4ms"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/almost-full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"5ms")),(0,r.kt)("tr",{valign:"top"},(0,r.kt)("td",null,"Some dimension"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"Superior"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/partial.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"Less popular than competitors"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/almost-full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"Highly popular"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/almost-full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"Highly popular")),(0,r.kt)("tr",{valign:"top"},(0,r.kt)("td",null,"\u2757 Important factor"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/almost-full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"No"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/full.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"Yes"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/partial.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"No"),(0,r.kt)("td",null,(0,r.kt)("img",{src:"/img/docs/decisions/partial.png"}),(0,r.kt)("br",null),(0,r.kt)("br",null),"No")),(0,r.kt)("tr",null,(0,r.kt)("td",{class:"tg-ho3n",colspan:"5",align:"center"},(0,r.kt)("h2",null,"More details: Community & Popularity - March 2022"))),(0,r.kt)("tr",null,(0,r.kt)("td",null,"Stars"),(0,r.kt)("td",null,(0,r.kt)("br",null),"4200 \u2728"),(0,r.kt)("td",null,(0,r.kt)("br",null),"2500 \u2728"),(0,r.kt)("td",null,(0,r.kt)("br",null),"2500 \u2728"),(0,r.kt)("td",null,(0,r.kt)("br",null),"1000 \u2728")),(0,r.kt)("tr",null,(0,r.kt)("td",null,"Downloads/Week"),(0,r.kt)("td",null,(0,r.kt)("br",null),"12,900,223 \ud83d\udcc1"),(0,r.kt)("td",null,(0,r.kt)("br",null),"4,000,000 \ud83d\udcc1"),(0,r.kt)("td",null,(0,r.kt)("br",null),"6,000,000 \ud83d\udcc1"),(0,r.kt)("td",null,(0,r.kt)("br",null),"5,000,000 \ud83d\udcc1")),(0,r.kt)("tr",null,(0,r.kt)("td",null,"Dependents"),(0,r.kt)("td",null,(0,r.kt)("br",null),"26,000 \ud83d\udc69\u200d\ud83d\udc67"),(0,r.kt)("td",null,(0,r.kt)("br",null),"600 \ud83d\udc67"),(0,r.kt)("td",null,(0,r.kt)("br",null),"800 \ud83d\udc67"),(0,r.kt)("td",null,(0,r.kt)("br",null),"1000 \ud83d\udc67"))))}p.isMDXComponent=!0}}]);
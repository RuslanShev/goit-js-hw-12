import{a as b,S as v,i}from"./assets/vendor-rOMtvQ2t.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const B="51405853-c477ae5482bbe39eb607a142d",E="https://pixabay.com/api/";async function u(o,s=1){const e={key:B,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:15};return(await b.get(E,{params:e})).data}const f=document.querySelector(".gallery"),m=document.getElementById("loader"),p=document.getElementById("load-more"),M=new v(".gallery a");function h(o){const s=o.map(e=>`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img src="${e.webformatURL}" alt="${e.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${e.likes}</p>
        <p>Views: ${e.views}</p>
        <p>Comments: ${e.comments}</p>
        <p>Downloads: ${e.downloads}</p>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",s),M.refresh()}function R(){f.innerHTML=""}function g(){m.classList.remove("hidden")}function y(){m.classList.add("hidden")}function L(){p.classList.remove("hidden")}function w(){p.classList.add("hidden")}const S=document.querySelector(".form"),$=document.getElementById("load-more");let c="",n=1,d=0;S.addEventListener("submit",async o=>{o.preventDefault();const s=o.target.elements.searchQuery.value.trim();if(s){c=s,n=1,R(),w(),g();try{const e=await u(c,n);if(e.hits.length===0){i.info({title:"Oops",message:"No images found",position:"topRight"});return}h(e.hits),d=Math.ceil(e.totalHits/15),n<d&&L()}catch{i.error({title:"Error",message:"Something went wrong",position:"topRight"})}finally{y()}}});$.addEventListener("click",async()=>{n+=1,g(),w();try{const o=await u(c,n);h(o.hits),I(),n>=d?i.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}):L()}catch{i.error({title:"Error",message:"Failed to load more images",position:"topRight"})}finally{y()}});function I(){const{height:o}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:o*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map

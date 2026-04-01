const toggle=document.querySelector('.menu-toggle');
const mobile=document.querySelector('.mobile-menu');
if(toggle&&mobile){toggle.addEventListener('click',()=>mobile.classList.toggle('open'));mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.classList.remove('open')));}
const tabs=[...document.querySelectorAll('.tab')];
const lists=[...document.querySelectorAll('.menu-list')];
tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));lists.forEach(l=>l.classList.remove('active'));tab.classList.add('active');document.querySelector(`.menu-list[data-cat="${tab.dataset.cat}"]`)?.classList.add('active');}));

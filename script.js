
const menuBtn=document.getElementById('menuBtn');
const nav=document.getElementById('nav');
if(menuBtn) menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const progress=document.getElementById('progress');
window.addEventListener('scroll',()=>{
  const h=document.documentElement.scrollHeight-window.innerHeight;
  if(progress) progress.style.width=(h>0?(window.scrollY/h)*100:0)+'%';
});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

const year=document.getElementById('year');
if(year) year.textContent=new Date().getFullYear();
